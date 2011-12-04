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
