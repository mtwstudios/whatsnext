App.models.CheckIn = Ext.regModel("App.models.CheckIns", {
    idProperty: 'id',
	fields : [
        { name: "venue_id", type: "string" },
	],
});

App.stores.checkins = new Ext.data.Store({
	model: "App.models.CheckIn",
    proxy: {
        type: 'rest',
        url: '/checkins',
        listeners: {
            exception: function() {
                console.log(">>>> exception!")
            }
        }
    },
});
