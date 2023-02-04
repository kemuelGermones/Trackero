import express, { Request, Response, urlencoded, NextFunction } from "express";
import { connect, connection } from "mongoose";
import projectRoute from "./routes/project";
import issueRoute from "./routes/issue";
import userRoute from "./routes/user";
import dataRoute from "./routes/data";
import AppError from "./utils/AppError";
import cors from "cors";
import passport from "passport";
import passportConfig from "./config/passport";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { Types } from "mongoose";

declare global {
  namespace Express {
    export interface User {
      _id: Types.ObjectId;
      role: "Administrator" | "Developer";
    }
  }
}

interface IError {
  message: ConstructorParameters<typeof AppError>[0];
  status: ConstructorParameters<typeof AppError>[1];
}

const app = express();

// Mongoose Connection

const dbUrl = "mongodb://127.0.0.1:27017/bug";
connect(dbUrl);
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("database connected");
});

app.use(cors());

// Helmet middleware for security

app.use(helmet());

// Parses incoming requests

app.use(urlencoded({ extended: true }));

app.use(express.json());

// Searches for any keys in objects that begin with a '$' sign or contain a '.'
// from req.body, req.query or req.params
// and replaces it with '_'.

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Passport config & middleware

app.use(passport.initialize());
passportConfig(passport);

// Routes

app.use("/", dataRoute);
app.use("/users", userRoute);
app.use("/projects", projectRoute);
app.use("/issues", issueRoute);

// New error if a route is not recognized

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Page Not Found", 404));
});

// Error Handler

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const { message = "Something Went Wrong", status = 500 } = err;
  res.status(status).json({ status, message });
});

// listens for connections on the given path

const port: number = 5000;
app.listen(port, () => {
  console.log("Listening to port " + port);
});
