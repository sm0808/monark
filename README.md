# MONARK

## Description

This project consists of a React.js frontend application and a Node.js Express backend server. The React app provides a user interface, while the Node server handles authentication and provides API endpoints. The backend server uses MySQL to store user data.

## Prerequisites

Before running the project, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MySQL](https://www.mysql.com/)

## Setup Instructions

### Frontend (React)

1. Clone the project repository:

   git clone https://github.com/yourusername/project-name.git

2. Navigate to the React app directory:

   cd monark

3. Install the frontend dependencies:

   npm install

4. Start the React development server:

   npm start

   The React app will be available at `http://localhost:3000`.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Backend (Node.js Express)

1. Navigate to the Node server directory:

   cd node_server

2. Install the backend dependencies:

   npm install

3. Create the MySQL database and user table:

   - The database and table will be created automatically on the first run of the Node server.

4. Seed the user table with initial data:

   - The user table will be seeded with a user having the email `j.doe@test.com` and the password `123456` on the first run of the Node server.

5. Start the Node.js Express server:

   npm start

   The Node server will run on `http://localhost:3500`.

## Usage

- Access the React app by opening a web browser and navigating to `http://localhost:3000`.
- Use the app to interact with the backend API, which handles user authentication.

## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to add more sections or customize the content as needed to suit your project's specific requirements. Additionally, you can include instructions on API endpoints, authentication, or any other relevant information based on your project's functionality.