const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController");

authRouter.use((req, res, next) => {
  console.log("AUTH ROUTE HIT:", req.method, req.originalUrl);
  next();
});

// Auth pages / actions
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);
authRouter.post("/signup", authController.postSignup);

authRouter.get("/me", authController.getCurrentUser);

// Protected route
//router.get("/dashboard", authController.dashboard);

module.exports = authRouter;
