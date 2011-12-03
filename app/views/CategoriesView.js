App.views.CategoriesView = Ext.extend(Ext.Panel, {
    cls: 'more',
    layout: 'card',
    iconCls: 'search', 
    title: 'More',
    fullscreen: true,

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Home',
        items: [
            {xtype:'spacer'},
        ],
    }],

    items: [
        {
            id: 'updates',
            xtype: 'list',
            flex: 1,
            width: '100%',
            store: App.stores.categories,
            grouped: true,
            itemTpl: new App.CategoriesTemplate({inContext: false}),
            listeners: {
                'itemtap': function(self, index, item, e) {
                    Ext.dispatch({
                        controller: App.controllers.main,
                        action: 'onViewCategory',
                        category: this.store.getAt(index),
                    });
                }
            }
        }
    ],
    
});

Ext.reg('App.views.HomeRecentView', App.views.HomeRecentView);
