import Logger from "@app/logger/logger";

class PrefixLogger {

    public static getLogger(prefix: string = ""): PrefixLogger {
        return new PrefixLogger(prefix);
    }

    private prefix: string;

    private constructor(prefix: string) {
        if (!prefix.endsWith(": ")) {
            prefix += ": ";
        }
        this.prefix = prefix;
    }

    public addPrefix(prefix: string) {
        return new PrefixLogger(this.prefix + prefix);
    }

    public info(obj: any, ...params: any[]) {
        return Logger.getLogger().info.apply(Logger.getLogger(), [this.getMessage(obj)].concat(params));
    }

    public debug(obj: any, ...params: any[]) {
        return Logger.getLogger().debug.apply(Logger.getLogger(), [this.getMessage(obj)].concat(params));
    }

    public warn(obj: any, ...params: any[]) {
        return Logger.getLogger().warn.apply(Logger.getLogger(), [this.getMessage(obj)].concat(params));
    }

    public error(obj: any, ...params: any[]) {
        return Logger.getLogger().error.apply(Logger.getLogger(), [this.getMessage(obj)].concat(params));
    }

    private getMessage(obj: any): any {
        let msg;
        if (typeof obj === "string") {
            msg = this.prefix + obj;
        } else {
            msg = obj;
        }
        return msg;
    }

}

export { PrefixLogger };
