if (WhatsNext.app.views.home == 'start') {
    App.views.Viewport = Ext.extend(Ext.Panel, {
        fullscreen: true,
        layout: 'card',
        cardSwitchAnimation: 'slide',

        initComponent: function() {
            App.views.loginView = new App.views.LoginView();

            this.items = [
                App.views.loginView,
            ]
            this.activeItem = 0;

            App.views.Viewport.superclass.initComponent.apply(this, arguments);
        },
        
    });

} else {
    App.views.Viewport = Ext.extend(Ext.TabPanel, {
        fullscreen: true,
        layout: 'card',
        cardSwitchAnimation: 'slide',
        tabBar: {
            dock: 'bottom',
            layout: { pack: 'center' },
            flex: 1
        },
        
        initComponent: function() {
            App.views.homeView = new App.views.HomeView();

            this.items = [
                App.views.homeView,
            ]
            this.activeItem = 0;
            
            App.views.Viewport.superclass.initComponent.apply(this, arguments);
        },     
        
    });
}
