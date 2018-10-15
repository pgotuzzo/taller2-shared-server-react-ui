export var SharedServerServiceMockSingleton = (function () {
    function SharedServerService() {
        // Public methods
        this.getToken = function (userName, password, promise) {
            let init;
            let data;
            if (userName === "pgotuzzo" && password === "123456") {
                init = {"status": 201};
                data = {
                    metadata: {
                        version: "0.1"
                    },
                    token: {
                        expiresAt: 0,
                        token: "soy_token_mocked"
                    }
                };
            } else {
                init = {"status": 400};
                data = {
                    "code": 0,
                    "message": "string"
                }
            }
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.getDeliveries = function (promise) {
            const init = {"status": 201};
            const data = [
                {
                    id: 2, status: "PENDIENTE", updateat: "2018-09-26T00:00:00.000Z"
                },
                {
                    id: 1, status: "EN_TRANSITO", updateat: "2018-09-26T00:00:00.000Z"
                },
                {
                    id: 5, status: "PENDIENTE", updateat: "2018-09-26T00:00:00.000Z"
                }];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.getDelivery = function (deliveryId, promise) {
            const init = {"status": 201};
            const data = [
                {
                    id: deliveryId,
                    status: "PENDIENTE",
                    updateat: "2018-03-01T00:00:00.000Z"
                },
                {
                    id: deliveryId,
                    status: "EN_TRANSITO",
                    updateat: "2018-10-07T00:00:00.000Z"
                }
            ];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.setDeliveryStatus = function (deliveryId, deliveryStatus, promise) {
            const init = {"status": 201};
            const data = [];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.getPayments = function (promise) {
            const init = {"status": 201};
            const data = [
                {
                    transaction_id: "101",
                    currency: "AR",
                    value: 15000,
                    paymentMethod: {
                        epiration_month: "9",
                        expiration_year: "2019",
                        method: "Tarjeta",
                        number: "1",
                        type: "VISA-Debito"
                    },
                    status: "PENDIENTE"
                },
                {
                    transaction_id: "289",
                    currency: "US",
                    value: 56,
                    paymentMethod: {
                        epiration_month: "1",
                        expiration_year: "2020",
                        method: "Tarjeta",
                        number: "2",
                        type: "MasterCard-Credito"
                    },
                    status: "PENDIENTE"
                }
            ];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.getPayment = function (paymentId, promise) {
            const init = {"status": 201};
            const data = [{
                transaction_id: "289",
                currency: "US",
                value: 56,
                paymentMethod: {
                    epiration_month: "1",
                    expiration_year: "2020",
                    method: "Tarjeta",
                    number: "2",
                },
                status: "PENDIENTE"
            }];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.setPaymentStatus = function (paymentId, paymentStatus, promise) {
            const init = {"status": 201};
            const data = [];
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.getAppServers = function (promise) {
            const init = {"status": 200};
            const data = {
                metadata: {
                    version: 1,
                    total: 2
                },
                servers: [
                    {
                        id: 1,
                        _rev: "0",
                        createdBy: "Damian",
                        createdTime: "2018-10-11T20:14:12.700Z",
                        name: "server1",
                        lastConnection: null
                    },
                    {
                        id: 2,
                        _rev: "0",
                        createdBy: "Pablo",
                        createdTime: "2018-10-15T12:53:41.511Z",
                        name: "pablo1",
                        lastConnection: null
                    }
                ]
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };

        this.addAppServers = function (userName, serverName, promise) {
            const init = {"status": 200};
            const data = {
                metadata: {
                    version: 1
                },
                server: {
                    token: {
                        expiresAt: 0,
                        token: "12345678"
                    },
                    server: {
                        id: 2,
                        _rev: "0",
                        createdBy: "Pablo",
                        createdTime: "2018-10-15T12:53:41.511Z",
                        name: "pablo1",
                        lastConnection: null
                    }
                }
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const response = new Response(blob, init);
            promise(response);
        };
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
})
();