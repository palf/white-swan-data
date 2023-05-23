import type { Logger } from '../utils/logger';
import puppeteer from 'puppeteer';

type HorseOdds = {
  name: string | null;
  odds: string | null;
};

const BASE_URL = 'https://m.skybet.com/horse-racing/';

async function scrapeHorseData(logger: Logger, url: string) {
  logger.debug('launching puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });

  logger.debug('opening new page');
  const page = await browser.newPage();

  logger.debug('navigating to url');
  await page.goto(url, { timeout: 4000 });

  // Wait for the table to load
  logger.debug('waiting for data');
  await page.waitForSelector('.market-table', { timeout: 4000 });

  const horseData = await page.evaluate(() => {
    const rows = document.querySelectorAll('.market-table .outcome-row');

    const data: Array<HorseOdds> = [];

    rows.forEach((x) => {
      const name = x.querySelector('.runner-info')?.textContent?.trim() || '';
      const odds = x.querySelector('.js-oc-price')?.textContent?.trim() || '';

      data.push({ name, odds });
    });

    return data;
  });

  await browser.close();

  return horseData;
}

export async function scrapeOdds(
  logger: Logger,
  eventUrl: string
): Promise<Array<HorseOdds>> {
  // await scrapeEventNames();
  const url = BASE_URL + encodeURIComponent(eventUrl);
  logger.debug({ url, msg: 'scraping url' });

  return await scrapeHorseData(logger, url);
}

async function scrapeEventNames() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://m.skybet.com/horse-racing/antepost');
  const futureRaceIds = await page.$$(`a[data-analytics*="[Antepost]"]`);

  const raceData = [];

  const futureRaceNames = await page.$$('.antepost-event-name');
  for (let j = 0; j < futureRaceNames.length; j++) {
    const raceDetails: Record<string, string> = {};
    const raceName = await futureRaceNames[j].evaluate((element) =>
      element.textContent?.trim()
    );
    const href = await futureRaceIds[j].evaluate((element) =>
      element.getAttribute('href')
    );
    const lastSlash = (href || '').lastIndexOf('/');
    const id = (href || '').substring(lastSlash + 1);
    raceDetails[id] = (raceName || '').replace(/^-\s*/, '');
    raceData.push(raceDetails);
  }

  console.log(raceData);
  await browser.close();

  return raceData;
}

// Get indivdual event details
// async function scrapeEventDetail(eventId) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(`https://m.skybet.com/horse-racing/event/${eventId}`);

//   const raceDetails = {};

//   // Race Name
//   const raceNameElement = await page.$x(
//     "//div[@id='hr-event-page-description']//h1"
//   );
//   const raceName = await raceNameElement[0].evaluate((element) =>
//     element.textContent.trim()
//   );

//   // Race Date
//   const raceDateElement = await page.$x("//p[@class='minor']");
//   const raceDate = await raceDateElement[0].evaluate((element) =>
//     element.textContent.trim()
//   );

//   // Race Odds
//   const raceOddsElement = await page.$x(
//     "//ul[@class='nav  nav--stacked']/li/strong[text()='Each way terms:']/following-sibling::text()[1]"
//   );
//   const raceOdds = await raceOddsElement[0].evaluate((element) =>
//     element.textContent.trim()
//   );

//   raceDetails.id = eventId;
//   raceDetails.odds = raceOdds;
//   raceDetails.name = raceName;
//   raceDetails.date = raceDate;
//   raceDetails.entrants = [];

//   const horseNameElements = await page.$$(
//     '.outcome-row .cell-text:first-child > b'
//   );
//   const currentOddsElements = await page.$$(
//     '.outcome-row .js-oc-price:first-child'
//   );
//   const previousOddsElements = await page.$$(
//     '.outcome-row .js-oc-prev-price:first-child'
//   );

//   // Get all Entrants with current and previous odds
//   for (j = 0; j < horseNameElements.length; j++) {
//     const oddsByHorse = {};
//     const horse = await horseNameElements[j].evaluate((element) =>
//       element.textContent.trim()
//     );
//     const currentOdds = await currentOddsElements[j].evaluate((element) =>
//       element.textContent.trim()
//     );
//     const previousOdds = await previousOddsElements[j].evaluate((element) =>
//       element.textContent.trim()
//     );

//     oddsByHorse.horse = horse;
//     oddsByHorse.current = currentOdds;
//     oddsByHorse.previous = previousOdds;
//     raceDetails.entrants.push(oddsByHorse);
//   }
//   return raceDetails;
// }
