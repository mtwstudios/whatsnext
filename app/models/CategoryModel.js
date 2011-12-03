App.models.Category = Ext.regModel("App.models.Category", {
	fields : [
        {name: "name", type: "string" },
        {name: "count", type: "string" },
	],
    proxy: {
        type: 'rest',
        url: '/category_list?lat=' + WhatsNext.checkin.latitude + '&long=' + WhatsNext.checkin.longitude,
        listeners: {
            exception: function() {
                console.log(">>>> exception!")
            }
        }
    },
});

App.stores.categories = new Ext.data.Store({
	model: "App.models.Category",
/*  	autoLoad: true,  */
});