import type { Logger } from '../../utils/logger';
import type { Request, Response } from 'express';

import { scrapeOdds } from '../../scraper/scraper';

export function postOddsHandler(logger: Logger) {
  return (req: Request, res: Response): void => {
    const { eventUrl } = req.body;

    console.log(req.body)
    // Validate the request body
    if (!eventUrl) {
      res.status(400).json({ message: 'Event URL is required' });
      return
    }

    // this is where we'd leverage the code from task 01
    // I strongly recommend against doing that though
    // it would require us to be running puppeteer on the same containers/instances running our server, which may result in:
    // - degradation of service if resources become too constrained
    // - opens a risk of a bad actor using us as a middleman to attack another site; our rate limits may be higher than the targets, for example
    //
    // As an alternative I'd suggest that this endpoint creates a 'job' and returns a job id to the user, which can then be used in subsequent requests to get job status and associated data
    // We create jobs in some store, then have a different set of processes read and execute them
    // Those processes will use puppeteer to update and store odds data along with a timestamp
    // multiple jobs may target the same data, so we can apply caching
    // we can deliver some SLA that says 'odds data up-to-date within 5 minutes', and only hit the site if our cached data is older than the SLA, allowing us to respect a global rate limit
    // this decoupling means we can't be used as an attack vector, and our services have independent resourcing

    scrapeOdds(logger, eventUrl)
      .then((odds) => {
        res.json(odds);
      })
      .catch((err) => {
        logger.error({ msg: 'Error scraping odds', err });
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };
}
