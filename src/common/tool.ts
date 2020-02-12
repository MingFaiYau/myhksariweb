import moment from 'moment'

export const valueTo3Dig = (value: number): string => {
	if (value > 99) {
		return value.toString()
	} else if (value > 9) {
		return `0` + value.toString()
	} else if (value > 0) {
		return `00` + value.toString()
	} else return '0'
}

export const convertToDate = (value: string, input = 'DD/MM/YYYY', output = 'MM/DD'): string => {
	const date = moment(value, input)
	return date.format(output)
}

export const onScrollToTablePress = (elementId: TElementId) => {
	const element = window.document.getElementById(elementId)
	element && window.scrollTo(0, element.offsetTop)
}
