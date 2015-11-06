define(['module'
        ,'backbone'
        ,'backboneMarionette'
        ,'underscore'
        ,'jquery'
        ,'moment'
        ,'text!calendar/data/calendar.json'
        ,'text!calendar/data/service_offer.json'
        ,'calendar/models/Calendar'
        ,'calendar/models/Service'
        ,'calendar/views/CalendarLayoutView'
    ],

    function(module
        ,Backbone
        ,Marionette
        ,_
        ,$
        ,moment
        ,calandarJson
        ,serviceJson
        ,Calendar
        ,Service
        ,CalendarLayoutView
    ) {

        $(document).ready(function() {
            var MyApplication = Marionette.Application.extend({
                regions: {
                    mainRegion: '#app'
                },

                initialize: function() {
                    this._numWeek = 1;
                },

                onStart: function() {
                    var service = new Service($.parseJSON(serviceJson));
                    var calendar = new Calendar($.parseJSON(calandarJson));
                    calendar.get('slots').desactiveSlots(service.getDuration());

                    this.calendarView = new CalendarLayoutView({model: calendar});
                    this.mainRegion.show(this.calendarView);
                }
            });


            var myApp = new MyApplication();
            myApp.start();
        });
    });/**
 * Created by thomas.michelet on 03/11/2015.
 */
