angular.module('account.router', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Index");

    $stateProvider
        .state('account-index', {
            url: "/Account-Index",
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
        .state('account-profiles', {
            url: "/Account-Profiles",
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
        .state('account-requestform', {
            url: "/Account-RequestForm",
            views: {
                'container-view': {
                    templateUrl: "ServiceBilling/RequestForm",
                    controller: "OwnerRequestformController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/servicebilling/owner.requestformcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/servicebillingcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-documentlist', {
            url: "/Account-DocumentList",
            views: {
                'container-view': {
                    templateUrl: "Organizations/DocumentList",
                    controller: "DocumentListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/documentlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-documentadd', {
            url: "/Account-DocumentAdd/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Organizations/DocumentAdd",
                    controller: "DocumentListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/documentlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-customermanagelist', {
            url: "/Account-CustomerManageList",
            views: {
                'container-view': {
                    templateUrl: "Organizations/CustomerManageList",
                    controller: "AccountCustomerlistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/account.customerlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-customerdetailmanage', {
            url: "/Account-CustomerDetailManage/:ref_id/:ref_action",
            views: {
                'container-view': {
                    templateUrl: "Organizations/CustomerDetailManage",
                    controller: "OfficeCustomerlistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/office.customerlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-periodaccountlist', {
            url: "/Account-PeriodAccountList",
            views: {
                'container-view': {
                    templateUrl: "Accountings/PeriodAccountList",
                    controller: "AccountperiodController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/accountperiodcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-trialbalancelist', {
            url: "/Account-TrialBalanceList",
            views: {
                'container-view': {
                    templateUrl: "Accountings/TrialBalanceList",
                    controller: "OfficeTrialBalanceController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/office.trialbalancecontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-adjustmentlist', {
            url: "/Account-AdjustmentList",
            views: {
                'container-view': {
                    templateUrl: "Accountings/AdjustmentList",
                    controller: "AccountAdjustmentcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/account.adjustmentcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-fstoplist', {
            url: "/Account-FSTopList",
            views: {
                'container-view': {
                    templateUrl: "Accountings/FSTopList",
                    controller: "AccountFstoplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/account.fstoplistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-fsleadlist', {
            url: "/Account-FSLeadList/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Accountings/FSLeadList",
                    controller: "AccountFsleadlistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/account.fsleadlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('account-subfsleadlist', {
            url: "/Account-SubFSLeadList/:ref_id/:ref_group",
            views: {
                'container-view': {
                    templateUrl: "Accountings/SubFSLeadList",
                    controller: "AccountSubFsleadlistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/account.subfsleadlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
    
}); 