import React from 'react';
import {Box, Text} from 'ink';
import theme from '../stores/ThemeStore.js';
const AppContainer = ({children, width, height}) => (
	<Box flexDirection="column" alignItems="start" width={width} height={height}>
		{children}
	</Box>
);
export default AppContainer;
