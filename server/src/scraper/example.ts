import { scrapeOdds } from './scraper';

// Usage example
const eventUrl = 'york/event/31579270';

const logger = console;

scrapeOdds(logger, eventUrl)
  .then((data) => logger.info(data))
  .catch((error) => logger.error(error));
