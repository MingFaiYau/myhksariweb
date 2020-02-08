import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { MainPage } from './container'

const App: React.FC<{}> = () => {
	return (
		<div>
			<CssBaseline />
			<MainPage />
		</div>
	)
}

export default React.memo(App)
