export const environment: {
    PORT: number,
    BASIC_AUTH: boolean,
    LOGS_DIR: string,
    DB: {
        NAME: string,
        USERNAME: string,
        PASSWORD: string,
        TABLES: {
            USERS: {
                NAME: string,
            },
        },
    },
} = {
    PORT: 8086,
    // tslint:disable-next-line:object-literal-sort-keys
    BASIC_AUTH: false,
    LOGS_DIR: "./logs",
    // tslint:disable-next-line:object-literal-sort-keys
    DB: {
        NAME: "database",
        USERNAME: "root",
        // tslint:disable-next-line:object-literal-sort-keys
        PASSWORD: "root",
        TABLES: {
            USERS: {
                NAME: "users",
            },
        },
    },
};
