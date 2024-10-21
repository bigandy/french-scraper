import { type CheerioAPI, load } from 'cheerio'

import type { Model, Verb, Verbs } from '../../types/verb'

import { capitalizeFirstLetter } from '../helpers'
import {
	extractFileDataFromHtmlFile,
	getPath,
	writeDataToJSON,
} from './helpers'

const getIndicative = ($: CheerioAPI) => {
	const indicativeChildren = [
		'présent',
		'imparfait',
		'futur',
		'passé simple',
		'passé composé',
		'plus-que-parfait',
		'passé antérieur',
		'futur antérieur',
	] as const

	type IndicativeChildren = (typeof indicativeChildren)[number]

	const indicatif: {
		[key in IndicativeChildren]?: Verb
	} = {}

	for (const selector of indicativeChildren) {
		const combinedSelector = `[mobile-title="Indicatif ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		indicatif[selector] = texts
	}

	return indicatif
}

const getSubjonctive = ($: CheerioAPI) => {
	const subjonctif: any = {}
	const subjonctifChildren = [
		'présent',
		'imparfait',
		'plus-que-parfait',
		'passé',
	]

	for (const selector of subjonctifChildren) {
		const combinedSelector = `[mobile-title="Subjonctif ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		subjonctif[selector] = texts
	}

	return subjonctif
}

/**
 * Get the conditionnel from the html provided.
 * @param $ CheerioAPI
 * @returns data object
 */
const getConditionnel = ($: CheerioAPI) => {
	const conditionnel: any = {}
	const conditionnelChildren = [
		'présent',
		'passé première forme',
		'passé deuxième forme',
	]

	for (const selector of conditionnelChildren) {
		const combinedSelector = `[mobile-title="Conditionnel ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		conditionnel[selector] = texts
	}

	return conditionnel
}

const getParticipe = ($: CheerioAPI) => {
	const participe: any = {}
	const participeChildren = ['présent', 'passé composé', 'passé']

	for (const selector of participeChildren) {
		const combinedSelector = `[mobile-title="Participe ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		participe[selector] = texts
	}

	return participe
}

const getImperatif = ($: CheerioAPI) => {
	const imperatif: any = {}
	const imperatifChildren = ['présent', 'passé']

	for (const selector of imperatifChildren) {
		const combinedSelector = `[mobile-title="Impératif ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		imperatif[selector] = texts
	}

	return imperatif
}

const getInfinitif = ($: CheerioAPI) => {
	const infinitif: any = {}
	const infinitifChildren = ['présent', 'passé']

	for (const selector of infinitifChildren) {
		const combinedSelector = `[mobile-title="Infinitif ${capitalizeFirstLetter(
			selector,
		)}"] ul`

		const items = $(combinedSelector).find('li')

		const texts: any = {}
		items.each((_, item) => {
			const text = $(item).text().replaceAll('\n', '').trim()
			let split = []
			if (text.includes("j'")) {
				split = text.split("j'")
				// add j' to beginning of array
				split[0] = "j'"
			} else {
				split = text.split(' ')
			}
			const [first, ...rest] = split
			texts[first] = rest.join(' ')
		})
		infinitif[selector] = texts
	}

	return infinitif
}

const getName = ($: CheerioAPI) => {
	return $('#ch_lblVerb').text()
}

const getDefinition = ($: CheerioAPI) => {
	return $('#list-translations p').text()
}

const getModel = ($: CheerioAPI) => {
	return $('#ch_lblModel').text() as Model
}

const getAuxillery = ($: CheerioAPI) => {
	return $('#ch_lblAuxiliary').text() as Model
}

const getOtherForms = ($: CheerioAPI) => {
	return $('#ch_lblAutreForm').text()
}

/**
 * Turn the HTML of one verb page collected
 * and extract the data from it using cheerio.
 */
export const getDataFromHtml = async (html: string) => {
	try {
		// Read the HTML with cheerio
		const $ = load(html)

		const name = getName($)
		const definition = getDefinition($)
		const model = getModel($)
		const auxiliary = getAuxillery($)
		const otherForms = getOtherForms($)

		// console.log("Data read from file", name);

		const indicatif = getIndicative($)
		const subjonctif = getSubjonctive($)
		const conditionnel = getConditionnel($)

		const participe = getParticipe($)
		const imperatif = getImperatif($)
		const infinitif = getInfinitif($)

		const result: Verbs = {
			name,
			definition,
			model,
			auxiliary,
			otherForms,

			// @ts-expect-error
			indicatif,
			subjonctif,
			conditionnel,

			participe,
			imperatif,
			infinitif,
		}

		return result
	} catch (error) {
		console.log('An error has occurred ', error)
	}
}

export const convertOneVerbPageHTMLToGetTheData = async (
	verb = '%C3%AAtre',
) => {
	const html = await extractFileDataFromHtmlFile(verb)
	const formattedData = await getDataFromHtml(html)

	return formattedData
}

export const writeVerbDataToJSON = async (data: Verbs, verb = '%C3%AAtre') => {
	await writeDataToJSON(getPath(verb, 'index.json'), data)
}
