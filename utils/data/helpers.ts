import fs from 'fs-extra'

export const writeDataToJSON = (filePath: string, result: any) => {
	try {
		fs.outputFile(filePath, JSON.stringify(result), {
			encoding: 'utf-8',
			flag: 'w',
		})
		// console.log('Data successfully saved to disk')
	} catch (error) {
		console.log('An error has occurred ', error)
		throw new Error('An error has occurred in writeDataToJSON')
	}
}

export const getPath = (
	verb: string,
	filename: 'index.html' | 'index.json' = 'index.json',
) => {
	const path = `./data/verbs/${verb}/${filename}`
	return path
}

export const extractFileDataFromHtmlFile = async (verb: string) => {
	try {
		const fileDataBuffer = await fs.readFileSync(getPath(verb, 'index.html'))

		// convert the Buffer to HTML
		const fileData = Buffer.from(fileDataBuffer).toString()

		return fileData
	} catch (error: any) {
		console.error({ error })
		// throw new Error('Error in extractFileDataFromHtmlFile', error.toString())
	}
}
