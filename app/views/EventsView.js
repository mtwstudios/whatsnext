App.views.EventsView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home',
    layout: 'card',
    iconCls: 'home',
    title: 'Events',
    
    initComponent: function() {
    
        App.views.categoriesView = new App.views.CategoriesView();
        App.views.categoryEventsView = new App.views.CategoryEventsView();

        this.items = [
            App.views.categoriesView,
            App.views.categoryEventsView,
        ];
        this.activeItem = 0;

        App.views.EventsView.superclass.initComponent.apply(this, arguments);
    },
    
});

/* Ext.reg('App.views.EventsView', App.views.EventsView); */
