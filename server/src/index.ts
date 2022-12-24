import express, { Request, Response, urlencoded, NextFunction } from "express";
import { connect, connection } from "mongoose";
import projectRoute from "./routes/project";
import issueRoute from "./routes/issue";
import projectCommentRoute from "./routes/projectComment";
import issueCommentRoute from "./routes/issueComment";
import AppError from "./utils/AppError";
import cors from "cors";

const app = express();

const dbUrl = "mongodb://127.0.0.1:27017/bug";
connect(dbUrl);
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("database connected");
});

app.use(cors());

app.use(urlencoded({ extended: true }));

app.use(express.json());

app.use("/projects", projectRoute);
app.use("/projects/:projectId/issues", issueRoute);
app.use("/projects/:projectId/comments", projectCommentRoute);
app.use("/issues/:issueId/comments", issueCommentRoute);

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
