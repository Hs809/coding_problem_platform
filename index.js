const app = require("./app");
const connectDB = require("./config/db");

// database connection
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// create a signup route and store the user with role and password in encrypt.
//  create a login route for user
// create a middleware to access certain route with admin role only
//
