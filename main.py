import os
import os.path
import random
import urllib
import logging

from datetime import time, datetime, timedelta

from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from django.utils import simplejson as json
from util import *

FOURSQUARE_APP_ID = '4HSAFDIQTQ5XDGD0PTLQLM3XCQVEWPXIJFEU2HMFUBLNJWZA'
FOURSQUARE_APP_SECRET = 'II44UIET5HIEPGM2OGBINJ1YDKL05PFZYP4DG5YJMTIRS5DL'
DEBUG = os.environ['SERVER_SOFTWARE'].startswith('Dev')
NYT_EVENTS_API_KEY = 'a5257b1b2b666ce2befb0ba35eeb1e16:11:60788440'
NYT_EVENTS_API_URL = "http://du.ec2.nytimes.com/svc/events/v2/listings.json?"

class User(db.Model):
    id = db.StringProperty(required=True)
    created = db.DateTimeProperty(auto_now_add=True)
    updated = db.DateTimeProperty(auto_now=True)
    name = db.StringProperty(required=True)
    photo = db.StringProperty(required=True)
    access_token = db.StringProperty()

class BaseHandler(webapp.RequestHandler):

    @property
    def site_values(self):
        site = {
            'logo': 'http://' + self.request.headers.get('Host') + '/img/logo.png',
            'title': 'Whats\' Next&trade;',
            'description': 'description',
            'keywords': 'keywords',
            'footer': '&copy; 2011 Whats\' Next&trade;',

            'home_url': self.request.scheme + '://' + self.request.headers.get('Host') + '/',
            'url': self.request.url,
        }
        return site

    @property
    def foursquare_values(self):
        app_url = 'http://' + self.request.headers.get('Host') + '/'
        site = {
            'app_id': FOURSQUARE_APP_ID,
            'app_url': app_url,
            'login_url': 'https://foursquare.com/oauth2/authenticate?client_id=' + FOURSQUARE_APP_ID + '&redirect_uri=' + app_url
                + '&response_type=code',
        }
        return site

    @property
    def current_user(self):
        if not hasattr(self, "_current_user"):
            self._current_user = None
            user_id = CookiesUtil.parseCookie(self.request.cookies.get('fsq_user'), FOURSQUARE_APP_SECRET)
            if user_id:
                self._current_user = User.get_by_key_name(user_id)
            if (self._current_user == None or self._current_user.access_token == None) and self.request.get("code"):
                args = dict(client_id=FOURSQUARE_APP_ID, redirect_uri=self.request.path_url, 
                    client_secret=FOURSQUARE_APP_SECRET, code=self.request.get("code"), grant_type='authorization_code')
                token_url = 'https://foursquare.com/oauth2/access_token?'
                response = json.load(urllib.urlopen(token_url + urllib.urlencode(args)))

                if 'access_token' not in response:
                    self.redirect(self.request.path_url)
                    return
                access_token = response['access_token']
    
                response = json.load(urllib.urlopen('https://api.foursquare.com/v2/users/self?' +
                    urllib.urlencode(dict(oauth_token=access_token))))
                
                profile = response['response']['user']
                user = User(key_name=str(profile["id"]), id=str(profile["id"]), name=profile["firstName"] + ' ' + profile["lastName"],
                    photo=profile["photo"], access_token=access_token)

                user.put()
                
                CookiesUtil.setCookie(self.response, 'fsq_user', str(profile["id"]),
                   expires=time.time() + 30 * 60 * 60 * 24 * 100, secret=FOURSQUARE_APP_SECRET)
                
                self._current_user = user
            elif (self._current_user == None or self._current_user.access_token == None) and not self.request.get("code"):
                self._current_user = None

        return self._current_user

class MainHandler(BaseHandler):

    def get(self, req, page, ext):
        values = {
            'page': page,
            'nav': 'index',
        }
        values = dict(self.site_values, **values)
        
        path = os.path.dirname(__file__)
        if req == None:
            page = 'index'
            ext = 'html'
        elif ext == 'js':
            self.response.headers['Content-Type'] = 'text/javascript'
        tpl = page + '.' + ext

        app = {
            'games': {},
            'views': {
                'home': 'home'
            },
        }
                
        checkin = None
        if not self.current_user: 
            user = {
                'id': '-',
            }
            app['views']['home'] = 'start'
        else:
            user = {
                'id': self.current_user.id,
                'name': self.current_user.name,
                'photo': self.current_user.photo,
            }

            if req == 'index.js':
                response = json.load(urllib.urlopen('https://api.foursquare.com/v2/users/self/checkins?limit=1&' +
                    urllib.urlencode(dict(oauth_token=self.current_user.access_token))))
                logging.debug(response)
                checkin = {
                    'name': response['response']['checkins']['items'][0]['venue']['name'],
                    'address': response['response']['checkins']['items'][0]['venue']['location']['address'],
                    'latitude': response['response']['checkins']['items'][0]['venue']['location']['lat'],
                    'longitude': response['response']['checkins']['items'][0]['venue']['location']['lng'],
                }
                
        values = dict(site=values, user=user, foursquare=self.foursquare_values,
            site_json=GqlEncoder().encode(values), user_json=GqlEncoder().encode(user),
            foursquare_json=GqlEncoder().encode(self.foursquare_values), app_json=GqlEncoder().encode(app),
            checkin_json=GqlEncoder().encode(checkin))

        path = os.path.join(path, tpl)
        self.response.out.write(template.render(path, values))

