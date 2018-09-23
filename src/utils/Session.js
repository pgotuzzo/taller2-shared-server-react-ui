export var SessionSingleton = (function () {
    function SessionContract() {
        // Properties
        this.token = "";
        this.userName = "";

        // Public methods
        this.loadExisting = function () {
            this.userName = sessionStorage.getItem(SessionContract.storageUserName);
            this.token = sessionStorage.getItem(SessionContract.storageToken);
        };

        this.create = function (token, userName) {
            this.token = token;
            this.userName = userName;
            store(this.userName, this.token);
        };

        this.reset = function () {
            this.token = "";
            this.userName = "";
            store(this.userName, this.token);
        };

        this.isSigned = function () {
            const tokenCheck = this.token !== null && this.token !== "";
            const userNameCheck = this.userName !== null && this.userName !== "";
            return tokenCheck && userNameCheck;
        };

        // Private methods
        var store = function (userName, token) {
            sessionStorage.setItem(SessionContract.storageUserName, userName);
            sessionStorage.setItem(SessionContract.storageToken, token);
        }
    }

    SessionContract.tag = "Session";
    SessionContract.storageUserName = SessionContract.tag + "_userName";
    SessionContract.storageToken = SessionContract.tag + "_token";

    var _instance;
    return {
        getInstance: function () {
            if (_instance == null) {
                _instance = new SessionContract();
                // Hide the constructor so the returned objected can't be new'd...
                _instance.constructor = null;
            }
            return _instance;
        }
    };
})();