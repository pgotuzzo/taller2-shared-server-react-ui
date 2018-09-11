var Session = (function () {
    function Session() {
        this.token = "";
        this.userName = "";

        this.create = function (token, userName) {
            this.token = token;
            this.userName = userName;
        };

        this.reset = function () {
            this.token = "";
            this.userName = "";
        };

        this.isSigned = function () {
            return this.token !== "" && this.userName !== "";
        };

        this.getToken = function () {
            return this.token;
        };

        this.getUserName = function () {
            return this.userName;
        };
    }

    var _instance;
    return {
        getInstance: function () {
            if (_instance == null) {
                _instance = new Session();
                // Hide the constructor so the returned objected can't be new'd...
                _instance.constructor = null;
            }
            return _instance;
        }
    };
})();