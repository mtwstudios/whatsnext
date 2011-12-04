App.VenuesTemplate = Ext.extend(Ext.XTemplate, {
    constructor: function(config) {
        App.VenuesTemplate.superclass.constructor.call(this, 
            '<tpl for=".">',
                '<div class="venue {name}">',
                '   <span class="text"><img src="{icon}" />{name} <span class="venue_address">@ {address}</span></span>',
                '</div>',
            '</tpl>'
        );
    }
});
