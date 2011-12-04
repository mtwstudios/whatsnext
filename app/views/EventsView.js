App.views.EventsView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home',
    layout: 'card',
    iconCls: 'home',
    title: 'Events',
    
    initComponent: function() {
    
        App.views.eventsCategoriesView = new App.views.EventsCategoriesView();
        App.views.eventsCategoryEventsView = new App.views.EventsCategoryEventsView();
        App.views.eventsCategoryEventView = new App.views.EventsCategoryEventView();
        App.views.eventsVenuesView = new App.views.EventsVenuesView();
        App.views.eventsVenueView = new App.views.EventsVenueView();

        this.items = [
            App.views.eventsCategoriesView,
            App.views.eventsCategoryEventsView,
            App.views.eventsCategoryEventView,
            App.views.eventsVenuesView,
            App.views.eventsVenueView,
        ];
        this.activeItem = 0;

        App.views.EventsView.superclass.initComponent.apply(this, arguments);
    },
    
});
