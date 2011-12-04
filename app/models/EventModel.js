App.models.Event = Ext.regModel("App.models.Event", {
    idProperty: 'id',
	fields : [
        {name: "id", type: "string" },
        {name: "name", type: "string" },
        {name: "venue", type: "string" },
        {name: "venue_address", type: "string" },
        {name: "category", type: "string" },
        {name: "times_pick", type: "string" },
	],
});

App.stores.events = new Ext.data.Store({
    model: 'App.models.Event',
    proxy: {
        type: 'ajax',
        url: '/event/category/Theater?lat=' + WhatsNext.geo.lat + '&long=' + WhatsNext.geo.long,
    },
 	autoLoad: true, 
})