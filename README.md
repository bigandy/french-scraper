# French Verb Scraper

I am learning French and to fascilitate this I am in need of verbs to input into an app that will test my learning of said verbs. But first I need the verbs and a place that has all the verbs is [conjugator.reverso.net](https://conjugator.reverso.net/).

Once I have the verbs I will be able to test myself against the verbs: what does each verb mean and how to conjugate it.

## TODO List

### Data

1. Get list of all verbs contained on site (2000 verbs) by going to an index page, getting all the links to other index pages and then with all these index pages, scrape each index page and harvest the data.

2. Once have a list of 2000 urls of verbs to harvest, construct a data structure to store all this data for use later on

3. With the list of the 2000 urls and the structure of the data it is now time to run Playwright scraper on each of these pages, one at a time in a queue, to collect this data

4. Store the data. But where? Either as local .json files or in a DB. A DB could be useful if I want to have the ability in the future to add custom non-verb words, add extra verbs from elsewhere. I'll make that choice later.

### Visualise the data

Part one is the collection of the data and now I need to actually use this data so I can learn the verbs and their patterns. So a simple first step would be to create a page for each verb, with an index page for everything, search ability. Grouping of verbs e.g. by auxilary verb, etc.
