import { persistentAtom } from '@nanostores/persistent'

export const isDarkBackground = persistentAtom('background', false, {
	encode: JSON.stringify,
	decode: JSON.parse,
})
