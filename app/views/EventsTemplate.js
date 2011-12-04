App.EventsTemplate = Ext.extend(Ext.XTemplate, {
    constructor: function(config) {
        App.EventsTemplate.superclass.constructor.call(this, 
            '<tpl for=".">',
                '<div class="event {name}">',
                '   <span class="text">{name} {category}</span>',
                '</div>',
            '</tpl>'
        );
    }
});
