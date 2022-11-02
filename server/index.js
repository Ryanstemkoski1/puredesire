const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { getCognitoMiddleware } = require("./middleware/cognitoAuth");
const usersRouter = require("./routers/usersRouter");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use('/files', express.static('files'));
app.use(cookieParser());
app.use(
  cors({
    origin: [
        process.env.SERVER_URL,
        process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
// app.use(cors({ origin: true, credentials: true }));


// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.send("<h1>Hello from the server side!</h1>");
});

// set up routes

app.use("/auth", require("./routers/usersRouter"));
app.use("/users", getCognitoMiddleware(), usersRouter);
app.use("/user", require("./routers/userRouter")); // Do not use this route on Staging or in Production. This is meant only for debugging using Postman and will skip Cognito.
app.use("/workbook", require("./routers/workbookRouter"));
app.use("/workbookItem", require("./routers/workbookItemRouter"));
app.use("/library", require("./routers/libraryRouter"));
app.use("/adminDashboard", require("./routers/adminDashboardRouter"));