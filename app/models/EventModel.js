App.models.Event = Ext.regModel("App.models.Event", {
    idProperty: 'id',
	fields : [
        {name: "id", type: "string" },
        {name: "name", type: "string" },
	],
    proxy: {
        type: 'rest',
        url: '/events',
        listeners: {
            exception: function() {
                console.log(">>>> exception!")
            }
        }
    },
});

App.stores.friends = new Ext.data.Store({
	model: "App.models.Event",
/* 	autoLoad: true, */
});