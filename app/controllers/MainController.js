App.controllers.main = new Ext.Controller({

    onLogin: function(options) {
        document.location.href = WhatsNext.foursquare.login_url;
    },

    onLogout: function(options) {
    },
    
});