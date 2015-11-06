require.config({
    urlArgs: 'v=' + (new Date()).getTime(),
    packages: [{name: 'calendar', main: 'app', location: 'modules/calendar'}],
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'text': 'bower_components/text//text',
        'underscore': 'bower_components/underscore/underscore-min',
        'backbone': 'bower_components/backbone/backbone-min',
        'backboneRelational': 'bower_components/backbone-relational/backbone-relational',
        'backboneMarionette':'bower_components/backbone.marionette/lib/backbone.marionette.min',
        'moment': 'bower_components/moment/moment'
    },
    shim: {
        'backboneMarionette': {
            exports: 'Marionette',
            deps: ['backbone']
        },
        'backboneRelational': ['backbone'],
        'backbone': {
            exports: 'Backbone',
            deps: ['underscore','jquery']
        }
    }
});