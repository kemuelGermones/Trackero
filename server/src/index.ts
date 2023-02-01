import express, { Request, Response, urlencoded, NextFunction } from "express";
import { connect, connection } from "mongoose";
import projectRoute from "./routes/project";
import issueRoute from "./routes/issue";
import userRoute from "./routes/user";
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

const app = express();

const dbUrl = "mongodb://127.0.0.1:27017/bug";
connect(dbUrl);
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("database connected");
});

app.use(cors());

app.use(helmet());

app.use(urlencoded({ extended: true }));

app.use(express.json());

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(passport.initialize());
passportConfig(passport);

app.use("/", userRoute);
app.use("/projects", projectRoute);
app.use("/issues", issueRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Page Not Found", 404));
});

interface IError {
  message: ConstructorParameters<typeof AppError>[0];
  status: ConstructorParameters<typeof AppError>[1];
}

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const { message = "Something Went Wrong", status = 500 } = err;
  res.status(status).json({ status, message });
});

const port: number = 5000;
app.listen(port, () => {
  console.log("Listening to port " + port);
});
