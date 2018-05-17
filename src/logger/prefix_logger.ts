import Logger from "@app/logger/logger";

class PrefixLogger {

    public static getLogger(prefix: string = ""): PrefixLogger {
        return new PrefixLogger(prefix);
    }

    private prefix: string;

    private constructor(prefix: string) {
        prefix = prefix.trim();
        if (prefix !== "" && !prefix.endsWith(": ")) {
            prefix += ": ";
        }
        this.prefix = prefix;
    }

    public addPrefix(prefix: string) {
        return new PrefixLogger(this.prefix + prefix);
    }

    public info(...params: any[]) {
        return Logger.getLogger().info.apply(Logger.getLogger(), this.formatParams(params));
    }

    public debug(...params: any[]) {
        return Logger.getLogger().debug.apply(Logger.getLogger(), this.formatParams(params));
    }

    public warn(...params: any[]) {
        return Logger.getLogger().warn.apply(Logger.getLogger(), this.formatParams(params));
    }

    public error(...params: any[]) {
        return Logger.getLogger().error.apply(Logger.getLogger(), this.formatParams(params));
    }

    private formatParams(params: any[]): any[] {

        if (params.length > 0 && typeof params[0] === "string") {
            params[0] = this.prefix + params[0];
        } else if (params.length > 1 && typeof params[1] === "string") {
            params[1] = this.prefix + params[1];
        } else if (params.length > 1) {
            params.splice(1, 0, this.prefix);
        } else {
            params.push(this.prefix);
        }
        return params;
    }

}

export { PrefixLogger };
