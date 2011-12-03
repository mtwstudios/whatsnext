App.views.HomeStartView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home start',
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
            html: '<div><h1>Getting Started</h1><p>Welcome ' + WhatsNext.user.name + '</p></div>',
        },
        {
            xtype: 'button',
            text: 'Check In!',
            ui: 'action',
            handler: function() {
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: '',
                });
            },
        },
    ]    
});

Ext.reg('App.views.HomeStartView', App.views.HomeStartView);
