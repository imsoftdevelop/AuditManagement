HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceEmployee', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getEmployee: function () { 
            return $http.get(baseURL + "Employees/GetEmployees?ref_key=" + makeid(), { cache: false });
        },
        postEmployee: function (data) {
            return $http.post(baseURL + "Employees/PostEmployees", data, HeaderConfig, { cache: false });
        },
        deleteEmployee: function (key) {
            return $http.delete(baseURL + "Employees/DeleteEmployees?ref_key=" + key, { cache: false });
        },
        getEmployeeWithKey: function (key) {
            return $http.get(baseURL + "Employees/GetEmployeesWithKey?ref_key=" + key, { cache: false });
        },
        
    };
}]);

