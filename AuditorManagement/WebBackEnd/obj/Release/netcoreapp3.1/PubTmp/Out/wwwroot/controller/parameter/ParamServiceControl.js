HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };

FOCUSAPP.factory('paramService', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getPosition: function () {
            return $http.get(baseURL + "Manage/GetPostion?ref_key=" + makeid(), { cache: false });
        },
        getComplicate: function () {
            return $http.get(baseURL + "Parameter/GetComplicate?ref_key=" + makeid(), { cache: false });
        },
        getWorkType: function () {
            return $http.get(baseURL + "Parameter/GetWorkType?ref_key=" + makeid(), { cache: false });
        },
        getCustomer: function () {
            return $http.get(baseURL + "Parameter/GetCustomer?ref_key=" + makeid(), { cache: false });
        },
    
        getCustomerAll: function () {
            return $http.get(baseURL + "Parameter/GetCustomerAll?ref_key=" + makeid(), { cache: false });
        },
        getWorkTemplate: function () {
            return $http.get(baseURL + "Parameter/GetWorkTemplate?ref_key=" + makeid(), { cache: false });
        },
        getJobs: function () {
            return $http.get(baseURL + "Parameter/GetJobs?ref_key=" + makeid(), { cache: false });
        },
        getEmployee: function () {
            return $http.get(baseURL + "Parameter/GetEmployee?ref_key=" + makeid(), { cache: false });
        },
        getPosition: function () {
            return $http.get(baseURL + "Parameter/GetPostion?ref_key=" + makeid(), { cache: false });
        },
        getProfiles: function () {
            return $http.get(baseURL + "Home/GetProfilesPages?ref_key=" + makeid(), { cache: false });
        },
        getBusiness: function () {
            return $http.get(baseURL + "Manage/GetBusinessType?ref_key=" + makeid(), { cache: false });
        },
        getTitle: function () {
            return $http.get(baseURL + "Manage/GetTitle?ref_key=" + makeid(), { cache: false });
        },
    };
}]);

