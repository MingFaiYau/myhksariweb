import React from 'react'
import { MainPage } from './container'
import { CssBaseline } from '@material-ui/core'

interface IAppProps {
	locale: string
	setLocale: (locale: string) => void
}

const App: React.FC<IAppProps> = (props) => {
	const { locale, setLocale } = props

	const onChangeLanguage = React.useCallback(
		(newLocale: string) => {
			setLocale(newLocale)
			localStorage.setItem('language', newLocale)
		},
		[setLocale],
	)

	return (
		<div>
			<CssBaseline />
			<MainPage locale={locale} onChangeLanguage={onChangeLanguage} />
		</div>
	)
}

export default React.memo(App)
