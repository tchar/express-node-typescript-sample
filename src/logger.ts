import { environment } from "@app/environments/environment";
import bunyan from "bunyan";
import fs from "fs";
import path from "path";

class Logger {

    public static getLogger(): bunyan {
        Logger.setupLogger();
        return Logger.logger;
    }

    private static logger: bunyan;
    private static dir: string = environment.LOGS_DIR;

    private static setupLogger(): void {
        if (Logger.logger != null) {
            return;
        }
        if (!fs.existsSync(Logger.dir)) {
            fs.mkdirSync(Logger.dir);
        }
        Logger.logger = bunyan.createLogger({
            name: "Server",
            streams: [{
                count: 3,
                level: "info",
                path: path.join(Logger.dir, "info.log"),
                period: "1d",
                type: "rotating-file",
            }, {
                count: 3,
                level: "warn",
                    path: path.join(Logger.dir, "warn.log"),
                period: "1d",
                type: "rotating-file",
            }, {
                count: 3,
                level: "error",
                    path: path.join(Logger.dir, "error.log"),
                period: "1d",
                type: "rotating-file",
            }, {
                level: "info",
                stream: process.stdout,
            }],
        });
        Logger.logger.info("Logging to folder " + Logger.dir, {
            error: "error.log",
            info: "info.log",
            warn: "warn.log",
        });
    }
}

const logger: bunyan = Logger.getLogger();

export default Logger;
export {logger};
