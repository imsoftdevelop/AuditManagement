HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceCustomer', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getCustomerWithKey: function (key) {
            return $http.get(baseURL + "Customers/GetCustomerWithKey?ref_key=" + key, { cache: false });
        },
        getDocumentPeriodWithKey: function (key) {
            return $http.get(baseURL + "Customers/GetDocumentPeriodWithKey?ref_key=" + key, { cache: false });
        },
        getAuditIssePeriodWithKey: function (key) {
            return $http.get(baseURL + "Customers/GetAuditIssePeriodWithKey?ref_key=" + key, { cache: false });
        },
        postProfiles: function (data) {
            return $http.post(baseURL + "Customers/PostProfiles", data, HeaderConfig, { cache: false });
        },
        getParameterDocumentTypeOwner: function (key) {
            return $http.get(baseURL + "Customers/GetParameterDocumentTypeWithOwner?ref_key=" + key, { cache: false });
        },
        postDocumentList: function (data) {
            return $http.post(baseURL + "Customers/PostDocumentList", data, HeaderConfig, { cache: false });
        },
        getDocumentList: function () {
            return $http.get(baseURL + "Customers/GetDocumentList?ref_key=" + makeid(), { cache: false });
        },
        getDocumentListWithKey: function (key) {
            return $http.get(baseURL + "Customers/GetDocumentListWithKey?ref_key=" + key, { cache: false });
        },
        deleteDocumentList: function (key) {
            return $http.delete(baseURL + "Customers/DeleteDocumentList?ref_key=" + key, { cache: false });
        },
        confirmCustomerAccountPeriods: function (key) {
            return $http.get(baseURL + "Customers/ConfirmCustomerAccountPeriods?ref_key=" + makeid() + "&ref_id=" + key, { cache: false });
        },
        
    };
}]);

