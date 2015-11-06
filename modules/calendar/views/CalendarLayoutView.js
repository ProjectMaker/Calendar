define(['module'
        ,'underscore'
        ,'backbone'
        ,'jquery'
        ,'backboneMarionette'
        ,'moment'
        ,'calendar/views/SlotsView'
        ,'calendar/views/HeaderDateView'
        ,'calendar/views/HourView'
        ,'text!calendar/templates/CalendarLayoutView.html'
    ],

    function(module
        ,_
        ,Backbone
        ,$
        ,Marionette
        ,moment
        ,SlotsView
        ,HeaderDateView
        ,HourView
        ,TplCalendarLayout
    ) {







        var CalendarLayoutView = Marionette.LayoutView.extend({
            template: _.template(TplCalendarLayout),

            regions: {
                headerRegion: '.calendar-layout-header',
                hourRegion: '.calendar-layout-hour',
                bodyRegion: '.calendar-layout-body'
            },
            events: {
                'click .bt-next': function() {
                    if ( this.model.getNbWeeks() > this._numWeek ) {
                        this._numWeek++;
                        this.displayWeek();
                    }
                },
                'click .bt-previous': function() {
                    if ( this._numWeek > 1 ) {
                        this._numWeek--;
                        this.displayWeek();
                    }
                }
            },
            ui: {
                'btNext': '.bt-next',
                'btPrevious': '.bt-previous'
            },

            initialize: function() {
                this._numWeek  = 1;
            },

            displayWeek: function() {
                if ( this._numWeek <= 1 ) this.ui.btPrevious.hide();
                else this.ui.btPrevious.show();
                if ( this._numWeek == this.model.getNbWeeks() ) this.ui.btNext.hide();
                else  this.ui.btNext.show();
                var headerView = new HeaderDateView({dates: this.model.getDatesOfWeek(this._numWeek)});
                this.headerRegion.show(headerView);
                var hourView = new HourView({hours: this.model.getHoursOfDay()});
                this.hourRegion.show(hourView);
                var bodyView = new SlotsView({collection: this.model.getSlotsOfWeek(this._numWeek)});
                this.bodyRegion.show(bodyView);
            },

            onShow: function() {
                this.displayWeek();
            }
        });

        return CalendarLayoutView;
    });
/**
 * Created by thomas.michelet on 05/11/2015.
 */
