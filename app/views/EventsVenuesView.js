App.views.EventsVenuesView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'venues',
    layout: 'vbox',

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Venues',
        items: [
            {xtype:'spacer'},
        ],
    }],

    items: [
        {
            id: 'venues',
            xtype: 'list',
            flex: 1,
            width: '100%',
            store: App.stores.venues,
            itemTpl: new App.VenuesTemplate({inContext: false}),
            listeners: {
                'itemtap': function(self, index, item, e) {
                    Ext.dispatch({
                        controller: App.controllers.main,
                        action: 'onViewVenue',
                        venue: this.store.getAt(index),
                    });
                }
            }
        }
    ],
    
});
