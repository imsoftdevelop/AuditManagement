HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceAuthen', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        //getFSGroupAdmin: function () {
        //    return $http.get(baseURL + "Master/GetFSGroupAdmin?ref_key=" + makeid(), { cache: false });
        //},
        postRegister: function (data) { 
            return $http.post(baseURL + "Authen/PostRegister", data, HeaderConfig, { cache: false });
        },
        postForgetPassword: function (data) {
            return $http.post(baseURL + "Authen/PostForgetPassword", data, HeaderConfig, { cache: false });
        },
        postBranch: function (data) {
            return $http.post(baseURL + "Authen/PostBranch", data, HeaderConfig, { cache: false });
        },
    };
}]);

