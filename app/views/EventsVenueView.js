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
            html: '<div><p>Checkin here and find nearby?</p></div>',
        },
        {
            id: 'venueinfo',
            xtype: 'panel',
            styleHtmlContent:true,
            tpl: '<div><img src="{icon}" />{name} {address}</div>',
            data: {},
        },
        {
            xtype: 'button',
            text: 'Checkin!',
            ui: 'action',
            handler: function() {
                Ext.dispatch({
                    controller: App.controllers.main,
                    action: 'onVenueCheckIn',
                });
            },
        },
    ],

    updateWithRecord: function(venue) {
        console.log(venue);
        var infoPanel = this.getComponent('venueinfo');
        infoPanel.update(venue.data);
        infoPanel.doLayout();
    },

});
