HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceBilling', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getRequestFormProcess: function () { // ดึง Request Form เฉพาะ Process Admin
            return $http.get(baseURL + "ServiceBilling/GetRequestFormProcessAdmin?ref_key=" + makeid(), { cache: false });
        },
        getRequestFormAll: function () { // ดึง Request Form All Admin
            return $http.get(baseURL + "ServiceBilling/GetRequestFormAllAdmin?ref_key=" + makeid(), { cache: false });
        },
        postChangeStatusRequestForm: function (data) { // อัพเดทสถานะ Request Form 
            return $http.post(baseURL + "ServiceBilling/PostRequestForm", data, HeaderConfig, { cache: false });
        },
        getRequestFormAllOwner: function () { // ดึง Request Form All Admin
            return $http.get(baseURL + "ServiceBilling/GetRequestFormAll?ref_key=" + makeid(), { cache: false });
        },
        postNewRequestForm: function (data) { // อัพเดทสถานะ Request Form 
            return $http.post(baseURL + "ServiceBilling/PostNewRequestForm", data, HeaderConfig, { cache: false });
        },

    };
}]);

