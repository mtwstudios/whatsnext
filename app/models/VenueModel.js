App.models.Venue = Ext.regModel('App.models.Venue', {
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'address', type: 'string'},
    ],
    proxy: {
        type: 'rest',
        url: '/venues?lat=' + WhatsNext.geo.lat + '&long=' + WhatsNext.geo.long,
        listeners: {
            exception: function() {
                console.log(">>>> exception!")
            }
        }
    },
});

App.stores.venues = new Ext.data.Store({
	model: "App.models.Venue",
 	autoLoad: true, 
});
