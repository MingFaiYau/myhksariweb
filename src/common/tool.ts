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

export const csvToJson = (csv: string) => {
	let lines = csv.split('\n')
	let result = []
	let headers = lines[0].split(',')
	for (let i = 1; i < lines.length; i++) {
		let obj: any = {}
		let currentline = lines[i].split(',')

		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j]
		}

		result.push(obj)
	}

	return JSON.stringify(result)
}

export const tsvToJson = (tsv: string) => {
	let lines = tsv.split('\n')
	let result = []
	let headers = lines[0].split('\t')
	for (let i = 1; i < lines.length; i++) {
		let obj: any = {}
		let currentline = lines[i].split('\t')
		
		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j]
		}
		result.push(obj)
	}
	return result // JSON
}
