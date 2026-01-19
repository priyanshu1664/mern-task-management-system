const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const fetchUser = require("./middlewares/fetchUser");

const authRouter = require("./routes/authRouter");
const hostTaskRouter = require("./routes/hostTaskRouter");
const userTaskRouter = require("./routes/userTaskRouter");
const errorController = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl =
  "mongodb+srv://root:root@learnnode.xmhu5tm.mongodb.net/task-management?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: mongoUrl,
  collection: "sessions",
});

store.on("error", (err) => {
  console.error("Session store error:", err);
});

app.use(
  session({
    store,
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = !!req.session.isLoggedIn;
  res.locals.isLoggedIn = req.isLoggedIn;
  next();
});

app.use(fetchUser);

app.use("/api/auth", authRouter);

app.use("/api/user/tasks", userTaskRouter);

app.use("/api/host/tasks", hostTaskRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3200, () =>
      console.log("Server running at http://localhost:3200")
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
