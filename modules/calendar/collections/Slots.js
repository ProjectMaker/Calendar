define(['module'
        ,'underscore'
        ,'backbone'
        ,'moment'
        ,'calendar/models/Slot'
    ],

    function( module
        ,_
        ,Backbone
        ,moment
        ,Slot
    ) {

        var Slots =  Backbone.Collection.extend({
            model: Slot,

            comparator: 'starts_on',

            /**
             * @description Retourne les slots qui possède le serviceId
             * @param serviceId
             * @returns {Array}
             */
            getSlotsByServiceId: function(serviceId) {
                return this.filter( function(slot) { return slot.get('service_id') == serviceId });
            },

            /**
             * @description Retourne la durée en heure d'un slot
             * @returns {number}
             */
            getSlotDuration: function() {
                if ( !this.models.length ) return 0;
                var startsOn = moment(this.at(0).get('starts_on'));
                var endsOn = moment(this.at(0).get('ends_on'));
                return parseInt(endsOn.subtract(startsOn).format('H'));
            },

            /**
             * @description Desactive les slots qui ne peuvent accueillir le service
             * @param serviceDuration
             */
            desactiveSlots: function(serviceDuration) {
                var slotDuration = this.getSlotDuration();
                var slotPrec = null;
                var slotActives = [];
                this.models.forEach( function(slot) {
                    if ( moment(slot.get('starts_on')).format('h') == 10 ) {
                        slotPrec = slot;
                        slotActives.push(slot);
                    }
                    else {
                        if ( slotPrec.get('ends_on') == slot.get('starts_on') && slot.get('availability') == 1 ) slotActives.push(slot);
                        else {
                            nbSlots = serviceDuration / slotDuration;
                            while ( slotActives.length >= nbSlots ) {
                                var serviceId = _.uniqueId();
                                var slotServices = slotActives.slice(0, nbSlots);
                                _.each(slotServices, function(slotService) {
                                   slotService.set('service_id', serviceId);
                                });
                                slotActives = _.difference(slotActives,slotServices);
                            }

                            _.each(slotActives, function(slotActive) {
                                slotActive.set('availability', 0);
                            });
                            slotActives = [];
                        }
                        slotPrec = slot;
                    }

                }, this);
            }

        });


        return Slots;
    }
);
/**
 * Created by thomas.michelet on 03/11/2015.
 */

