App.VenuesTemplate = Ext.extend(Ext.XTemplate, {
    constructor: function(config) {
        App.VenuesTemplate.superclass.constructor.call(this, 
            '<tpl for=".">',
                '<div class="venue {name}">',
                '   <span class="text"><img src="{icon}" />{name} {address}</span>',
                '</div>',
            '</tpl>'
        );
    }
});
