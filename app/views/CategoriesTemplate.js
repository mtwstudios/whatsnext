App.CategoriesTemplate = Ext.extend(Ext.XTemplate, {
    constructor: function(config) {
        App.CategoriesTemplate.superclass.constructor.call(this, 
            '<tpl for=".">',
                '<div class="category {type}">',
                '   <span class="text"> {name} ({count})</span>',
                '</div>',
            '</tpl>'
        );
    }
});
