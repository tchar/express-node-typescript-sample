export const environment: {
    BASIC_AUTH: {
        AUTHS: any,
        ENABLED: boolean,
    },
    LOGS_DIR: string,
    PORT: number,
} = {
    BASIC_AUTH: {
        AUTHS: {
           test: "test",
        },
        ENABLED: true,
    },
    LOGS_DIR: "./logs",
    PORT: 8087,
};
