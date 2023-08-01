import React, {useLayoutEffect, useEffect, useState, useRef} from 'react';
import createLogger from '../logger.js';
import figures from 'figures';

import {
	Text,
	Box,
	Newline,
	Spacer,
	Static,
	measureElement,
	useInput,
} from 'ink';

import theme from '../stores/ThemeStore.js';
import ui from '../stores/UIStore.js';
import LogView from './LogView.js';
import FilterPanel from './FilterPanel.js';
import RightPanel from './RightPanel.js';
import logStore from '../stores/LogStore.js';

import AppContainer from './AppContainer.js';

const console = createLogger('Panels');

const Panels = ({width, height}) => {
	const [uiState, setUiState] = useState(ui.initialState);
	const [logs, setLogs] = useState(logStore.initialState);
	const mainHeight = height - 4;
	const mainWidth = width * 0.8;
	const inputHeight = 4;
	const rightPanelWidth = width - mainWidth;
	const rightPanelHeight = height;

	const setLogState = nv => {
		console.info('setLogState');
		setLogs(nv);
	};

	useInput((input, key) => {
		if (input === 'q') {
			process.exit(0);
		}
	});
	useLayoutEffect(() => {
		ui.subscribe(setUiState);
		ui.init();
		logStore.subscribe(setLogState);
		logStore.init();
	}, []);

	return (
		<AppContainer width={width} height={height}>
			<Box className="panel-container" height={mainHeight} flexGrow={1}>
				<Box
					className="left-panel"
					width={mainWidth}
					height={mainHeight}
					flexDirection="column"
					flexGrow={1}
				>
					<LogView
						height={mainHeight}
						width={mainWidth}
						active={uiState.activeView === 'logs'}
						lines={logs}
					/>

					<Box className="input-panel" padding={1} height={inputHeight} />
				</Box>
				<RightPanel>
					<FilterPanel
						width={rightPanelWidth}
						height={rightPanelHeight}
						active={uiState.activeView === 'filter'}
					/>
				</RightPanel>
			</Box>
			<Box>
				<Text color={theme.style('text')} inverse>
					Lines: {logs.models.length}
				</Text>
			</Box>
		</AppContainer>
	);
};
export default Panels;
