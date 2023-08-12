# Express MongoDB RESTful API

This project is a simple Express.js application that provides a CRUD (Create, Read, Update, Delete) API for managing articles. It utilizes MongoDB as the database to store and retrieve article data. The application is built using modern JavaScript features and technologies.

## Prerequisites

Before running this application, make sure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Al-Mansori/wiki-API
cd wiki-API
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment Variables:

   Create a `.env` file in the root directory and provide the necessary environment variables:

   ```env
   DB_HOST=<MongoDB_Host>
   DB_PORT=<MongoDB_Port>
   DB_NAME=<Database_Name>
   ```

4. Start the Application:

```bash
node app.js
```

The application will start and be accessible at `http://localhost:3000`.

## API Endpoints

### Retrieve All Articles

- Endpoint: `GET /articles`
- Response: Returns a JSON array containing all articles in the database.

### Retrieve a Specific Article

- Endpoint: `GET /articles/:articleTitle`
- Parameters: `articleTitle` - The title of the article to retrieve.
- Response: Returns a JSON object representing the specified article.

### Create an Article

- Endpoint: `POST /articles`
- Request Body: JSON object with `title` and `content` fields.
- Response: Returns the JSON object of the created article.

### Update an Article

- Endpoint: `PUT /articles/:articleTitle`
- Parameters: `articleTitle` - The title of the article to update.
- Request Body: JSON object with updated `title` and/or `content` fields.
- Response: Returns a message indicating the update status.

### Update an Article (Partial Update)

- Endpoint: `PATCH /articles/:articleTitle`
- Parameters: `articleTitle` - The title of the article to update.
- Request Body: JSON object with fields to be updated.
- Response: Returns a message indicating the update status.

### Delete an Article

- Endpoint: `DELETE /articles/:articleTitle`
- Parameters: `articleTitle` - The title of the article to delete.
- Response: Returns a message indicating the deletion status.

### Delete All Articles

- Endpoint: `DELETE /articles`
- Response: Returns a message indicating the deletion of all articles.

## Technologies Used

- Express.js: Web application framework for building APIs.
- EJS: Templating engine for rendering views.
- MongoDB: NoSQL database for storing article data.
- Mongoose: MongoDB ODM for modeling and interacting with the database.

This project was developed as a learning exercise and follows basic CRUD operations using Express.js and MongoDB. It can be used as a starting point for more complex applications with additional features.
