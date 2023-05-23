# White Swan Data
## Technical Task, Part 01

## Usage:

First, build the program:

```sh
$ npm install
$ npm run build
```

You'll now have a `dist` folder containing JavaScript files, which you can use like this:

```sh
$ node dist/scraper/index.js
```

You should see an error message with helpful usage instructions, telling you to provide an `eventUrl`:

```sh
$ node dist/scraper/index.js <your event url>
$ node dist/scraper/index.js york/event/31579270
```

To test the server, start it with the following:

```sh
$ npm run build
$ npm run server
```

You can verify it works with `httpie`:

```sh
$ http POST :3000/odds username="admin" password="password" eventUrl="york/event/31579270"
```

## Notes:

Although some concession to code quality has been met by using `eslint` and `prettier`, there is nothing for tests.
There is the `example.ts` script for manual testing, but no automation.
This program is extremely simple, which has reduced the benefit of testing down to negative value.
To test this effectively, we would need to fake out the `puppeteer` library (which would remove a lot of the value of tests), or create a page with fake data to draw from.
In this case I would argue that a manual test is sufficient. I want to be clear that I normally advocate in favour of tests where possible, but in this case I have to be pragmatic over dogmatic.

On the other hand, if we had ready test data available, I'd want to set up a regular integration test for this script that executed `puppeteer` and all.

Logging could be improved with a real library, such as `bunyan` or `pino`.

Error handling in the case of not finding data is sub-par. It would be better to create a type that represents failure, instead of throwing an Error. I've avoided this to avoid gold-plating something small.

There is a large note in `postOdds` detailing some concerns I have with this approach

The POST for odds is not aligned with the REST spec (this is part of the brief, not a design decision)
