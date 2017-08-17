function Service($rootScope, $http, $ionicPopup) {

    var api = {
        website: 'webservice/api/websiteinfo',
        getUser: 'webservice/api/getUser',
        forgotPassword: 'webservice/api/forgotPassword',
        changepassword: 'webservice/api/changePassword',
        logout: 'webservice/api/logout',
        login: 'webservice/api/login',
        register: 'webservice/api/register',
    }, showError = false;

    $rootScope.service = {
        get: function (key, params, success, error) {

            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            console.log(params);

            var url = Config.baseUrl + api[key];

            $http.get(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        post: function (key, params, success, error) {
            if (typeof params === 'function') {
                callback = params;
                params = null;
            }
            var userData = [];
            console.log(params);

            var url = Config.baseUrl + api[key];
            $http.post(url, params).then(function (res) {
                console.log(res.data);

                success(res.data);
            }, handleError(error));
        },
        sendSms: function (params, success, error) {
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            var url = Config.baseUrl + 'smsapi/SendTemplateSMS.php';
            $http.get(url, {
                params: params
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        }
    };

    function handleError(error) {
        return function (err) {
            if (error)
                error(err);
            if (showError) {
                return;
            }
            showError = true;
            alert($rootScope.translations.network_error + '\r\n' + $rootScope.translations.check_network);
            /*
             $ionicPopup.alert({
             title: $rootScope.translations.network_error,
             template: $rootScope.translations.check_network,
             buttons: [{
             text: $rootScope.translations.ok,
             onTap: function () {
             showError = false;
             }
             }]
             });
             */
        };
    }
}
