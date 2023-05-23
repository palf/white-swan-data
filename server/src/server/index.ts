import { resolveUser } from './users';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { postOddsHandler } from './middleware/postOdds';
import { authenticate } from './middleware/authenticate';
import { logger } from '../utils/logger';

// Create an instance of Express.js
const app = express();

// Configure Express.js middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Passport.js for authentication
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    const maybeUser = resolveUser(username, password);
    if (maybeUser) {
      logger.debug({ msg: 'resolved user', maybeUser });
    } else {
      logger.debug({ msg: 'did not resolve user' });
    }

    return done(null, maybeUser);
  })
);

app.use(passport.initialize());

// Define the POST /odds endpoint
app.post('/odds', authenticate, postOddsHandler(logger));

// Start the server
app.listen(3000, () => {
  logger.info('Server is running on http://localhost:3000');
});
