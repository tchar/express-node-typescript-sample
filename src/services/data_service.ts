import {createHash, randomBytes} from "crypto";
import uuid from "uuid/v5";

class DataService {
    private users: any[] = [];

    constructor() {
        this.newUser("test", "test");
    }

    public getUserFromId(id: string): any {
        return this.getUser(id, "id");
    }

    public getUserFromUsername(username: string): any {
        return this.getUser(username, "username");
    }

    public newUser(username: string, password: string): Promise<void> {

        if (this.getUserFromUsername(username) != null) {
            return Promise.reject(new Error("User already exists"));
        }
        return this.generateSalt().then((salt) => {
            const hash = createHash("sha256");
            password = hash.update(Buffer.concat([Buffer.from(password), salt])).digest("base64");
            const user = {
                id: uuid(username, uuid.DNS),
                password,
                salt: salt.toString("base64"),
                username,
            };
            this.users.push(user);
        });
    }

    public login(username: string, password: string): Promise<void> {
        const user = this.getUserFromUsername(username);
        if (user == null || username == null || password == null) {
            return Promise.reject(new Error("Unauthorized"));
        }
        const hash = createHash("sha256");
        password = hash.update(
            Buffer.concat([Buffer.from(password), Buffer.from(user.salt, "base64")]),
        ).digest("base64");
        if (password !== user.password) {
            return Promise.reject(new Error("Unauthorized"));
        }
        return Promise.resolve();
    }

    private getUser(value: string, field: string) {
        return this.users.find((x) => x[field] === value);
    }

    private generateSalt(): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            randomBytes(12, (err: Error, buf: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buf);
                }
            });
        });
    }
}

export {DataService};
