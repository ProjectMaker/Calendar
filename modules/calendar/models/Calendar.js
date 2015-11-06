define(['module'
        ,'underscore'
        ,'moment'
        ,'calendar/models/Slot'
        ,'calendar/collections/Slots'
        ,'backboneRelational'
    ],

    function( module
        ,_
        ,moment
        ,Slot
        ,Slots
    ) {

        var Calendar = Backbone.RelationalModel.extend({
            defaults: {
                from_date: '',
                to_date: ''
            },
            relations: [{
                type: Backbone.HasMany,
                key: 'slots',
                relatedModel: Slot,
                collectionType: Slots,

                reverseRelation: {
                    key: 'calendar',
                    includeInJSON: null
                }
            }],


            initialize: function() {
                this.setDates();
                this.addSlotNotAvailabilities();
            },

            /**
             * @description retourne l ensemble des dates comprises entre from_date et to_date
             * @returns {Array}
             */
            setDates: function() {
                var mBegin = moment(moment(this.get('from_date')).format('YYYY-MM-DD')).add(-1,'d');
                var mEnd = moment(moment(this.get('to_date')).format('YYYY-MM-DD')).add(1,'d');
                var mAfter = moment(moment(this.get('from_date')).format('YYYY-MM-DD'));
                this._dates = [];

                while ( mAfter.isBetween(mBegin, mEnd) ) {
                    this._dates.push(mAfter.format());
                    mAfter.add(1,'d');
                }

                return this._dates;
            },

            /**
             * @description Ajoute les slots qui ne sont pas présent dans calendar.json
             */
            addSlotNotAvailabilities: function() {
                var nbSlots = this.getNbSlotsByDay();

                _.each(this._dates, function(date) {
                    var m = moment(date);
                    m.add(9,'Hour');
                    for ( var idx = 1; idx <= nbSlots; idx++ ) {
                        var slotDate = m.add(1,'hour').format();
                        var slot = this.get('slots').findWhere({starts_on: slotDate});
                        if ( !slot ) {
                            slot = new Slot({availability: 0, starts_on: slotDate, ends_on: moment(slotDate).add(1, 'hour').format()});
                            this.get('slots').add(slot);
                        }
                    }
                }, this);
            },

            /**
             * @description Retourne le nombre de slots par jour
             * @returns {number}
             */
            getNbSlotsByDay: function() {
                return Math.ceil( (19 - 10) / this.get('slots').getSlotDuration() );
            },

            /**
             * @description Retourne le nombre de semaines
             * @returns {number}
             */
            getNbWeeks: function() {
                return Math.round( this._dates.length / 7);
            },

            /**
             * @description Retourne les dates d'une semaine
             * @param numWeek
             * @returns {Array}
             */
            getDatesOfWeek: function(numWeek) {
                var begin = ( numWeek - 1 ) * 7;
                var end = begin + 7;
                var dates = [];

                _.each(this._dates.slice(begin, end), function(date) {
                    dates.push(moment(date).format('DD/MM/YYYY'));
                });

                return dates;
            },

            /**
             * @description Retourne les heures d'une journée au format hBegin - hEnd
             * @returns {Array}
             */
            getHoursOfDay: function() {
                var hours = [];
                for ( var idx = 10; idx <= 18; idx++ ) {
                    hours.push(idx.toString() + ' - ' + (idx + 1).toString());
                }

                return hours;
            },

            /**
             * @description Retoune les slots d'une semaine
             * @param numWeek
             * @returns {*}
             */
            getSlotsOfWeek: function(numWeek) {
                var slots = [];
                _.each(this.getDatesOfWeek(numWeek), function(date) {
                    _slots = _.filter(this.get('slots').models, function(slot) {
                        return moment(slot.get('starts_on')).format('DD/MM/YYYY') == date;
                    });

                    slots = _.union(slots, _slots);
                }, this);

                return  new Slots(slots);
            }
        });

        return Calendar;
    }
);
/**
 * Created by thomas.michelet on 03/11/2015.
 */
