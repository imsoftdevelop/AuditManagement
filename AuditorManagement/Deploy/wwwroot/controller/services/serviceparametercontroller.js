HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceParameter', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getParameterModel: function (type) {
            return $http.get(baseURL + "Parameter/GetParameterModel?ref_key=" + makeid() + "&type=" + type, { cache: false });
        },
        getParameterProvince: function () {
            return $http.get(baseURL + "Parameter/GetParameterProvince?ref_key=" + makeid(), { cache: false });
        },
        getParameterAmphur: function () {
            return $http.get(baseURL + "Parameter/GetParameterAmphur?ref_key=" + makeid(), { cache: false });
        },
        getParameterTitle: function () {
            return $http.get(baseURL + "Parameter/GetParameterTitle?ref_key=" + makeid(), { cache: false });
        },
        getParameterPermission: function () {
            return $http.get(baseURL + "Parameter/GetParameterPermission?ref_key=" + makeid(), { cache: false });
        },
        getParameterBranchWithOwner: function () {
            return $http.get(baseURL + "Parameter/GetParameterBranchWithOwner?ref_key=" + makeid(), { cache: false });
        },
        getParameterFSGroupWithOwner: function () {
            return $http.get(baseURL + "Parameter/GetParameterFSGroupWithOwner?ref_key=" + makeid(), { cache: false });
        },
        getParameterRequestform: function () {
            return $http.get(baseURL + "Parameter/GetParameterRequestform?ref_key=" + makeid(), { cache: false });
        },
        getParameterDocumentStyle: function () {
            return $http.get(baseURL + "Parameter/GetParameterDocumentStyle?ref_key=" + makeid(), { cache: false });
        },
        getParameterDocumentTypeOwner: function () {
            return $http.get(baseURL + "Parameter/GetParameterDocumentTypeWithOwner?ref_key=" + makeid(), { cache: false });
        },
        getParameterCustomerWithOwner: function () {
            return $http.get(baseURL + "Parameter/GetParameterCustomerWithOwner?ref_key=" + makeid(), { cache: false });
        },
        getParameterEmployeeNotAssignWithOwner: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterEmployeeNotAssignWithOwner?ref_key=" + key, { cache: false });
        },
        getParameterPeriodAccountWithOwnerAndBranchAndCustomer: function (cusid, accid) {
            return $http.get(baseURL + "Parameter/GetParameterPeriodAccountWithOwnerAndBranchAndCustomer?ref_cus=" + cusid + "&ref_acc=" + accid, { cache: false });
        },
        getParameterFSGroupWithOwnerIsActiveForTrialBalance: function () {
            return $http.get(baseURL + "Parameter/GetParameterFSGroupWithOwnerIsActiveForTrialBalance?ref_key=" + makeid(), { cache: false });
        },
        getParameterTrialBalanceWithCustomerAndPeriod: function (cusid, accid) {
            return $http.get(baseURL + "Parameter/GetParameterTrialBalanceWithCustomerAndPeriod?ref_cus=" + cusid + "&ref_acc=" + accid, { cache: false });
        },
        getParameterFSTop: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterFSTop?ref_key=" + makeid(), { cache: false });
        },
        getParameterFSTopParentFSgroup: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterFSTopParentFSgroup?ref_key=" + makeid(), { cache: false });
        },
        getParameterAuditFSGroup: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterAuditFSGroup?ref_key=" + key, { cache: false });
        },
        getParameterFSgroupParentSubFSGroup: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterFSgroupParentSubFSGroup?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        getParameterAuditProgram: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterAuditProgram?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        getParameterAccountAuditAccountWithPeriod: function (key) {
            return $http.get(baseURL + "Parameter/GetParameterAccountAuditAccountWithPeriod?ref_acc=" + key, { cache: false });
        },
        getParameterSubFSGroup: function () {
            return $http.get(baseURL + "Parameter/GetParameterSubFSGroup?ref_key=" + makeid(), { cache: false });
        },
        
        
    };
}]);

