var geo = new Ext.util.GeoLocation({
    autoUpdate : false
});

var WhatsNext = {
    site: {{ site_json }},
    user: {{ user_json }},
    foursquare: {{ foursquare_json }},
    app: {{ app_json }},
    checkin: {{ checkin_json }},
    geo: {
        latitude: 40.76368014,
        longitude: -73.98866,
    }
}

geo.updateLocation(function(geo){
    WhatsNext.geo = geo;
});

