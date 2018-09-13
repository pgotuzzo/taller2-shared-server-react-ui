var SessionSingleton = (function () {
    function Session() {
        // Properties
        this.token = "";
        this.userName = "";

        // Public methods
        this.loadExisting = function () {
            this.userName = sessionStorage.getItem(Session.storageUserName);
            this.token = sessionStorage.getItem(Session.storageToken);
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
            sessionStorage.setItem(Session.storageUserName, userName);
            sessionStorage.setItem(Session.storageToken, token);
        }
    }

    Session.tag = "Session";
    Session.storageUserName = Session.tag + "_userName";
    Session.storageToken = Session.tag + "_token";

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

export default SessionSingleton;