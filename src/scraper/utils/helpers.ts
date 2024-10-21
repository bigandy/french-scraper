export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getVerbNamefromUrl = (url: string) =>
	url
		.replace('https://conjugator.reverso.net/conjugation-french-verb-', '')
		.replace('.html', '')
