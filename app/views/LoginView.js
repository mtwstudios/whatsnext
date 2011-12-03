App.views.LoginView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'login',
    layout: {
        type: 'vbox',
    },
    items: [
        {
            cls: 'header',
            html: '<div><h1>' + WhatsNext.site.title + '</h1><p>....</p></div>',
        },
        {
            xtype: 'button',
            text: 'Login with Foursquare',
            ui: 'action',
            handler: function() {
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: 'onLogin',
                });
            },
        },
    ]    
});

/* Ext.reg('App.views.LoginView', App.views.LoginView); */
