import {Session} from "../di";

export var SharedServerServiceSingleton = (function () {
    function SharedServerService() {
		var _showLoader;
		var _hideLoader;

        // Public methods
        this.getToken = function (userName, password, promise) {
			_showLoader();
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
            }).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.getDeliveries = function (promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.DELIVERIES;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.getDelivery = function (deliveryId, promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.DELIVERIES + deliveryId;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.setDeliveryStatus = function (deliveryId, deliveryStatus, promise) {
			_showLoader();
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
            }).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.getPayments = function (promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.PAYMENTS;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.getPayment = function (paymentId, promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.PAYMENTS_BY_ID + paymentId;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.setPaymentStatus = function (paymentId, paymentStatus, promise) {
			_showLoader();
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
            }).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.getAppServers = function (promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.APP_SERVERS;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

        this.addAppServers = function (userName, serverName, promise) {
			_showLoader();
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
            }).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

		this.deleteAppServer = function (serverId, promise) {
			_showLoader();
			const url = BASE_URL + ENDPOINT.APP_SERVERS + serverId;
			fetch(url, {
				method: "DELETE",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
		}

		this.updateAppServer = function (serverId, serverName, rev, promise) {
			_showLoader();
			const url = BASE_URL + ENDPOINT.APP_SERVERS + serverId;
			const data = {
				name: serverName,
				_rev: rev
			}
			fetch(url, {
				method: "PUT",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                }),
                body: JSON.stringify(data)
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
		}

		this.getRequests = function(promise) {
			_showLoader();
			const url = BASE_URL + ENDPOINT.STATS;
			fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
		}

		this.getServersStates = function(promise) {
			_showLoader();
			const url = BASE_URL + ENDPOINT.SERVERS_STATUS;
			fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
		}

		this.getRules = function (promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.RULES;
            fetch(url, {
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

		this.addRule = function (rule, promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.RULES;
            fetch(url, {
				method: "POST",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                }),
                body: JSON.stringify(rule)
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

		this.updateRule = function (rule, promise) {
			_showLoader();
            const url = BASE_URL + ENDPOINT.RULES + rule.id;
            fetch(url, {
				method: "PUT",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                }),
                body: JSON.stringify(rule)
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
        };

		this.deleteRule = function (ruleId, promise) {
			_showLoader();
			const url = BASE_URL + ENDPOINT.RULES + ruleId;
			fetch(url, {
				method: "DELETE",
				headers: new Headers({
                    'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Session.token
                })
			}).then((data) => {
				promise(data);
				_hideLoader();
			});
		};

		this.setShowLoader = function(showLoader) {
			_showLoader = showLoader;
		}

		this.setHideLoader = function(hideLoader) {
			_hideLoader = hideLoader;
		}

        const BASE_URL = "https://shared-server-tallerii.herokuapp.com";
        const ENDPOINT = {
            TOKEN: "/user/token",
            DELIVERIES: "/tracking/",
            PAYMENTS: "/payments/",
            PAYMENTS_BY_ID: "/payments/id/",
            PAYMENTS_METHODS: "/payments/methods/",
            APP_SERVERS: "/servers/",
			STATS: "/report/requests/",
			SERVERS_STATUS: '/report/status',
			RULES: '/rules/'
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
