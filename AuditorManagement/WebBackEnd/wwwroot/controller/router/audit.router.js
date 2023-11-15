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
        .state('audit-requestform', {
            url: "/Audit-RequestForm",
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
        .state('audit-documentlist', {
            url: "/Audit-DocumentList",
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
        .state('audit-documentadd', {
            url: "/Audit-DocumentAdd/:ref_id",
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
        .state('audit-customermanagelist', {
            url: "/Audit-CustomerManageList",
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
        .state('audit-customerdetailmanage', {
            url: "/Audit-CustomerDetailManage/:ref_id/:ref_action",
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
        .state('audit-periodaccountlist', {
            url: "/Audit-PeriodAccountList",
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
        .state('audit-trialbalancelist', {
            url: "/Audit-TrialBalanceList",
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
        .state('audit-adjustmentlist', {
            url: "/Audit-AdjustmentList",
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
        .state('audit-fstoplist', {
            url: "/Audit-FSTopList",
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
        .state('audit-fsleadlist', {
            url: "/Audit-FSLeadList/:ref_id",
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
        .state('audit-subfsleadlist', {
            url: "/Audit-SubFSLeadList/:ref_id/:ref_group",
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
        .state('audit-assignment', {
            url: "/Audit-Assignment",
            views: {
                'container-view': {
                    templateUrl: "Accountings/Assignment",
                    controller: "AuditFsassignlistcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/audit.fsassignlistcontroller.js?noacche=' + makeid(),
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
        .state('audit-processtagging', {
            url: "/Audit-ProcessTagging",
            views: {
                'container-view': {
                    templateUrl: "Accountings/ProcessTagging",
                    controller: "AuditTaggingcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/audit.taggingcontroller.js?noacche=' + makeid(),
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
        .state('audit-confirmaccountlist', {
            url: "/Audit-confirmaccountlist",
            views: {
                'container-view': {
                    templateUrl: "Accountings/ConfirmAccountList",
                    controller: "AuditConfirmAccountPeriodController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/audit.confirmaccountperiodcontroller.js?noacche=' + makeid(),
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
        .state('audit-draftreport', {
            url: "/Audit-draftreport/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Accountings/DraftReport",
                    controller: "AuditDraftReportController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/accounts/audit.draftreportcontroller.js?noacche=' + makeid(),
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