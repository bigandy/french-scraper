import { setTimeout } from 'node:timers/promises'
import fs from 'fs-extra'
import type { Page } from 'playwright'

import playwright from 'playwright'

import { browserType, launchOptions } from './config'

import { getVerbNamefromUrl } from '../helpers'

const getPageContent = async (url: string, page: Page) => {
	await page.goto(url)

	if (launchOptions.headless === false) {
		await page.waitForSelector('#didomi-popup')
		await page.click('#didomi-notice-agree-button')
	}

	const content = await page.innerHTML('.content-conj')

	return content
}

const writeHTMLToFile = async (path: string, content: string) => {
	try {
		await fs.outputFile(path, content, {
			encoding: 'utf-8',
			flag: 'w',
		})
		console.log(`Data successfully saved to disk: ${path}`)
	} catch (error) {
		console.log('An error has occurred ', error)
	}
}

/**
 * Record if the scrape is successful or unsuccessful
 */
const writeToRecordFile = async (url: string, filePath: string) => {
	try {
		const fileDataBuffer = await fs.readFileSync(filePath)

		// convert the Buffer to HTML
		const fileData = Buffer.from(fileDataBuffer).toString()
		const { urls } = JSON.parse(fileData)

		if (!urls.includes(url)) {
			const content = [...urls, url]

			await fs.outputFile(filePath, JSON.stringify({ urls: content }), {
				encoding: 'utf-8',
				flag: 'w',
			})
		}

		console.log(`Data successfully saved to disk: ${url}`)
	} catch (error) {
		console.log('An error has occurred ', error)

		// @ts-expect-error
		if (error.errno === -2) {
			await fs.outputFile(filePath, JSON.stringify({ urls: [] }), {
				encoding: 'utf-8',
				flag: 'w',
			})

			writeToRecordFile(url, filePath)
		}
	}
}

/**
 * Get the HTML content from one verb page url.
 */
export const scrapePageForHTMLContent = async (url: string, page: Page) => {
	const verb = getVerbNamefromUrl(url)

	const path = `./data/verbs/${verb}/index.html`
	const successFilePath = './data/recording/success.json'
	const errorFilePath = './data/recording/error.json'

	try {
		console.log(`Running scrapeOneVerbPage script with verb ${verb}`)

		const content = await getPageContent(url, page)

		await writeHTMLToFile(path, content)

		await writeToRecordFile(url, successFilePath)
	} catch (error) {
		console.error('error in scrapePageForHTMLContent', error)

		await writeToRecordFile(url, errorFilePath)
	}

	// TODO:
	// For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
	// - Do this is a serial manner so that one page at a time so as to not strain the source website too much.
}

export const scrapeOneVerbPage = async () => {
	const verbPageUrl =
		'https://conjugator.reverso.net/conjugation-french-verb-fermer.html'

	const browser = await playwright[browserType].launch(launchOptions)
	const context = await browser.newContext()
	const page = await context.newPage()

	// First scrape
	await scrapePageForHTMLContent(verbPageUrl, page)

	console.time('waiting')

	// // 2s wait
	await setTimeout(2000)

	console.timeEnd('waiting')

	// // 2nd scrape
	await scrapePageForHTMLContent(
		'https://conjugator.reverso.net/conjugation-french-verb-faire.html',
		page,
	)

	// "https://conjugator.reverso.net/conjugation-french-verb-%C3%AAtre.html",
	//   "https://conjugator.reverso.net/conjugation-french-verb-faire.html",

	await browser.close()
}
