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
            tpl: '<div>{name}</div>',
            data: {},
        },
    ],

    updateWithRecord: function(event) {
        var infoPanel = this.getComponent('eventinfo');
        infoPanel.getComponent('title').update(event.data);
                
        this.doLayout();
    },

});
