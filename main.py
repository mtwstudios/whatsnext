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
                logging.debug(response)
                
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

        nextsunday = DatesUtil.nextsunday()
        app = {
            'games': {},
            'views': {
                'home': 'home'
            },
            'forms': {
                'start_date': str(nextsunday),
#                 {
#                     'year': nextsunday.year,
#                     'month': nextsunday.month,
#                     'day': nextsunday.day,
#                 },
            },
        }
                
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
                app['info'] = {}
                            
        values = dict(site=values, user=user, foursquare=self.foursquare_values,
            site_json=GqlEncoder().encode(values), user_json=GqlEncoder().encode(user),
            foursquare_json=GqlEncoder().encode(self.foursquare_values), app_json=GqlEncoder().encode(app))

        path = os.path.join(path, tpl)
        self.response.out.write(template.render(path, values))

class VenuesHandler(BaseHandler):

    def get(self, req):
        res = []

        args = dict(ll="40.7,-74", v=20111203, oauth_token=self.current_user.access_token)
        url = 'https://api.foursquare.com/v2/venues/search?'
        response = json.load(urllib.urlopen(url + urllib.urlencode(args)))
	for venue in response['response']['venues']:
	    res = {
	        'id': venue['id'],
		'name': venue['name'],
		#'address': venue['location']['address']
	    }
	 
        
        self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(response["response"]["venues"][0]))
        self.response.out.write(json.dumps(res))

class EventsHandler(BaseHandler):

    def get(self, req, games, ext, game_id, ext2, user_id):
        res = []
                
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(res))
        
class CheckInHandler(BaseHandler):

    def post(self, req, checkins, ext, checkin_id):
        if not res:
            res = { 'error': 'invalid request' }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(res))
        
def main():
    logging.getLogger().setLevel(logging.DEBUG)

    application = webapp.WSGIApplication([
        ('/((index).(html|js))?', MainHandler),
        ('/(venues)', VenuesHandler),
        ('/(events)', EventsHandler),
        ('/(checkin)', CheckInHandler),
        ], debug=True)

    util.run_wsgi_app(application)
    

if __name__ == '__main__':
    main()
