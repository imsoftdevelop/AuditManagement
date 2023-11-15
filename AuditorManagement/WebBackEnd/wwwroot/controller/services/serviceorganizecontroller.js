HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceOrganize', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getBranch: function () { 
            return $http.get(baseURL + "Organizations/GetBranch?ref_key=" + makeid(), { cache: false });
        },
        postBranch: function (data) {
            return $http.post(baseURL + "Organizations/PostBranch", data, HeaderConfig, { cache: false });
        },
        deleteBranch: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteBranch?ref_key=" + key, { cache: false });
        },
        getBranchWithKey: function (key) {
            return $http.get(baseURL + "Organizations/GetBranchWithKey?ref_key=" + key, { cache: false });
        },
        getRevenurevalue: function (data) {
            return $http.post(baseURL + "Organizations/GetRevenurevalue", data, HeaderConfig, { cache: false });
        },
        getCustomer: function () {
            return $http.get(baseURL + "Organizations/GetCustomer?ref_key=" + makeid(), { cache: false });
        },
        getCustomerWithKey: function (key) {
            return $http.get(baseURL + "Organizations/GetCustomerWithKey?ref_key=" + key, { cache: false });
        },
        postCustomer: function (data) {
            return $http.post(baseURL + "Organizations/PostCustomer", data, HeaderConfig, { cache: false });
        },
        postCustomerWithBranch: function (data) {
            return $http.post(baseURL + "Organizations/PostCustomerWithBranch", data, HeaderConfig, { cache: false });
        },
        deleteCustomer: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteCustomer?ref_key=" + key, { cache: false });
        },
        getCustomerWithBranch: function (key) {
            return $http.get(baseURL + "Organizations/GetCustomerWithBranch?ref_key=" + key, { cache: false });
        },
        getCustomerWithBranchFromAssign: function (key) {
            return $http.get(baseURL + "Organizations/GetCustomerWithBranchFromAssign?ref_key=" + key, { cache: false });
        },
        getCustomerContractWithKey: function (key) {
            return $http.get(baseURL + "Organizations/GetCustomerContractWithKey?ref_key=" + key, { cache: false });
        },
        getCustomerAssignWithKey: function (key) {
            return $http.get(baseURL + "Organizations/GetCustomerAssignWithKey?ref_key=" + key, { cache: false });
        },
        postCustomerContractWithBranch: function (data) {
            return $http.post(baseURL + "Organizations/PostCustomerContractWithBranch", data, HeaderConfig, { cache: false });
        },
        postCustomerContractInviteWithBranch: function (data) {
            return $http.post(baseURL + "Organizations/PostCustomerContractInviteWithBranch", data, HeaderConfig, { cache: false });
        },
        postCustomerAssignWithBranch: function (data) {
            return $http.post(baseURL + "Organizations/PostCustomerAssignWithBranch", data, HeaderConfig, { cache: false });
        },
        deleteCustomerContract: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteCustomerContract?ref_key=" + key, { cache: false });
        },
        deleteCustomerAssign: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteCustomerAssign?ref_key=" + key, { cache: false });
        },
        disabledCustomerAssign: function (key) {
            return $http.delete(baseURL + "Organizations/DisabledCustomerAssign?ref_key=" + key, { cache: false });
        },
        onDisabledCustomerAssign: function (key) {
            return $http.delete(baseURL + "Organizations/OnDisabledCustomerAssign?ref_key=" + key, { cache: false });
        },
        getFSGroup: function (key) {
            return $http.get(baseURL + "Organizations/GetFSGroup?ref_key=" + key, { cache: false });
        },
        postFSGroup: function (data) {
            return $http.post(baseURL + "Organizations/PostFSGroup", data, HeaderConfig, { cache: false });
        },
        deleteFSGroup: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteFSGroup?ref_key=" + key, { cache: false });
        },
        getFSTop: function (key) {
            return $http.get(baseURL + "Organizations/GetFSTop?ref_key=" + key, { cache: false });
        },
        postFSTop: function (data) {
            return $http.post(baseURL + "Organizations/PostFSTop", data, HeaderConfig, { cache: false });
        },
        deleteFSTop: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteFSTop?ref_key=" + key, { cache: false });
        },
        getSubFSGroup: function (key) {
            return $http.get(baseURL + "Organizations/GetSubFSGroup?ref_key=" + key, { cache: false });
        },
        postSubFSGroup: function (data) {
            return $http.post(baseURL + "Organizations/PostSubFSGroup", data, HeaderConfig, { cache: false });
        },
        deleteSubFSGroup: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteSubFSGroup?ref_key=" + key, { cache: false });
        },
        getGroupType: function (key) {
            return $http.get(baseURL + "Organizations/GetGroupType?ref_key=" + key, { cache: false });
        },
        postGroupType: function (data) {
            return $http.post(baseURL + "Organizations/PostGroupType", data, HeaderConfig, { cache: false });
        },
        deleteGroupType: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteGroupType?ref_key=" + key, { cache: false });
        },
        getDocumenttype: function (key) {
            return $http.get(baseURL + "Organizations/GetDocumenttype?ref_key=" + key, { cache: false });
        },
        postDocumenttype: function (data) {
            return $http.post(baseURL + "Organizations/PostDocumenttype", data, HeaderConfig, { cache: false });
        },
        deleteDocumenttype: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteDocumenttype?ref_key=" + key, { cache: false });
        },
        getAuditprogram: function (key) {
            return $http.get(baseURL + "Organizations/GetAuditprogram?ref_key=" + key, { cache: false });
        },
        postAuditprogram: function (data) {
            return $http.post(baseURL + "Organizations/PostAuditprogram", data, HeaderConfig, { cache: false });
        },
        deleteAuditprogram: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteAuditprogram?ref_key=" + key, { cache: false });
        },
        getAuditProgramFSGroup: function (key) {
            return $http.get(baseURL + "Organizations/GetAuditProgramFSGroup?ref_key=" + key, { cache: false });
        },
        postAuditProgramFSGroup: function (data) {
            return $http.post(baseURL + "Organizations/PostAuditProgramFSGroup", data, HeaderConfig, { cache: false });
        },
        getMasterCashflow: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterCashflow?ref_key=" + key, { cache: false });
        },
        postMasterCashflow: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterCashflow", data, HeaderConfig, { cache: false });
        },
        deleteMasterCashflow: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterCashflow?ref_key=" + key, { cache: false });
        },
        getMasterExpense: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterExpense?ref_key=" + key, { cache: false });
        },
        postMasterExpense: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterExpense", data, HeaderConfig, { cache: false });
        },
        deleteMasterExpense: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterExpense?ref_key=" + key, { cache: false });
        },
        getMasterTaxgroup: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterTaxgroup?ref_key=" + key, { cache: false });
        },
        postMasterTaxgroup: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterTaxgroup", data, HeaderConfig, { cache: false });
        },
        deleteMasterTaxgroup: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterTaxgroup?ref_key=" + key, { cache: false });
        },
        getMasterNontax: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterNontax?ref_key=" + key, { cache: false });
        },
        postMasterNontax: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterNontax", data, HeaderConfig, { cache: false });
        },
        deleteMasterNontax: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterNontax?ref_key=" + key, { cache: false });
        },
        getMasterPpegroup: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterPpegroup?ref_key=" + key, { cache: false });
        },
        postMasterPpegroup: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterPpegroup", data, HeaderConfig, { cache: false });
        },
        deleteMasterPpegroup: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterPpegroup?ref_key=" + key, { cache: false });
        },
        getMasterIagroup: function (key) {
            return $http.get(baseURL + "Organizations/GetMasterIagroup?ref_key=" + key, { cache: false });
        },
        postMasterIagroup: function (data) {
            return $http.post(baseURL + "Organizations/PostMasterIagroup", data, HeaderConfig, { cache: false });
        },
        deleteMasterIagroup: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteMasterIagroup?ref_key=" + key, { cache: false });
        },
        getDocumentList: function (key) {
            return $http.get(baseURL + "Organizations/GetDocumentList?ref_key=" + key, { cache: false });
        },
        getDocumentListWithKey: function (key) {
            return $http.get(baseURL + "Organizations/GetDocumentListWithKey?ref_key=" + key, { cache: false });
        },
        postDocumentList: function (data) {
            return $http.post(baseURL + "Organizations/PostDocumentList", data, HeaderConfig, { cache: false });
        },
        deleteDocumentList: function (key) {
            return $http.delete(baseURL + "Organizations/DeleteDocumentList?ref_key=" + key, { cache: false });
        },
        getHourRate: function () {
            return $http.get(baseURL + "Organizations/GetHourRate?ref_key=" + makeid(), { cache: false });
        },
        postHourRate: function (data) {
            return $http.post(baseURL + "Organizations/PostHourRate", data, HeaderConfig, { cache: false });
        },
    };
}]);