class VenuesHandler(BaseHandler):

    def get(self, req):
        res = []
        latitude = self.request.get("lat")
        longitude = self.request.get("long")
	search_query = self.request.get("query")

        #args = dict(ll="40.7,-74", v=20111203, oauth_token=self.current_user.access_token)
        args = {
		"ll":str(latitude)+","+str(longitude), 
		"query":search_query,
		"v":20111203, 
		"oauth_token":self.current_user.access_token
	}
        url = 'https://api.foursquare.com/v2/venues/search?'
        response = json.load(urllib.urlopen(url + urllib.urlencode(args)))
	for venue in response['response']['venues']:
	
	    if(venue['location'].has_key('address')):  
		address=(venue['location']['address']) 
	    else:
		address=None

	    if(venue['location'].has_key('cross_street')):  
		cross_street=(venue['location']['cross_street']) 
	    else:
		cross_street=None

	    if(len(venue['categories']) == 0):
		icon==None
	    else:
		icon=venue['categories'][0]['icon']['prefix'] + "32.png"

	    res1 = {
	        'id': venue['id'],
		'name': venue['name'],
		'address': address,
		'cross_street': cross_street,
		'distance': venue['location']['distance'],
		'icon': icon,
		'here_now': venue['hereNow']['count']
	    }
	    res.append(res1)
	 
        
        self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(response["response"]["venues"][0]['categories']))
        #self.response.out.write(json.dumps(response["response"]["venues"][0]["location"]["address"]))
	#self.response.out.write(json.dumps(response["response"]["venues"][0]['categories']['icon']['prefix'])),
	#self.response.out.write(json.dumps(response["response"]["venues"][0]['categories'][0]['icon']['prefix'])),
        self.response.out.write(json.dumps(res))

class CheckInHandler(BaseHandler):

    def post(self, checkin, checkin_id):
        res = []
        oauth_token= self.current_user.access_token
        args = dict(venueId=checkin_id, v=20111203, oauth_token=oauth_token)
        url = 'https://api.foursquare.com/v2/checkins/add?'
# #         f = urllib.urlopen(url,urllib.urlencode(args))
# 	print f
        response = json.load(urllib.urlopen(url,urllib.urlencode(args)))

        self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(response))
        
class CategoryListHandler(BaseHandler):
  
    def get(self, category_list):
        latitude = self.request.get("lat")
        longitude = self.request.get("long")
        
        res = self.getNYTEventsCategoryList(latitude, longitude)
        
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(res))

    def getNYTEventsCategoryList(self, latitude, longitude):
      api_url = "http://api.nytimes.com/svc/events/v2/listings.json?"
      args = {
        'api-key': NYT_EVENTS_API_KEY,
        'radius': '1000',
        'll': str(latitude)+","+str(longitude),
        'facets': 1
        }
      response = json.load(urllib.urlopen(NYT_EVENTS_API_URL + urllib.urlencode(args)))
      categories = response["facets"]["category"]
      category_list = []
      for key, value in categories.iteritems():
          if value > 0:
            temp = {"name":self.translateCategoryName(key),"count":value}
            category_list.append(temp)
      sorted_category_list = sorted(category_list, key=lambda x: x["count"], reverse=True)
      return sorted_category_list
      
    def translateCategoryName(self, key):
      if key == "forChildren":
        return "For Children"
      elif key == "spareTimes":
        return "Spare Times"
      else:
        return key
      

class EventsByCategoryHandler(BaseHandler):
  
    def get(self, event, category, category_id):
      latitude = self.request.get("lat")
      longitude = self.request.get("long")
      res = self.getNYTEventsByCategory(category_id, latitude, longitude)
      self.response.headers['Content-Type'] = 'application/json'
      self.response.out.write(json.dumps(res))
      
    def getNYTEventsByCategory(self, category, latitude, longitude):
      args = {
        'api-key': NYT_EVENTS_API_KEY,
        'radius': '1000',
        'll': str(latitude)+","+str(longitude),
        'filters': "category:"+category
        }
      response = json.load(urllib.urlopen(NYT_EVENTS_API_URL + urllib.urlencode(args)))
      events = response["results"]
      filtered_results =  map(lambda event: {"id":event["event_id"],"name":event["event_name"],"venue":event["venue_name"],"category":event["category"],"venue_address":event["street_address"],"times_pick":event["times_pick"]}, events)
      return filtered_results

class EventHandler(BaseHandler):

    def get(self, event, event_id):
      res = self.getNYTEventByID(event_id)
      self.response.headers['Content-Type'] = 'application/json'
      self.response.out.write(json.dumps(res))

    def getNYTEventByID(self, event_id):
      args = {
        'api-key': NYT_EVENTS_API_KEY,
        'filters': 'asset_id:'+event_id,
        }
      response = json.load(urllib.urlopen(NYT_EVENTS_API_URL + urllib.urlencode(args)))
      return response["results"][0]

def main():
    logging.getLogger().setLevel(logging.DEBUG)

    application = webapp.WSGIApplication([
        ('/((index).(html|js))?', MainHandler),
        ('/(category_list)', CategoryListHandler),
        ('/(event)/(category)/(.*)', EventsByCategoryHandler),
        ('/(event)/(.*)', EventHandler),
        ('/(venues)', VenuesHandler),
        ('/(checkin)/(.*)', CheckInHandler),
        ], debug=True)

    util.run_wsgi_app(application)
    

if __name__ == '__main__':
    main()
