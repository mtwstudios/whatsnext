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
        {
            cls: 'terms',
            html: '<span>By logging in, you accept our terms of use.</span>',
        },
    ]    
});

Ext.reg('App.views.LoginView', App.views.LoginView);
