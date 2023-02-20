angular.module('owner.route', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Index");

    $stateProvider
        .state('owner-profiles', {
            url: "/Owner-Profiles",
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
        .state('owner-employee', {
            url: "/Owner-Employee",
            views: {
                'container-view': {
                    templateUrl: "Employees/EmployeeList",
                    controller: "EmployeeListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/employees/employeelistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceemployeecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('owner-employee-add', {
            url: "/Owner-Employee-Add/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Employees/EmployeeAdd",
                    controller: "EmployeeListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/employees/employeelistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceemployeecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('owner-organization', {
            url: "/Owner-Organization",
            views: {
                'container-view': {
                    templateUrl: "Organizations/OrganizationList",
                    controller: "BranchListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/branchlistcontroller.js?noacche=' + makeid(),
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
        .state('owner-organization-add', {
            url: "/Owner-Organization-Add/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Organizations/OrganizationAdd",
                    controller: "BranchListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/branchlistcontroller.js?noacche=' + makeid(),
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
        .state('owner-customer', {
            url: "/Owner-Customer",
            views: {
                'container-view': {
                    templateUrl: "Organizations/CustomerList",
                    controller: "CustomerListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/customerlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceemployeecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('owner-customer-add', {
            url: "/Owner-Customer-Add/:ref_id",
            views: {
                'container-view': {
                    templateUrl: "Organizations/CustomerAdd",
                    controller: "CustomerListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/customerlistcontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceemployeecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('owner-fsgroup', {
            url: "/Owner-FSGroup",
            views: {
                'container-view': {
                    templateUrl: "Organizations/FSGroup",
                    controller: "FsgroupListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/fsgrouplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-fstop', {
            url: "/Owner-FSTop",
            views: {
                'container-view': {
                    templateUrl: "Organizations/FSTop",
                    controller: "FsToplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/fstoplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-subfsgroup', {
            url: "/Owner-SubFSGroup",
            views: {
                'container-view': {
                    templateUrl: "Organizations/SubFSGroup",
                    controller: "SubFsgrouplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/subfsgrouplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-grouptype', {
            url: "/Owner-GroupType",
            views: {
                'container-view': {
                    templateUrl: "Organizations/GroupType",
                    controller: "GrouptypelistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/grouptypelistcontroller.js?noacche=' + makeid(),
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
        .state('owner-companydocument', {
            url: "/Owner-CompanyDocument",
            views: {
                'container-view': {
                    templateUrl: "Organizations/CompanyDocument",
                    controller: "DocumenttypelistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/documenttypelistcontroller.js?noacche=' + makeid(),
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
        .state('owner-auditprogram', {
            url: "/Owner-AuditProgram",
            views: {
                'container-view': {
                    templateUrl: "Organizations/AuditProgram",
                    controller: "AdminAuditprogramcontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/auditprogramcontroller.js?noacche=' + makeid(),
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
        .state('owner-cashflow', {
            url: "/Owner-Cashflow",
            views: {
                'container-view': {
                    templateUrl: "Organizations/Cashflow",
                    controller: "CashflowlistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/cashflowlistcontroller.js?noacche=' + makeid(),
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
        .state('owner-expenses', {
            url: "/Owner-Expenses",
            views: {
                'container-view': {
                    templateUrl: "Organizations/Expenses",
                    controller: "ExpenseslistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/expenseslistcontroller.js?noacche=' + makeid(),
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
        .state('owner-taxgroup', {
            url: "/Owner-TaxGroup",
            views: {
                'container-view': {
                    templateUrl: "Organizations/TaxGroup",
                    controller: "TaxgrouplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/taxgrouplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-nontaxbleexpense', {
            url: "/Owner-NonTaxbleExpense",
            views: {
                'container-view': {
                    templateUrl: "Organizations/NonTaxbleExpense",
                    controller: "NontaxgrouplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/nontaxgrouplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-ppegroup', {
            url: "/Owner-PPEGroup",
            views: {
                'container-view': {
                    templateUrl: "Organizations/PPEGroup",
                    controller: "PPElistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/ppelistcontroller.js?noacche=' + makeid(),
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
        .state('owner-iagroup', {
            url: "/Owner-IAGroup",
            views: {
                'container-view': {
                    templateUrl: "Organizations/IAGroup",
                    controller: "IAgoruplistController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/iagoruplistcontroller.js?noacche=' + makeid(),
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
        .state('owner-requestform', {
            url: "/Owner-RequestForm",
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
        .state('owner-capacitymanage', {
            url: "/Owner-CapacityManage",
            views: {
                'container-view': {
                    templateUrl: "ServiceBilling/CapacityManage",
                    controller: "FsgroupListController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/organize/fsgrouplistcontroller.js?noacche=' + makeid(),
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
}); 