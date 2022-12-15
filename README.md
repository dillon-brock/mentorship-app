# SAGA

Saga is a site dedicated to making teaching and learning more accessible. It allows anyone with knowledge to share on any topic to create a teacher account, upload teaching materials, connect with students, or even connect with other instructors. Students can choose instructors from a searchable list, message them, and request to add them as an instructor (although requests must be approved by the instructor). They can view the shared teaching materials from any of their instructors, and there is also review functionality, so users that are current students of an instructor can leave a review (anonymously or not).

## Tech

This is a React application made with React Bootstrap. The server is written using Node.js and Express, and relies on a PostgreSQL database to store data.

## External APIs and Libraries

- ZIPcode API:

  This API provides the functionality for generating a user's city and state when they input their zip code, and allows for error handling if the user's location is invalid. It also allows users to not only search teachers by location, but provide a distance radius from the provided location.

- TalkJS

  This library is responsible for the chat functionality, i.e. the chat windows and the inbox.

- Cloudinary

  Cloudinary is being used to store any images or files uploaded by users. The URL to the Cloudinary asset is what is stored in the local database for profile pictures or uploaded PDFs.

- React Bootstrap

  React Bootstrap provided some built in components (such as the hamburger menu in the header), as well as some baseline styling. It also simplified some aspects of responsive layout.

## Testing

This application uses Jest and Supertest for server
tests.

## Deployment

[https://teachsaga.herokuapp.com/](https://teachsaga.herokuapp.com/)
