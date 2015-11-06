define(['module'
        ,'underscore'
        ,'backbone'
        ,'jquery'
        ,'backboneMarionette'
        ,'moment'
        ,'text!calendar/templates/HourView.html'
    ],

    function(module
        ,_
        ,Backbone
        ,$
        ,Marionette
        ,moment
        ,TplHour
    ) {

        var HourView = Marionette.ItemView.extend({
            template: _.template(TplHour),
            className: ' calendar-day',
            templateHelpers: function() {
                return {
                    hours: this.hours
                }
            },

            initialize: function(options) {
                this.hours = options.hours;
            }
        });

        return HourView;
    }
);

/**
 * Created by thomas.michelet on 05/11/2015.
 */
