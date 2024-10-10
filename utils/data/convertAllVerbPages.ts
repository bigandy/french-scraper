import fs from 'fs-extra'

import {
	convertOneVerbPageHTMLToGetTheData,
	writeVerbDataToJSON,
} from './convertOneVerbPage'

import { getVerbNamefromUrl } from '../helpers'

import PQueue from 'p-queue'
const queue = new PQueue({
	concurrency: 1,
	// interval: 5000, // 5s
	intervalCap: 1,
})

// TODO

export const convertAllVerbPages = async () => {
	console.log('Running convertAllVerbPages script')

	try {
		const fileDataBuffer = await fs.readFileSync(
			'./data/urls/all-verb-urls.json',
		)

		// convert the Buffer to HTML
		const { allVerbUrls } = JSON.parse(Buffer.from(fileDataBuffer).toString())

		await convertVerbUrls(allVerbUrls)
	} catch (error) {
		console.log('An error has occurred in scrapeAllVerbPages', error)
	}
}

async function convertVerbUrls(urls: string[]) {
	console.time('queue')
	try {
		// a Queue system so not ramming the website!

		for (const url of urls) {
			console.log(url)

			const verb = getVerbNamefromUrl(url)

			const data = await queue.add(
				async () => await convertOneVerbPageHTMLToGetTheData(verb),
			)

			// const data = await convertOneVerbPageHTMLToGetTheData(verb);

			if (data) {
				await writeVerbDataToJSON(data, verb)
			}
		}
	} catch (error) {
		console.error('error in scrapeVerbUrls', error)
	} finally {
		console.timeEnd('queue')
	}
}
