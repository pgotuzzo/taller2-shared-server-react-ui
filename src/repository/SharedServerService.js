export var SharedServerServiceSingleton = (function () {
    function SharedServerService() {

        // Public methods
        this.getToken = function (userName, password, promise) {
            const url = BASE_URL + ENDPOINT.TOKEN;
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
            const url = BASE_URL + ENDPOINT.DELIVERIES;
            fetch(url).then(promise);
        };

        this.getDelivery = function (deliveryId, promise) {
            const url = BASE_URL + ENDPOINT.DELIVERIES + deliveryId;
            fetch(url).then(promise);
        };

        this.setDeliveryStatus = function (deliveryId, deliveryStatus, promise) {
            const url = BASE_URL + ENDPOINT.DELIVERIES + deliveryId;
            const data = {
                id: deliveryId,
                status: deliveryStatus
            };
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(promise);
        };

        this.getPayments = function (promise) {
            const url = BASE_URL + ENDPOINT.PAYMENTS;
            fetch(url).then(promise);
        };

        this.getPayment = function (paymentId, promise) {
            // TODO - Implement
        };

        this.setPaymentStatus = function (paymentId, paymentStatus, promise) {
            // TODO - Implement
        };

        const BASE_URL = "https://shared-server-tallerii.herokuapp.com";
        const ENDPOINT = {
            TOKEN: "/user/token/",
            DELIVERIES: "/tracking/",
            PAYMENTS: "/payments/",
            PAYMENTS_METHODS: "/payments/methods/"
        }

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