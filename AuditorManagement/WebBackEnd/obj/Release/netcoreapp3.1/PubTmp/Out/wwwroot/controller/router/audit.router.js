angular.module('audit.router', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Index");

    $stateProvider
        .state('audit-index', {
            url: "/Audit-Index",
            views: {
                'container-view': {
                    templateUrl: "Home/Index",
                    controller: "ProfilesController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/settings/profilescontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('audit-profiles', {
            url: "/Audit-Profiles",
            views: {
                'container-view': {
                    templateUrl: "Settings/Profiles",
                    controller: "ProfilesController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/settings/profilescontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
}); 