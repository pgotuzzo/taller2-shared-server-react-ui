import {Log4jLogger} from "./utils/Logger"
// import {SharedServerServiceMockSingleton} from "./repository/SharedServerServiceMock"
import {SharedServerServiceSingleton} from "./repository/SharedServerService";
import {SessionSingleton} from "./utils/Session";

export var Logger = Log4jLogger;
export var Session = SessionSingleton.getInstance();
export var SharedServerService = SharedServerServiceSingleton.getInstance();
// export var SharedServerService = SharedServerServiceMockSingleton.getInstance();
