App.views.EventsCategoryEventView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'event',
    layout: 'vbox',
    iconCls: 'user', 
    title: 'Event',
    
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Event',
    }],
    
    items: [
        {
            id: 'eventinfo',
            xtype: 'panel',
            styleHtmlContent:true,
            tpl: '<div style="text-align:center"><img src="{icon}" /><strong>{name}</strong><br /><br /> {venue}<br /> {venue_address}<br /> {category} {times_pick}</div>',
            data: {},
        },
    ],

    updateWithRecord: function(event) {
        console.log(event);
        var infoPanel = this.getComponent('eventinfo');
        infoPanel.update(event.data);
        infoPanel.doLayout();
    },

});
