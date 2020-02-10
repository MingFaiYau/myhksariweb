import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import * as serviceWorker from './serviceWorker'
import { IntlProvider } from 'react-intl'
import en from './i18n/en'
import zh from './i18n/zh'

const getLanguage = (): string => {
	const currentLanguage = localStorage.getItem('language')
	if (!currentLanguage) {
		localStorage.setItem('language', 'zh')
		return 'zh'
	} else return currentLanguage
}

const Root: React.FC<{}> = () => {
	const [locale, setLocale] = React.useState<string>(getLanguage())
	const string = locale.includes('zh') ? zh : en
	return (
		<IntlProvider locale={locale} key={locale} defaultLocale='zh' messages={string}>
			<App locale={locale} setLocale={setLocale} />
		</IntlProvider>
	)
}
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
