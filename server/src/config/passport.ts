import { PassportStatic } from "passport";
import User from "../models/user";
import passportJwt from "passport-jwt";

const secret = "mySecret";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// Passport Configuration

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};

export default passportConfig;
