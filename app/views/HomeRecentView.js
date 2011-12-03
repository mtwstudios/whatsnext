App.views.HomeRecentView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'homerecent',
    layout: 'vbox',

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Home',
        items: [
            {xtype:'spacer'},
            {
                text: 'Tour',
                ui: 'action',
                id: 'homerecentviewtourbutton',
                listeners: {
                    'tap': function() {
                        Ext.dispatch({
                            controller: App.controllers.main,
                            action: 'onViewTour',
                            onBack: 'onViewHome',
                        });
                    }
                },
                hidden: (MakeYou.app.games.started == 0 && MakeYou.app.games.joined == 0) ? false : true,
            }
        ],
    }],

    items: [
        {
            id: 'updates',
            xtype: 'list',
            flex: 1,
            width: '100%',
            store: App.stores.activities,
            grouped: true,
            itemTpl: new App.ActivitiesTemplate({inContext: false}),
            listeners: {
                'itemtap': function(self, index, item, e) {
                    Ext.dispatch({
                        controller: App.controllers.main,
                        action: 'onViewGame',
                        activity: this.store.getAt(index),
                    });
                }
            }
        }
    ],
    
});

Ext.reg('App.views.HomeRecentView', App.views.HomeRecentView);
