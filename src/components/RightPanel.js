import uiStore from '../stores/UIStore.js';
import React, {useState, useLayoutEffect} from 'react';
import {Box} from 'ink';
const RightPanel = ({children, width, height}) => {
	const [uiState, setUiState] = useState(uiStore.state);
	useLayoutEffect(() => {
		uiStore.subscribe(setUiState);
	}, []);
	console.log({uiState});
	return (
		<Box className="right-panel" height="100%" flexDirection="column">
			{children}
		</Box>
	);
};
export default RightPanel;
