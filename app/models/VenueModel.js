App.models.Venue = Ext.regModel('App.models.Venue', {
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'latlong', type: 'string'},
    ],
    proxy: {
        type: 'rest',
        url: '/venues',
        listeners: {
            exception: function() {
                console.log(">>>> exception!")
            }
        }
    },
});

App.stores.games = new Ext.data.Store({
    model: 'App.models.Venue',
/* 	autoLoad: true, */
/* 	groupField: 'checkin_type', */
});

