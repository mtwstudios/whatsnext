App.views.EventsView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home',
    layout: 'card',
    iconCls: 'home',
    title: 'Events',
    
    initComponent: function() {
    
        App.views.categoriesView = new App.views.CategoriesView();

        this.items = [
            App.views.categoriesView,
        ];
        this.activeItem = 0;

        App.views.EventsView.superclass.initComponent.apply(this, arguments);
    },
    
});

/* Ext.reg('App.views.EventsView', App.views.EventsView); */
