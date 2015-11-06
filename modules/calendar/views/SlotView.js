define(['module'
        ,'underscore'
        ,'backbone'
        ,'jquery'
        ,'backboneMarionette'
        ,'moment'
    ],

    function(module
        ,_
        ,Backbone
        ,$
        ,Marionette
        ,moment
    ) {

        var SlotView = Marionette.ItemView.extend({
            template: _.template(''),
            className: 'calendar-slot',
            triggers: {
              'click': 'activeService'
            },
            initialize: function() {
                if ( this.model.get('availability') == 1 ) this.$el.addClass('available');
                this.model.on('change:reserved', _.bind(function() {
                    if ( this.model.get('reserved') ) {
                        this.$el.removeClass('available');
                        this.$el.addClass('reserved');
                    }
                    else {
                        this.$el.removeClass('reserved');
                        this.$el.addClass('available');
                    }
                }, this));
            }
        });

        return SlotView;
    }
);

