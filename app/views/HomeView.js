App.views.HomeView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home',
    layout: 'card',
    iconCls: 'home',
    title: 'Home',
    
    initComponent: function() {
    
        App.views.homeStartView = new App.views.HomeStartView();

        this.items = [
            App.views.homeStartView,
        ];
        this.activeItem = 0;

        App.views.HomeView.superclass.initComponent.apply(this, arguments);
    },
    
});

Ext.reg('App.views.HomeView', App.views.HomeView);
