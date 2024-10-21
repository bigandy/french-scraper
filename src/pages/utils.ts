import { getCollection } from 'astro:content'

export const getVerbs = async () => {
	
	const allVerbs = await getCollection('verbs')

    // Just get the data 
    const allData = allVerbs.map((v: any) => v.data);

    let sorted = allData.sort((a,b) => a.name.localeCompare(b.name));

    // sorted = sorted.slice(0, 10);

	
    console.log({sorted})

	return sorted
}
