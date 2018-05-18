import { environment } from "@app/environments/environment";
import { PrefixLogger } from "@app/logger/prefix_logger";
import db from "@app/services/db";
import { createHash, randomBytes } from "crypto";
import Sequelize from "sequelize";
import uuid from "uuid/v5";

const logger: PrefixLogger = PrefixLogger.getLogger("User");

function generateSalt(): Promise < Buffer > {
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

const User: any = db.define("users", {
    uuid: {
        type: Sequelize.STRING,
        unique: true,
        // tslint:disable-next-line:object-literal-sort-keys
        get() {
            const context: any = this;
            return uuid(context.getDataValue("username"), uuid.DNS);
        },
        // tslint:disable-next-line:object-literal-sort-keys
        allowNull: false,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    username: {
        type: Sequelize.STRING,
        unique: true,
        // tslint:disable-next-line:object-literal-sort-keys
        allowNull: false,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    password: {
        type: Sequelize.STRING,
        // tslint:disable-next-line:object-literal-sort-keys
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING,
        // tslint:disable-next-line:object-literal-sort-keys
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: (user: any, options) => {
            const hash = createHash("sha256");
            user.password = hash.update(
                Buffer.concat([Buffer.from(user.password), Buffer.from(user.salt, "base64")]),
            ).digest("base64");
            return user;
        },
        beforeUpdate: (user, options) => {
            return user;
        },
        beforeValidate: (user, options) => {
            user.uuid = user.get("uuid");
            return generateSalt()
            .then((salt: Buffer) => user.salt = salt.toString("base64"))
            .then(() => user);
        },
    },
    // tslint:disable-next-line:object-literal-sort-keys
    freezeTableName: true,
    tableName: environment.DB.TABLES.USERS.NAME,
});

User.login = (username: string, password: string): Promise<any> => {
    if (username == null || password == null) {
        return Promise.reject(new Error("Username or password is empty"));
    }
    const hash = createHash("sha256");
    return User.findOne({
        where: {
            username,
        },
    }).
    then((user: any) => {
        if (user == null) {
            return Promise.reject("Invalid username or password");
        }
        password = hash.update(
            Buffer.concat([Buffer.from(password), Buffer.from(user.salt, "base64")]),
        ).digest("base64");
        if (password !== user.password) {
            return Promise.reject("Invalid username or password");
        }
        return {
            uuid: user.uuid,
            // tslint:disable-next-line:object-literal-sort-keys
            username: user.username,
        };
    });
},

User.sync()
.then(() => {
    return User.create({
        username: "test",
        // tslint:disable-next-line:object-literal-sort-keys
        password: "test",
    });
}).then(() => logger.info("User test created"))
.catch(() => null);

export {User};
