App.views.CategoriesView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'categories',
    layout: 'vbox',

    dockedItems: [{
        xtype: 'toolbar',
        title: 'Categories',
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

/* Ext.reg('App.views.CategoriesView', App.views.CategoriesView); */
