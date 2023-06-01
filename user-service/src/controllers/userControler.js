// A client sends a request to the /users endpoint to retrieve a list of users.
// The request is received by the route handler in the users.js file in the routes folder.
// The route handler calls a function in the usersController.js file in the controllers folder to handle the request.
// The controller function calls a function in the userService.js file in the services folder to retrieve the list of users from the database.
// The service function returns the list of users to the controller function.
// The controller function formats the list of users as needed (e.g., converting it to JSON) and sends a response back to the client containing the list of users.
