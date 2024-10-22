import { getCollection } from 'astro:content'

export const getVerbs = async () => {
	
	const allVerbs = await getCollection('verbs')

    // console.log({allVerbs})

    // Just get the data 
    const allData = allVerbs.map((v: any) => v.data);

    // const sorted = allData.sort((a,b) => a.name.localeCompare(b.name));



    return allData.map((verb: any) => ({...verb, slug: getRidofAccentsInUrls(verb.name)}));
	// return sorted
}

export const getRidofAccentsInUrls = (url: string) => url.normalize("NFD").replace(/[\u0300-\u036f]/g, "")