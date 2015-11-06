define(['module'
        ,'underscore'
        ,'moment'
        ,'backboneRelational'
    ],

    function( module
        ,_
        ,moment
    ) {

        var Slot =  Backbone.RelationalModel.extend({
            defaults: {
                availability: 0,
                ends_on: '',
                starts_on: '',
                reserved: 0,
                service_id: null
            },

            /**
             * @returns {{starts_on: *, ends_on: *}}
             */
            toJSON: function() {
                return {starts_on: this.get('starts_on'), ends_on: this.get('ends_on')};
            }

        });



        return Slot;
    }
);


