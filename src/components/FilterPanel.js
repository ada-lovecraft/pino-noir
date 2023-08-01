import React, {useState, useLayoutEffect} from 'react';
import {useInput, Box, Text} from 'ink';
import theme from '../stores/ThemeStore.js';
import uiStore from '../stores/UIStore.js';

const FilterPanel = ({width, height, active}) => {
	const [uiState, setUiState] = useState(uiStore.state);

	useInput((input, key) => {
		if (!active) {
			return;
		}
		if (key.escape) {
			uiStore.setFocus('logs');
		}
	});
	useLayoutEffect(() => {
		uiStore.subscribe(setUiState);
	}, []);

	return (
		<Box
			className="filter-panel"
			width={width}
			height={height}
			borderStyle="single"
			padding={1}
			borderColor={active ? theme.style('borderColor') : theme.style('dim')}
		>
			<Text>Filter Panel</Text>
		</Box>
	);
};

export default FilterPanel;
