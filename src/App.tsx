import React from 'react'
import { MainPage } from './container'
import { CssBaseline } from '@material-ui/core'

interface IAppProps {
	setLocale: (locale: string) => void
}

const App: React.FC<IAppProps> = (props) => {
	const { setLocale } = props

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
			<MainPage onChangeLanguage={onChangeLanguage} />
		</div>
	)
}

export default React.memo(App)
