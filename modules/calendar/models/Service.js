define(['module'
        ,'underscore'
        ,'backbone'
    ],

    function( module
        ,_
        ,Backbone
    ) {

        var Service =  Backbone.Model.extend({
            defaults: {
                name: '',
                service_duration: 0
            },

            /**
             * @description Retoune la durée du service en heure
             * @returns {number}
             */
            getDuration: function() {
                return this.get('service_duration') / 3600;
            }

        });


        return Service;
    }
);