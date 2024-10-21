import { expect, test } from 'vitest'

import { capitalizeFirstLetter } from './helpers'

test('capitalize first letter', () => {
	expect(capitalizeFirstLetter('andrew')).toBe('Andrew')

	expect(capitalizeFirstLetter('Andrew')).not.toBe('andrew')
	expect(capitalizeFirstLetter('andré')).toBe('André')
})
