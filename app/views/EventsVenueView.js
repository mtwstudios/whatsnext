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
            id: 'venueinfo',
            xtype: 'panel',
            styleHtmlContent:true,
            tpl: '<div><img src="{icon}" />{name} {address}</div>',
            data: {},
        },
    ],

    updateWithRecord: function(venue) {
        console.log(venue);
        var infoPanel = this.getComponent('venueinfo');
        infoPanel.update(venue.data);
        infoPanel.doLayout();
    },

});
