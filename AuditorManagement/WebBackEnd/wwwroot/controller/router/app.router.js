angular.module('service.route', []).config(function ($stateProvider, $urlRouterProvider) {

    var baseURL = $("base")[0].href;
    // For any unmatched URL redirect to dashboard URL
    $urlRouterProvider.otherwise("/Login");

    $stateProvider
        .state('login', {
            url: "/Login",
            views: {
                'container-view': {
                    templateUrl: "Home/Login",
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
        .state('forgetpassword', {
            url: "/ForgetPassword",
            views: {
                'container-view': {
                    templateUrl: "Home/ForgetPassword",
                    controller: "ForgetPasswordController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/forgetpasswordcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('register', {
            url: "/Register",
            views: {
                'container-view': {
                    templateUrl: "Home/Register",
                    controller: "RegisterController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/registercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('confirmregister', {
            url: "/ConfirmRegister",
            views: {
                'container-view': {
                    templateUrl: "Home/ConfirmRegister",
                    controller: "RegisterController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/registercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('branchlist', {
            url: "/BranchList",
            views: {
                'container-view': {
                    templateUrl: "Home/BranchList",
                    controller: "ProfilesController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/profilescontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('branchadd', {
            url: "/BranchAdd",
            views: {
                'container-view': {
                    templateUrl: "Home/BranchAdd",
                    controller: "BranchaddController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/branchaddcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('rolelist', {
            url: "/RoleList",
            views: {
                'container-view': {
                    templateUrl: "Home/RoleList",
                    controller: "Rolecontroller",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/rolecontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid()
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customerlist', {
            url: "/CustomerList",
            views: {
                'container-view': {
                    templateUrl: "Home/CustomerList",
                    controller: "CustomerController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/customercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
        .state('customerdashboard', {
            url: "/CustomerDashBoard",
            views: {
                'container-view': {
                    templateUrl: "Home/CustomerDashBoard",
                    controller: "CustomerController",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'controller/home/customercontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceauthencontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceparametercontroller.js?noacche=' + makeid(),
                                    'controller/parameter/GlobalServiceControl.js?noacche=' + makeid(),
                                    'controller/accounts/audit.confirmaccountperiodcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceaccountcontroller.js?noacche=' + makeid(),
                                    'controller/services/serviceorganizecontroller.js?noacche=' + makeid(),
                                ]
                            });
                        }]
                    }
                },
            },
        })
    
}); 