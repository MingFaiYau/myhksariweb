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

export const convertDate = (value: string): string => {
	const date = moment(value, 'DD/MM/YYYY')
	return date.format('MM/DD')
}
