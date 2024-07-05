# Online Shop

This project is a frontend application for managing products and categories in an online shop. It features user authentication, product and category management through a user-friendly interface, and communicates with an API developed using Express and a SQLite database. Tailwind CSS is used for the design and styling of the user interface, enabling the creation of modern and responsive UI components efficiently.

## Table of Contents

1. [Installation](#installation)
2. [Setup](#setup)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [File Structure](#file-structure)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

To get started with this project, you'll need to clone the repository and install the necessary dependencies.

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/OnlineShop.git
    cd OnlineShop/Code
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Setup

1. Ensure you have Node.js and npm installed. You can download Node.js from [here](https://nodejs.org/).

2. Initialize the SQLite database:
    ```sh
    npm run init-db
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server should now be running at `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. You can register a new user, log in, manage products and categories through the provided interface.

## API Endpoints

### User Management

- **Register a new user**
  - **URL:** `http://localhost:3000/register`
  - **Method:** `POST`
  - **Description:** Register a new user.

- **Log in a user**
  - **URL:** `http://localhost:3000/login`
  - **Method:** `POST`
  - **Description:** Log in a user.

- **Reset password**
  - **URL:** `http://localhost:3000/reset-password`
  - **Method:** `POST`
  - **Description:** Reset a user's password.

### Category Management

- **Get all categories**
  - **URL:** `http://localhost:3000/categories`
  - **Method:** `GET`
  - **Description:** Retrieve all categories.

- **Create a new category**
  - **URL:** `http://localhost:3000/categories`
  - **Method:** `POST`
  - **Description:** Create a new category.

- **Get category by ID**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Method:** `GET`
  - **Description:** Retrieve a category by its ID.

- **Update category**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Method:** `PUT`
  - **Description:** Update a category by its ID.

- **Delete category**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Method:** `DELETE`
  - **Description:** Delete a category by its ID.

### Product Management

- **Get all products**
  - **URL:** `http://localhost:3000/products`
  - **Method:** `GET`
  - **Description:** Retrieve all products.

- **Create a new product**
  - **URL:** `http://localhost:3000/products`
  - **Method:** `POST`
  - **Description:** Create a new product.

- **Get product by ID**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Method:** `GET`
  - **Description:** Retrieve a product by its ID.

- **Update product**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Method:** `PUT`
  - **Description:** Update a product by its ID.

- **Delete product**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Method:** `DELETE`
  - **Description:** Delete a product by its ID.

## File Structure
OnlineShop/
├── Code/
│ ├── node_modules/
│ ├── src/
│ │ ├── Photo/
│ │ ├── CategoryCRUD.html
│ │ ├── Categorys.html
│ │ ├── error404.html
│ │ ├── index.html
│ │ ├── indexUSER.html
│ │ ├── input.css
│ │ ├── LogIn.html
│ │ ├── main.js
│ │ ├── output.css
│ │ ├── ProductsCRUD.html
│ │ ├── productsUSER.html
│ │ ├── Register.html
│ │ ├── ResetPass.html
│ │ └── überuns.html
│ ├── .gitattributes
│ ├── .gitignore
│ ├── app.js
│ ├── database.sqlite
│ ├── package-lock.json
│ ├── package.json
│ ├── README.md
│ ├── swagger.json
│ └── tailwind.config.js

### Description of Main Files

- **app.js:** The main file of the application that configures and starts the Express server. It defines the various API endpoints for user, product, and category management.
- **database.sqlite:** The SQLite database file that stores all the application data, including users, products, and categories.
- **swagger.json:** This file contains the Swagger documentation for the API, providing a visual and interactive representation of the API endpoints and their functionalities.
- **tailwind.config.js:** This file configures Tailwind CSS, a CSS framework used for styling the application.
- **src/index.html:** The main HTML file of the application, serving as the entry point. It includes the basic structure and references to CSS and JavaScript files.
- **src/main.js:** Contains the main JavaScript code that controls the application’s functionality, including event handlers and API calls.

## Technologies Used

- **Node.js and Express:** Backend technologies used to create the server and API endpoints.
- **SQLite:** Database used to store application data.
- **Tailwind CSS:** A CSS framework used for styling the application.
- **Swagger:** A tool used to document and interact with the API.

This Readme was generated by a IA
