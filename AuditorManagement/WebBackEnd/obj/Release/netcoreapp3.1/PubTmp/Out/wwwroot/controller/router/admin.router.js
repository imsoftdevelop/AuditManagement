angular.module('admin.route', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Index");

    $stateProvider
        .state('admin-index', {
            url: "/Index",
            views: {
                'container-view': {
                    templateUrl: "Home/Index",
                    controller: "LoginController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/logincontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('admin-profiles', {
            url: "/Admin-Profiles",
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
        .state('admin-requestform', {
            url: "/Admin-RequestForm",
            views: {
                'container-view': {
                    templateUrl: "SuperAdmin/RequestForm",
                    controller: "AdminRequestFormController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/servicebilling/admin.requestformcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicebillingcontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('admin-historyrequestform', {
            url: "/Admin-HistoryRequestForm",
            views: {
                'container-view': {
                    templateUrl: "SuperAdmin/HistoryRequestForm",
                    controller: "AdminAllRequestFormController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/servicebilling/admin.allrequestformcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicebillingcontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('admin-fsgroup', {
            url: "/Admin-FSGroup",
            views: {
                'container-view': {
                    templateUrl: "SuperAdmin/FSGroup",
                    controller: "AdminFsgroupcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/master/admin.fsgroupcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicemastercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('admin-companydocument', {
            url: "/Admin-CompanyDocument",
            views: {
                'container-view': {
                    templateUrl: "SuperAdmin/CompanyDocument",
                    controller: "AdminDocumenttypecontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/master/admin.documenttypecontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicemastercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('admin-auditprogram', {
            url: "/Admin-AuditProgram",
            views: {
                'container-view': {
                    templateUrl: "SuperAdmin/AuditProgram",
                    controller: "AdminAuditprogramcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/master/admin.auditprogramcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicemastercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
    
}); 