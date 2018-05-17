import Sequelize from "sequelize";

const sequelize = new Sequelize("database", "root", "root", {
    dialect: "sqlite",
    host: "localhost",

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
});

export default sequelize;
