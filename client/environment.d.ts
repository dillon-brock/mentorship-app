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
      SECURE_COOKIES: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_PRESET_NAME: string;
      TALK_APP_ID: string;
    }
  }
}