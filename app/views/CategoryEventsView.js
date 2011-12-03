App.views.CategoryEventsView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'categories',
    layout: 'vbox',

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Categories',
        items: [
            {xtype:'spacer'},
        ],
    }],

    items: [
        {
            id: 'events',
            xtype: 'list',
            flex: 1,
            width: '100%',
            store: new Ext.data.Store({
                fields: [],
                data: [],
            }),            
            itemTpl: new App.EventsTemplate({inContext: false}),
            listeners: {
                'itemtap': function(self, index, item, e) {
                    Ext.dispatch({
                        controller: App.controllers.main,
                        action: 'onViewEvent',
                        event: this.store.getAt(index),
                    });
                }
            }
        }
    ],

    updateWithRecord: function(category) {
        var events = this.getComponent('events');
        events.store = new Ext.data.Store({
            model: 'App.models.Event',
            proxy: {
                type: 'ajax',
                url: '/event/category/' + category + '?lat=' + WhatsNext.geo.lat + '&long=' + WhatsNext.geo.long,
            },
        });
        wall.store.load({
            scope: this,
            callback: function(records, operation, success) {
                this.getComponent('events').update(records);
            },
        });
                
        this.doLayout();
    },
    
});

/* Ext.reg('App.views.CategoriesView', App.views.CategoriesView); */
