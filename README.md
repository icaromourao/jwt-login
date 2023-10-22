# JWT-Based Login System with Node.js, Vue.js, and PostgreSQL

This project is a full-stack web application that showcases a secure login system using JSON Web Tokens (JWT) scheme. It combines Node.js for the backend, Vue.js for the frontend, and PostgreSQL for the database. The Node.js backend API is built with Express, Swagger, Prisma, Winston, and TypeScript. The Vue.js frontend is a web platform that includes a login screen and some views after login view. It uses Vuex, Vue Router, Axios, Sass, and EsLint. In the PostgreSQL database, various stored procedures, functions, tables and columns are implemented to store the data and support the backend.

## Features

- **Authentication:** Secure user authentication and authorization using JWT tokens.
- **Express and Swagger:** The backend API is built using Express, and it is documented using Swagger for easy integration and understanding.
- **Prisma ORM:** Prisma is used to interact with the database, providing a type-safe and efficient database layer.
- **Winston Logging:** Logging is implemented using Winston for effective debugging and monitoring.
- **TypeScript:** Backend is developed using TypeScript, offering enhanced code quality and maintainability.
- **Vue.js Frontend:** The Vue.js frontend provides a user-friendly interface with login screens and additional views.
- **State Management:** Vuex is utilized for state management on the frontend.
- **Routing:** Vue Router allows seamless navigation between views.
- **HTTP Requests:** Axios is used for making HTTP requests, ensuring smooth communication between frontend and backend.
- **Styling:** The project is styled with Sass for a clean and attractive UI.
- **Code Quality:** EsLint is integrated to maintain code quality and consistency.
- **Database Logic:** PostgreSQL database logic includes stored procedures, functions, tables, columns, and data required for the application.

## Installation

1. Clone this repository.

   ```bash
   git clone git@github.com:icaromourao/jwt-login.git
   ```

2. Navigate to the project directories.

   ```bash
   cd jwt-login
   ```
   
3. Install backend dependencies.

   ```bash
   cd backend
   npm install
   ```
   
4. Install frontend dependencies.

   ```bash
   cd frontend
   npm install
   ```
   
5. Create a PostgreSQL database and update the connection settings in the backend.
   
6. Run the backend server.

   ```bash
   cd backend
   npm run start:dev
   ```
   
7. Run the Vue.js app.

   ```bash
   cd frontend
   npm run serve
   ```
   
The application should now be running locally.

## Usage

- Access the Vue.js web platform by opening it in your browser.
- The application provides a login screen where you can sign in using your credentials.
- Once logged in, explore the additional views and example functionalities.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to enhance this project.

## License

This project is licensed under the [MIT License](https://github.com/icaromourao/jwt-login/blob/main/LICENSE).
