App.views.HomeLastView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home last',
    layout: {
        type: 'vbox',
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Welcome',
        items: [
            {xtype:'spacer'},
            {
                text: 'Tour',
                ui: 'action',
                listeners: {
                    'tap': function() {
                        Ext.dispatch({
                            controller: App.controllers.main,
                            action: 'onViewTour',
                            onBack: 'onViewHome',
                        });
                    }
                }
            }
        ],
    }],
    
    items: [
        {
            cls: 'header',
            html: '<div><h1>Hey ' + WhatsNext.user.name + '!</h1></div>' + (WhatsNext.checkin ? '<p>Your last checkin\'s at ' + WhatsNext.checkin.name + ' at ' + WhatsNext.checkin.location + '</p>' : '<p>NO LOCATION</p>'),
        },
        {
            xtype: 'button',
            text: 'What\'s Next',
            ui: 'action',
            handler: function() {
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: 'onListCategories',
                });
            },
        },
    ]    
});

/* Ext.reg('App.views.HomeLastView', App.views.HomeLastView); */
