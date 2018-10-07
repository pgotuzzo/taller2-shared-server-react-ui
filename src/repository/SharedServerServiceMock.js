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
            let init;
            let data;
            init = {"status": 201};
            data = [
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
            // TODO - Implementar
            // const init = {"status": 201};
            // const data = {
            //     metadata: {
            //         version: "string"
            //     },
            //     token: {
            //         expiresAt: 0,
            //         token: "soy_token_mocked"
            //     }
            // };
            // const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            // const response = new Response(blob, init);
            // promise(response);
        };

        this.setDeliveryState = function (deliveryStatus, promise) {
            // TODO - Implementar
            // const url = baseUrl + endpointDelivery + deliveryId;
            // fetch(url).then(promise);
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