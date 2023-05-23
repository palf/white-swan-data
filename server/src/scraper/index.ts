import { scrapeOdds } from './scraper';

// Parse command-line arguments
const args = process.argv.slice(2);
const eventUrl = args[0];

const logger = console;

if (!eventUrl) {
  logger.error('Usage: node index.js <eventUrl>');
  process.exit(1);
}

scrapeOdds(logger, eventUrl)
  .then((data) => logger.info(JSON.stringify(data)))
  .catch((error) => logger.error(error));
