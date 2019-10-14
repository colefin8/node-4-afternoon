require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  checkForSession = require("../server/middlewares/checkForSession"),
  swagController = require("./controllers/swagController"),
  authController = require("./controllers/authController"),
  cartController = require("./controllers/cartController"),
  searchController = require("./controllers/searchController"),
  { SERVER_PORT, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);
app.use(checkForSession);

app.use(express.static(`${__dirname}/../build`));

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
app.get("/api/swag", swagController.read);
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_PORT}.`);
});
