import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: 'zck@123',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = {
      user: payload.sub,
    };

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
