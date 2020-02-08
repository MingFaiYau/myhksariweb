export const valueTo3Dig = (value: number): string => {
	if (value > 99) {
		return value.toString()
	} else if (value > 10) {
		return `0` + value.toString()
	} else {
		return `00` + value.toString()
	}
}
