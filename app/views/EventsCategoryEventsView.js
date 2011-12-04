App.views.EventsCategoryEventsView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'events',
    layout: 'vbox',

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Events',
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
            store: App.stores.events,           
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
/*
        var events = this.getComponent('events');
        events.store = new Ext.data.Store({
            model: 'App.models.Event',
            proxy: {
                type: 'ajax',
                url: '/event/category/' + category.get('name') + '?lat=' + WhatsNext.geo.lat + '&long=' + WhatsNext.geo.long,
            },
        });
        events.store.load({
            scope: this,
            callback: function(records, operation, success) {
                console.log(this.getComponent('events'))
                this.getComponent('events').update(records);
            },
        });
*/
                
        this.doLayout();
    },
    
});
