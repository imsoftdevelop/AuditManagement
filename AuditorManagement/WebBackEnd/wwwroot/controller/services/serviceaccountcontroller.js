HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceAccount', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getAccountProposal: function () {
            return $http.get(baseURL + "Accountings/GetAccountProposal?ref_key=" + makeid(), { cache: false });
        },
        postAccountProposal: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountProposal", data, HeaderConfig, { cache: false });
        },
        deleteAccountProposal: function (key) {
            return $http.delete(baseURL + "Accountings/DeleteAccountProposal?ref_key=" + key, { cache: false });
        },
        setAccountProposal: function (key,key1) {
            return $http.get(baseURL + "Accountings/SetAccountProposal?ref_key=" + key + "&ref_stat=" + key1, { cache: false });
        },
        getAccountProposalKey: function (key) {
            return $http.get(baseURL + "Accountings/GetAccountProposalKey?ref_key=" + key, { cache: false });
        },
        getAccountPeriods: function () { 
            return $http.get(baseURL + "Accountings/GetAccountPeriods?ref_key=" + makeid(), { cache: false });
        },
        postAccountPeriods: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountPeriods", data, HeaderConfig, { cache: false });
        },
        deleteAccountPeriods: function (key) {
            return $http.delete(baseURL + "Accountings/DeleteAccountPeriods?ref_key=" + key, { cache: false });
        },
        getAccountPeriodsWithKey: function (key) {
            return $http.get(baseURL + "Accountings/GetAccountPeriodsWithKey?ref_key=" + key, { cache: false });
        },
        postAccountTrialBalance: function (data,ref_period,ref_customer) {
            return $http.post(baseURL + "Accountings/PostAccountTrialBalance?ref_cus=" + ref_customer + "&ref_period=" + ref_period, data, HeaderConfig, { cache: false });
        },
        deleteUploadAccountTrialBalance: function (key) {
            return $http.delete(baseURL + "Accountings/DeleteUploadAccountTrialBalance?ref_key=" + key, { cache: false });
        },
        postConfirmBeForeAudit: function (data) {
            return $http.post(baseURL + "Accountings/PostConfirmBeForeAudit", data, HeaderConfig, { cache: false });
        },
        postAddAccountTrialBalance: function (data) {
            return $http.post(baseURL + "Accountings/PostAddAccountTrialBalance", data, HeaderConfig, { cache: false });
        },
        postAccountTrialBalanceNoted: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountTrialBalanceNoted", data, HeaderConfig, { cache: false });
        },
        getAccountAdjustment: function (key) {
            return $http.get(baseURL + "Accountings/GetAccountAdjustment?ref_key=" + key, { cache: false });
        },
        postAccountAdjustment: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAdjustment", data, HeaderConfig, { cache: false });
        },
        deleteAccountAdjustment: function (key) {
            return $http.delete(baseURL + "Accountings/DeleteAccountAdjustment?ref_key=" + key, { cache: false });
        },
        getAccountAdjustmentWithKey: function (key) {
            return $http.get(baseURL + "Accountings/GetAccountAdjustmentWithKey?ref_key=" + key, { cache: false });
        },
        postAccountFSLead: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountFSLead", data, HeaderConfig, { cache: false });
        },
        getSubFSLeadWithKey: function (key) {
            return $http.get(baseURL + "Accountings/GetSubFSLeadWithKey?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        deleteAuditDocument: function (key1) {
            return $http.delete(baseURL + "Accountings/DeleteAuditDocument?ref_key=" + makeid() + "&ref_id=" + key1, { cache: false });
        },
        postAccountAuditDocument : function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditDocument", data, HeaderConfig, { cache: false });
        },
        postAccountAuditAccount: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditAccount", data, HeaderConfig, { cache: false });
        },
        deleteAuditIssue: function (key1) {
            return $http.delete(baseURL + "Accountings/DeleteAuditIssue?ref_key=" + makeid() + "&ref_id=" + key1, { cache: false });
        },
        postAccountAuditIssue: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditIssue", data, HeaderConfig, { cache: false });
        },
        postAccountAuditIssueChangeStatus: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditIssueChangeStatus", data, HeaderConfig, { cache: false });
        },
        postAccountAuditConclusion: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditConclusion", data, HeaderConfig, { cache: false });
        },
        deleteAuditConclusion: function (key1) {
            return $http.delete(baseURL + "Accountings/DeleteAuditConclusion?ref_key=" + makeid() + "&ref_id=" + key1, { cache: false });
        },
        postAccountAuditAccountChangeStatus: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditAccountChangeStatus", data, HeaderConfig, { cache: false });
        },
        postAccountAuditFSGroupChangeStatus: function (data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditFSGroupChangeStatus", data, HeaderConfig, { cache: false });
        },
        postAccountAuditAccountReference: function (key,data) {
            return $http.post(baseURL + "Accountings/PostAccountAuditAccountReference?ref_key=" + key, data, HeaderConfig, { cache: false });
        },
        postAuditFSgroupNoteFS: function (data) {
            return $http.post(baseURL + "Accountings/PostAuditFSgroupNoteFS", data, HeaderConfig, { cache: false });
        },
        deleteAuditNoteFS: function (key1) {
            return $http.delete(baseURL + "Accountings/DeleteAuditNoteFS?ref_key=" + makeid() + "&ref_id=" + key1, { cache: false });
        },
        getAssignAuditFSGroup: function (key) {
            return $http.get(baseURL + "Accountings/GetAssignAuditFSGroup?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        postAssignAuditFSGroup: function (data) {
            return $http.post(baseURL + "Accountings/PostAssignAuditFSGroup", data, HeaderConfig, { cache: false });
        },
        deleteAssignAuditFSGroup: function (key) {
            return $http.delete(baseURL + "Accountings/DeleteAssignAuditFSGroup?ref_key=" + key, { cache: false });
        },
        disabledAssignAuditFSGroup: function (key) {
            return $http.delete(baseURL + "Accountings/DisabledAssignAuditFSGroup?ref_key=" + key, { cache: false });
        },
        onDisabledAssignAuditFSGroup: function (key) {
            return $http.delete(baseURL + "Accountings/OnDisabledAssignAuditFSGroup?ref_key=" + key, { cache: false });
        },
        confirmAuditAccountPeriods: function (key) {
            return $http.get(baseURL + "Accountings/ConfirmAuditAccountPeriods?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        getdraftreport: function (key) {
            return $http.get(baseURL + "Accountings/GetDraftReport?ref_key=" + key, { cache: false });
        },
    };
}]);

