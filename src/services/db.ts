import { environment } from "@app/environments/environment";
import Sequelize from "sequelize";

const sequelize = new Sequelize(environment.DB.NAME, environment.DB.USERNAME, environment.DB.PASSWORD, {
    dialect: "sqlite",

    pool: {
        acquire: 30000,
        idle: 10000,
        max: 5,
        min: 0,
    },

    // SQLite only
    storage: "./db.sqlite",

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
    // tslint:disable-next-line:object-literal-sort-keys
    logging: false,
});

export default sequelize;
