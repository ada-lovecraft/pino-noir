import React, {useState, useLayoutEffect} from 'react';
import {useInput, Box, Text, Spacer} from 'ink';
import List from './List.js';
import theme from '../stores/ThemeStore.js';
import uiStore from '../stores/UIStore.js';
import createLogger from '../logger.js';

const console = createLogger('LogView');

const LogView = ({width, height, logs, active}) => {
	const [selectedLog, setSelectedLog] = useState(null);
	const listHeight = height * 0.5;

	useInput((input, key) => {
		if (!active) {
			return;
		}
		if (input === '/') {
			uiStore.setFocus('filter');
		}
	});

	return (
		<Box
			className="log-panel"
			flexDirection="column"
			borderStyle="single"
			height={height}
			width={width}
			borderColor={active ? theme.style('borderColor') : theme.style('dim')}
		>
			<Box height="100%" flexDirection="row">
				<Box flexDirection="column" padding={1} height={listHeight}>
					<List items={logs.models} height={height} onChange={setSelectedLog} />
				</Box>

				{/* <Box flexDirection="column" padding={1} height={listHeight}>
					{selectedLog && (
						<Box flexDirection="column">
							<Box>
								<Box marginRight={2}>
									<Text>{selectedLog.key}</Text>
								</Box>
								<Box marginRight={1}>
									<Text>{selectedLog.time.short}</Text>
								</Box>
								<Box marginRight={1}>
									<Text>[{selectedLog.level.name.toUpperCase()}]</Text>
								</Box>
								<Box marginRight={1}>
									<Text>{selectedLog.event}</Text>
								</Box>
							</Box>
							<Box>
								<Text>{JSON.stringify(selectedLog.data, null, 2)}</Text>
							</Box>
						</Box>
					)}
				</Box> */}

				{/* {displayItems.map((item, idx) => (
						<Box flexDirection="column">
							<Box>
								<Box marginRight={2}>
									<Text
										color={highlight(item)}
										underline={shouldHighlight(item)}
									>
										{item.key}
									</Text>
								</Box>
								<Box marginRight={1}>
									<Text
										color={theme.style('dim')}
										underline={shouldHighlight(item)}
									>
										{item.time.short}
									</Text>
								</Box>
								<Box marginRight={1}>
									<Text
										color={theme.style(item.level.style.color)}
										underline={shouldHighlight(item)}
									>
										[{item.level.name.toUpperCase()}]
									</Text>
								</Box>
								<Box marginRight={1}>
									<Text
										color={theme.style('text')}
										underline={shouldHighlight(item)}
									>
										{item.event}
									</Text>
								</Box>
							</Box>
						</Box>
					))} 
					</Box> */}
			</Box>
		</Box>
	);
};

export default LogView;
