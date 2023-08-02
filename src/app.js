import React from 'react';
import {Text, Box, useInput} from 'ink';
import {ThemeProvider, defaultTheme, extendTheme} from '@inkjs/ui';
import figures from 'figures';
import DetailView from './components/DetailView.js';
import useStdoutDimensions from './hooks/use-stdout-dimensions.js';
import createLogger from './logger.js';

const console = createLogger('app');
const customTheme = extendTheme(defaultTheme, {
	components: {
		LogList: {
			styles: {
				list: () => ({
					flexDirection: 'column',
				}),
				listItem: () => ({
					gap: 1,
				}),
				marker: () => ({
					dimColor: true,
				}),
				content: () => ({
					flexDirection: 'column',
				}),
			},
			config: () => ({
				marker: figures.line,
			}),
		},
	},
});

export default function App() {
	const [columns, rows] = useStdoutDimensions();
	const [shouldExit, setShouldExit] = React.useState(false);
	const dimensions = {width: columns, height: rows};
	useInput((input, key) => {
		if (key.escape) {
			if (shouldExit) {
				console.log('exiting');
				process.exit(0);
			} else {
				console.log('press escape again to exit');
				setShouldExit(true);
				setTimeout(() => {
					setShouldExit(false);
				}, 500);
			}
		}
	});

	return (
		<ThemeProvider theme={customTheme}>
			<DetailView height={7} width={dimensions.width} />
		</ThemeProvider>
	);
}
