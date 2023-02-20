HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };

FOCUSAPP.factory('globalService', ['$http', '$q', function ($http, $q) {
    var baseURL = $("base")[0].href;
    return {
        getProfile: function () {
            return $http.get(baseURL + "Authen/GetProfiles?ref_key=" + makeid(), { cache: false });
        },
        SetupSequence: function (list) {
            if (list != undefined && list.length > 0) {
                var i = 1;
                _.each(list, function (item) {
                    item.Seq = i;
                    i++;
                })

                return list;
            }
            else
                return list;
        },
        SetupDropdownDefault: function (list) {
            if (list != undefined && list.length > 0) {
                var parameter = { Code: '' , Name : '--กรุณาเลือก--' };
                list.unshift(parameter);
                return list;
            }
        },
        getConfigSystem : function() {
            return $http.get(baseURL + "Parameter/GetConfigSystem?ref_key=" + makeid(), { cache: false });
        }
    };
}]);

