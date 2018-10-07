export var SharedServerServiceSingleton = (function () {
    function SharedServerService() {

        // Public methods
        this.getToken = function (userName, password, promise) {
            const url = baseUrl + endpointToken;
            const data = {
                username: userName,
                password: password
            };
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(promise);
        };

        this.getDeliveries = function (promise) {
            const url = baseUrl + endpointDeliveries;
            fetch(url).then(promise);
        };

        this.getDelivery = function (deliveryId, promise) {
            const url = baseUrl + endpointDelivery + deliveryId;
            fetch(url).then(promise);
        };

        this.setDeliveryState = function (deliveryStatus, promise) {
            // TODO - Implementar
            // const url = baseUrl + endpointDelivery + deliveryId;
            // fetch(url).then(promise);
        };

        const baseUrl = "https://shared-server-tallerii.herokuapp.com";
        const endpointToken = "/user/token";
        const endpointDeliveries = "/tracking";
        const endpointDelivery = "/tracking/";
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