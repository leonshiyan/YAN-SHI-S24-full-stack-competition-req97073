# Product Manager App
This app is a simple product management tool that allows users to create, edit, and delete products and search for products by the name of the Scrum Master or the name of a Developer. The app is built using React, with data fetched from a REST API.

## Features
View a list of products with details such as name, Scrum Master, Product Owner, start date, methodology, product number, and developers.

Filter the products by the name of the Scrum Master or the name of a Developer.

Edit an existing product's details.

Delete a product from the list.

Create a new product with the specified details.

## How to Use

To run the application locally, follow these steps:

1. Clone the repository to your local machine
2. Install dependencies by running npm install
3. Start the development server by running npm start
4. Open http://localhost:3000 in a web browser to view the application

To create a new product, click the "Create Product" button at the top of the page. This will bring up a form where you can enter the product details. Click "Save" to submit the new product, or "Cancel" to close the form.

To edit a product, click the "Edit" button on the right side of the product row in the table. This will bring up a form where you can modify the product details. Click "Save" to submit the changes, or "Cancel" to close the form.

To delete a product, click the "Delete" button on the right side of the product row in the table. This will remove the product from the list.


Dependencies
This app requires the following dependencies:

react
react-dom
react-scripts
It also uses a custom API module to fetch and manipulate data, which is included in the project.
