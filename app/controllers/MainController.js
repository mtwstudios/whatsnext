App.controllers.main = new Ext.Controller({

    onLogin: function(options) {
        document.location.href = WhatsNext.foursquare.login_url;
    },

    onLogout: function(options) {
    },
    
    onListCategories: function(options) {
        App.stores.categories.load({
            scope   : this,
            callback: function(records, operation, success) {
                App.views.eventsView.setActiveItem(App.views.eventsCategoriesView);
                App.views.viewport.setActiveItem(App.views.eventsView);
            }
        });
    },

    onListCategoryEvents: function(options) {
        App.views.eventsCategoryEventsView.updateWithRecord(options.category);
        App.views.eventsCategoryEventsView.doLayout();
        App.views.eventsView.setActiveItem(App.views.eventsCategoryEventsView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },
    
    onViewEvent: function(options) {
        App.views.eventsCategoryEventView.updateWithRecord(options.event);
        App.views.eventsCategoryEventView.doLayout();
        App.views.eventsView.setActiveItem(App.views.eventsCategoryEventsView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },

    onListVenues: function(options) {
        App.stores.venues.load({
            scope   : this,
            callback: function(records, operation, success) {
                App.views.eventsView.setActiveItem(App.views.eventsVenuesView);
                App.views.viewport.setActiveItem(App.views.eventsView);
            }
        });
    },

    onViewVenue: function(options) {
        App.views.eventsVenueView.updateWithRecord(options.venue);
        App.views.eventsCategoryEventView.doLayout();
        App.views.eventsView.setActiveItem(App.views.eventsCategoryEventsView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },

});