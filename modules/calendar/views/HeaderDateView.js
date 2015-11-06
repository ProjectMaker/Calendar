define(['module'
        ,'underscore'
        ,'backbone'
        ,'jquery'
        ,'backboneMarionette'
        ,'moment'
        ,'text!calendar/templates/HeaderDateView.html'
    ],

    function(module
        ,_
        ,Backbone
        ,$
        ,Marionette
        ,moment
        ,TplHeader
    ) {

        var HeaderDateView = Marionette.ItemView.extend({
            template: _.template(TplHeader),
            templateHelpers: function() {
                return {
                    dates: this.dates
                }
            },

            initialize: function(options) {
                this.dates = options.dates;
            }
        });

        return HeaderDateView;
    }
);

