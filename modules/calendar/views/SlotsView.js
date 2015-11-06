define(['module'
        ,'underscore'
        ,'backbone'
        ,'jquery'
        ,'backboneMarionette'
        ,'moment'
        ,'calendar/views/SlotView'
    ],

    function(module
        ,_
        ,Backbone
        ,$
        ,Marionette
        ,moment
        ,SlotView
    ) {

        var BodyView = Marionette.CompositeView.extend({
            template: _.template('<div class="calendar-slots"></div>'),
            className: 'calendar-slots-container',
            childViewContainer: '.calendar-slots',
            childView: SlotView,

            childEvents: {
                'activeService': function(view) {
                    if ( view.model.get('availability') ) {
                        if ( this._serviceId ) {
                            var slotServices = this.collection.getSlotsByServiceId(this._serviceId);
                            _.each(slotServices, function(slotService) {
                                slotService.set('reserved', 0);
                            });
                        }
                        var slotServices = this.collection.getSlotsByServiceId(view.model.get('service_id'));
                        _.each(slotServices, function(slotService) {
                            slotService.set('reserved', 1);
                            console.log(slotService.toJSON());
                        });
                        this._serviceId = view.model.get('service_id');
                    }
                }
            },

            initialize: function() {
                this._serviceId = null;
            },

            attachHtml: function(collectionView, childView, index) {
                $('.calendar-slots .calendar-day:last', this.$el).append(childView.el);
            },

            buildChildView: function(model) {
                if ( this.children.length % 9 == 0 ) {
                    $('.calendar-slots', this.el).append('<div class="calendar-day">');
                }

                var childView = new (this.childView)({model: model});

                Marionette.MonitorDOMRefresh(childView);

                return childView;
            }
        });

        return BodyView;
    });
/**
 * Created by thomas.michelet on 05/11/2015.
 */
