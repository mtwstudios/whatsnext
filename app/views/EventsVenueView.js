App.views.EventsVenueView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'venue',
    layout: 'vbox',
    iconCls: 'user', 
    title: 'Venue',
    
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Venue',
    }],
    
    items: [
        {
            cls: 'header',
            html: '<div><h1>Checkin here and find nearby?</h1></div>',
        },
        {
            id: 'venueinfo',
            xtype: 'panel',
            styleHtmlContent:true,
            tpl: '<div><img src="{icon}" /><strong>{name}</strong><br /> {address}</div>',
            data: {},
        },
        {
            xtype: 'button',
            text: 'Checkin!',
            ui: 'action',
            id: 'venuecheckin',
            handler: function() {
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: 'onVenueCheckIn',
                    venue: this.venue,
                });
            },
        },
    ],

    updateWithRecord: function(venue) {
        console.log(venue);
        var infoPanel = this.getComponent('venueinfo');
        infoPanel.update(venue.data);
        infoPanel.doLayout();
        
        var checkin = this.getComponent('venuecheckin');
        checkin.venue = venue;
    },

});
