// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.factories', 'app.config'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppController'
    })

    .state('app.messages', {
        url: "/messages",
        views: {
            'menuContent': {
                templateUrl: "templates/messages.html",
                controller: "MessagesController"
            }
        }
    })
    
    .state('app.message', {
        url: "/messages/messageId",
        views: {
            'menuContent': {
                templateUrl: "templates/messages.html",
                controller: "MessageController"
            }
        }
    })

    .state('app.setings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "templates/settings.html",
                controller: "SettingsController"
            }
        }
    })

    .state('app.account', {
        url: "/account",
        views: {
            'menuContent': {
                templateUrl: "templates/account.html",
                controller: 'AccountController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/messages');
});