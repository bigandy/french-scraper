import fs from 'fs-extra'
import playwright from 'playwright'

import { browserType, launchOptions } from './config'

import { scrapePageForHTMLContent } from './scrapeOneVerbPage'

import PQueue from 'p-queue'
const queue = new PQueue({
	concurrency: 1,
	interval: 5000, // 5s
	intervalCap: 1,
})

// TODO
// 1. [x] Read a json file that contains an array of index page urls
// 2. [x] For each of this list visit each of the pages with playwright
// 3. [x] save the HTML file
// 4. [x] Have a queue
// 4. [x] record if successful
// 5. [x] record if unsuccessful

export const scrapeAllVerbPages = async () => {
	console.log('Running scrapeAllVerbPages script')

	try {
		const fileDataBuffer = await fs.readFileSync(
			'./data/urls/all-verb-urls.json',
		)

		// convert the Buffer to HTML
		const { allVerbUrls } = JSON.parse(Buffer.from(fileDataBuffer).toString())

		await scrapeVerbUrls(allVerbUrls)
	} catch (error) {
		console.log('An error has occurred in scrapeAllVerbPages', error)
	}
}

async function scrapeVerbUrls(urls: string[]) {
	console.time('queue')
	try {
		const browser = await playwright[browserType].launch(launchOptions)
		const context = await browser.newContext()
		const page = await context.newPage()

		// a Queue system so not ramming the website!

		for (const url of urls) {
			await queue.add(async () => await scrapePageForHTMLContent(url, page))
		}
		// const allUrls = urls.map(async (url: string) => {
		// 	await queue.add(async () => await scrapePageForHTMLContent(url, page))
		// 	return
		// })

		// await Promise.all([...allUrls])

		await browser.close()
	} catch (error) {
		console.error('error in scrapeVerbUrls', error)
	} finally {
		console.timeEnd('queue')
	}
}
