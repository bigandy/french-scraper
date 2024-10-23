import fs from 'fs-extra'

import playwright, { type Page } from 'playwright'

import { browserType, launchOptions } from './config'

/**
 * Get All the URLs to verb pages from an array of index page urls
 */
export const getAllVerbUrlsFromIndexUrls = async () => {
	console.log('Running getAllVerbUrlsFromIndexUrls script')

	try {
		const fileDataBuffer = await fs.readFileSync('./data/urls/index-urls.json')

		// convert the Buffer to HTML
		const { indexLinks } = JSON.parse(Buffer.from(fileDataBuffer).toString())

		// TODO
		// 1. [x] Read a json file that contains an array of index page urls
		// 2. [x] For each of this list visit each of the pages with playwright
		// 3. [x] On each of the indexes get a list of the urls referenced from this page
		// 4. [x] Put all the urls into a new .json file for future use.

		const listOfUrls = await readFiles(indexLinks)

		// WRITE TO JSON
		try {
			fs.outputFile(
				'./data/urls/all-verb-urls.json',
				JSON.stringify({ allVerbUrls: listOfUrls.flat() }),
				{
					encoding: 'utf-8',
					flag: 'w',
				},
			)

			console.log('Data successfully saved to disk')
		} catch (error) {
			console.log('An error has occurred ', error)
		}
	} catch (error) {
		console.log('An error has occurred ', error)
	}
}

async function readFiles(files: string[]) {
	const result: [string[]] = [[]]

	const browser = await playwright[browserType].launch(launchOptions)
	const context = await browser.newContext()
	const page = await context.newPage()

	for (const file of files) {
		const item: string[] = await readFile(file, page)

		result.push(item)
	}

	await browser.close()
	return result
}

const readFile = async (url: string, page: Page) => {
	await page.goto(url)

	if (launchOptions.headless === false) {
		await page.waitForSelector('#didomi-popup')
		await page.click('#didomi-notice-agree-button')
	}

	const indexLinks = await page
		.locator('.index-content li a')
		.evaluateAll((els: HTMLAnchorElement[]) => els.map((el) => el.href))

	return indexLinks
}
