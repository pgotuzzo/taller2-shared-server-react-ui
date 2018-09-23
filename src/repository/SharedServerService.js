export var SharedServerServiceSingleton = (function () {
    function SharedServerService() {

        // Public methods
        this.getToken = function (userName, password, promise) {
            const url = baseUrl + endpointToken;
            fetch(url).then(promise);
        };

        this.getEnvios = function (promise) {
            const url = baseUrl + endpointEnvios;
            fetch(url).then(promise);
        };

        const baseUrl = "https://shared-server-tallerii.herokuapp.com";
        const endpointToken = "/user/token";
        const endpointEnvios = "/envios";
    }

    var _instance;
    return {
        getInstance: function () {
            if (_instance == null) {
                _instance = new SharedServerService();
                // Hide the constructor so the returned objected can't be new'd...
                _instance.constructor = null;
            }
            return _instance;
        }
    };
})();