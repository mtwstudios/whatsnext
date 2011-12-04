App.views.EventsCategoryEventView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'event',
    layout: 'vbox',
    iconCls: 'user', 
    title: 'Event',
    
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Venue',
    }],
    
    items: [
        {
            id: 'eventinfo',
            xtype: 'panel',
            styleHtmlContent:true,
            tpl: '<div><img src="{icon}" />{name} {venue} {venue_address} {category} {times_pick}</div>',
            data: {},
        },
        {
            xtype: 'button',
            text: 'Checkin Now!',
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

    updateWithRecord: function(event) {
        console.log(event);
        var infoPanel = this.getComponent('eventinfo');
        infoPanel.update(event.data);
        infoPanel.doLayout();
    },

});
