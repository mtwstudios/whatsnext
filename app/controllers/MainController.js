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
                App.views.viewport.setActiveItem(App.views.categoriesView);
            }
        });
    },

});