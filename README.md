# French Verb Scraper

I am learning French and to fascilitate this I am in need of verbs to input into an app that will test my learning of said verbs. But first I need the verbs and a place that has all the verbs is [conjugator.reverso.net](https://conjugator.reverso.net/).

Once I have the verbs I will be able to test myself against the verbs: what does each verb mean and how to conjugate it.

## TODO List

### Data

- [x] Get a list of index pages using Playwright. Store as a .json file
- [x] For each of these index pages there is a list of verbs with their links, collect all of these and store as a .json file
- [x] construct a data structure as a Typescript interface to know the shape for the data to be collected per verb
- [x] Grab the HTML from an individual page by going to each url with Playwright
- [ ] from the HTML, grab the pertinent data and store as a .json file

- [ ] Write tests to check whether the data from the convertOneVerbPageHTMLToGetTheData function is accurate versus the input HTML

### Future

- Store the data in a DB. A DB could be useful if I want to have the ability in the future to add custom non-verb words, add extra verbs from elsewhere. I'll make that choice later.

### Visualise the data

Part one is the collection of the data and now I need to actually use this data so I can learn the verbs and their patterns. So a simple first step would be to create a page for each verb, with an index page for everything, search ability. Grouping of verbs e.g. by auxilary verb, etc.
