angular.module('customer.router', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Index");

    $stateProvider
        //.state('account-index', {
        //    url: "/Account-Index",
        //    views: {
        //        'container-view': {
        //            templateUrl: "Home/Index",
        //            controller: "ProfilesController",
        //            resolve: {
        //                load: ['$ocLazyLoad', function ($ocLazyLoad) {
        //                    return $ocLazyLoad.load({
        //                        files: [
        //                            'controller/settings/profilescontroller.js?noacche=' + makeid(),
        //                            'controller/parameter/GlobalServiceControl.js?noacche=' + makeid()
        //                        ]
        //                    });
        //                }]
        //            }
        //        },
        //    },
        //})
        .state('customer-profiles', {
            url: "/Customer-Profiles",
            views: {
                'container-view': {
                    templateUrl: "Customers/Profiles",
                    controller: "CustomerProfilesController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/customers/customer.profilescontroller.js?noacche=' + makeid(),
                                    'controller/services/servicecustomercontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customer-periodaccountlist', {
            url: "/customer-PeriodAccountList",
            views: {
                'container-view': {
                    templateUrl: "Customers/PeriodAccountList",
                    controller: "CustomerAccountperiodController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/customers/customer.accountperiodcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/services/servicecustomercontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customer-confirmaccountlist', {
            url: "/customer-confirmaccountlist",
            views: {
                'container-view': {
                    templateUrl: "Customers/ConfirmAccountList",
                    controller: "CustomerConfirmAccountPeriodController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/customers/customer.confirmaccountperiodcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/services/servicecustomercontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customer-documentlist', {
            url: "/customer-DocumentList",
            views: {
                'container-view': {
                    templateUrl: "Customers/DocumentList",
                    controller: "CustomerDocumentListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/customers/customer.documentlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/services/servicecustomercontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customer-documentadd', {
            url: "/customer-DocumentAdd/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Customers/DocumentAdd",
                    controller: "CustomerDocumentListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/customers/customer.documentlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/services/servicecustomercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
      
}); 