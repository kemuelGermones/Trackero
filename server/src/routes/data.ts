import { Router } from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import { getData } from "../controllers/data";

const router = Router();

router.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(getData)
);

export default router;
