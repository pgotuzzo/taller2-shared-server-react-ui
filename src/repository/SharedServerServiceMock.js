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
                        version: "string"
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

        this.getEnvios = function (promise) {
            let init;
            let data;
            init = {"status": 201};
            data = {
                state: "OK",
                data: [
                    {
                        id: 2, estado: "PENDIENTE", desde: "aca", hasta: "alla"
                    },
                    {
                        id: 1, estado: "EN_TRANSITO", desde: "aca", hasta: "alla"
                    },
                    {
                        id: 5, estado: "PENDIENTE", desde: "local", hasta: "heroku"
                    }
                ]
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
})();