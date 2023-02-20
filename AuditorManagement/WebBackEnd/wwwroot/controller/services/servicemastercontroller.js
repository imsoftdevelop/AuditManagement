HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
FOCUSAPP.factory('serviceMaster', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getFSGroupAdmin: function () {
            return $http.get(baseURL + "Master/GetFSGroupAdmin?ref_key=" + makeid(), { cache: false });
        },
        postFSGroupAdmin: function (data) { 
            return $http.post(baseURL + "Master/PostFSGroupAdmin", data, HeaderConfig, { cache: false });
        },
        deleteFSGroupAdmin: function (key) {
            return $http.delete(baseURL + "Master/DeleteFSGroupAdmin?FsGroupId=" + key, { cache: false });
        },
        getDocumentTypeAdmin: function () {
            return $http.get(baseURL + "Master/GetDocumentTypeAdmin?ref_key=" + makeid(), { cache: false });
        },
        postDocumentTypeAdmin: function (data) {
            return $http.post(baseURL + "Master/PostDocumentTypeAdmin", data, HeaderConfig, { cache: false });
        },
        deleteDocumentTypeAdmin: function (key) {
            return $http.delete(baseURL + "Master/DeleteDocumentTypeAdmin?ref_key=" + key, { cache: false });
        },  
        getAuditProgramAdmin: function () {
            return $http.get(baseURL + "Master/GetAuditProgramAdmin?ref_key=" + makeid(), { cache: false });
        },
        postAuditProgramAdmin: function (data) {
            return $http.post(baseURL + "Master/PostAuditProgramAdmin", data, HeaderConfig, { cache: false });
        },
        deleteAuditProgramAdmin: function (key) {
            return $http.delete(baseURL + "Master/DeleteAuditProgramAdmin?ref_key=" + key, { cache: false });
        }, 
        getAuditProgramFSGroupAdmin: function () {
            return $http.get(baseURL + "Master/GetAuditProgramFSGroupAdmin?ref_key=" + makeid(), { cache: false });
        },
        postAuditProgramFSGroupAdmin: function (data) {
            return $http.post(baseURL + "Master/PostAuditProgramFSGroupAdmin", data, HeaderConfig, { cache: false });
        },
        
    };
}]);

