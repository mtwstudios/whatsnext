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
                App.views.eventsView.setActiveItem(App.views.categoriesView);
                App.views.viewport.setActiveItem(App.views.eventsView);
            }
        });
    },

    onViewCategory: function(options) {
        App.views.categoryEventsView.updateRecord(options.category)
        App.views.eventsView.setActiveItem(App.views.categoryEventsView);
        App.views.viewport.setActiveItem(App.views.eventsView);
    },

});