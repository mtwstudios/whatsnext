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
        App.views.eventsView.setActiveItem(App.views.eventsCategoryEventView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },

    onListVenues: function(options) {
        App.stores.venues.load({
            scope   : this,
            callback: function(records, operation, success) {
                App.views.eventsVenuesView.doLayout();
                App.views.eventsView.setActiveItem(App.views.eventsVenuesView);
                App.views.viewport.setActiveItem(App.views.eventsView);
            }
        });
    },

    onViewVenue: function(options) {
        App.views.eventsVenueView.updateWithRecord(options.venue);
        App.views.eventsVenueView.doLayout();
        App.views.eventsView.setActiveItem(App.views.eventsVenueView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },

    onVenueCheckIn: function(options) {
        var uri = '/checkin/' + options.venue.get('id');
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {
            msg: "Posting your check-in ..."
        });
        loadingMask.show();

        Ext.Ajax.request({
            url: uri,
            method: 'POST',
            params: {},
            callback: function(options, success, response) {
                if (!success) {
                    console.log('Failed to checkin: ' + success);
                }
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: 'onListCategories',
                });
                loadingMask.destroy();
            },
            scope: options,
        });
    },

});