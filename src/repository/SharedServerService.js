import {Session} from "../di";

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
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
        };

        this.getDelivery = function (deliveryId, promise) {
            const url = BASE_URL + ENDPOINT.DELIVERIES + deliveryId;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
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
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                },
                body: JSON.stringify(data)
            }).then(promise);
        };

        this.getPayments = function (promise) {
            const url = BASE_URL + ENDPOINT.PAYMENTS;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
        };

        this.getPayment = function (paymentId, promise) {
            const url = BASE_URL + ENDPOINT.PAYMENTS_BY_ID + paymentId;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
        };

        this.setPaymentStatus = function (paymentId, paymentStatus, promise) {
            const url = BASE_URL + ENDPOINT.PAYMENTS_BY_ID + paymentId;
            const data = {
                transaction_id: paymentId,
                status: paymentStatus
            };
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                },
                body: JSON.stringify(data)
            }).then(promise);
        };

        this.getAppServers = function (promise) {
            const url = BASE_URL + ENDPOINT.APP_SERVERS;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
        };

        this.addAppServers = function (userName, serverName, promise) {
            const url = BASE_URL + ENDPOINT.APP_SERVERS;
            const data = {
                createdBy: userName,
                name: serverName
            };
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                },
                body: JSON.stringify(data)
            }).then(promise);
        };

		this.deleteAppServer = function (serverId, promise) {
			const url = BASE_URL + ENDPOINT.APP_SERVERS + serverId;
			fetch(url, {
				method: "DELETE",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then(promise);
		}

        const BASE_URL = "https://shared-server-tallerii.herokuapp.com";
        const ENDPOINT = {
            TOKEN: "/user/token",
            DELIVERIES: "/tracking/",
            PAYMENTS: "/payments/",
            PAYMENTS_BY_ID: "/payments/id/",
            PAYMENTS_METHODS: "/payments/methods/",
            APP_SERVERS: "/servers/"
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
