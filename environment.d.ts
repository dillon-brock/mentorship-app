export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_URL: string;
      PORT: string;
      COOKIE_NAME: string;
      SALT_ROUNDS: string;
      JWT_SECRET: string;
      API_FETCH_URL: string;
      ZIPCODE_API_KEY: string;
    }
  }
}