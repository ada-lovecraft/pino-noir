import React, {useEffect, useState} from 'react';
import {Box} from 'ink';
import List from './List.js';
import DetailView from './DetailView.js';
import logStore from '../stores/LogStore.js';
import theme from '../stores/ThemeStore.js';

import uiStore from '../stores/UIStore.js';
const LogView = ({width, height, ...props}) => {
	const [uiState, setUIState] = useState(uiStore.initialState);
	const activeHeight = ~~(height * 0.66);
	const inactiveHeight = ~~(height * 0.33) + 1;
	useEffect(() => {
		logStore.init();
		uiStore.init();
		uiStore.subscribe(setUIState);
	}, []);

	function handleSelect(id) {
		logStore.select(id);
	}
	function handleChange(id) {
		logStore.select(id);
	}
	function handleSubmit(id) {
		logStore.select(id);
		uiStore.focus('log-detail');
	}
	function handleDetailBlur() {
		uiStore.focus('log-list');
	}

	return (
		<Box flexDirection="column" width={width} height={height} {...props}>
			<List
				active={uiState.activeView === 'log-list'}
				height={
					uiState.activeView === 'log-list' ? activeHeight : inactiveHeight
				}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<DetailView
				active={uiState.activeView === 'log-detail'}
				onBlur={handleDetailBlur}
				height={
					uiState.activeView === 'log-detail' ? activeHeight : inactiveHeight
				}
				width={width}
			/>
		</Box>
	);
};
export default LogView;
