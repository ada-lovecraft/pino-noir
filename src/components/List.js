import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, Box, Newline, Spacer, Static, useInput} from 'ink';
import {LogList} from './log-list/log-list.js';
import figures from 'figures';
import Row from './Row.js';
import Cell from './Cell.js';
import logStore from '../stores/LogStore.js';
import theme from '../stores/ThemeStore.js';
import createLogger from '../logger.js';

const console = createLogger('List');

const lineRange = (index, collectionLength, maxLines) => {
	const mid = Math.ceil(maxLines / 2);
	if (index < mid) {
		return [0, maxLines];
	}
	if (index > collectionLength - mid) {
		return [collectionLength - maxLines, collectionLength];
	}
	return [index - mid, index + mid];
};

const List = ({height, width, onChange = () => {}, onSubmit = () => {}}) => {
	const [logState, setLogState] = useState(logStore.initialState);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const logs = logState.views;
	const pageSize = height - 2;
	const viewFrame = lineRange(selectedIndex, logs.length, height - 2);
	const lines = logs.slice(...viewFrame);
	// console.log({viewFrame, selectedIndex, lines: lines.length}, 'list-render');

	const updateSelectedIndex = index => {
		setSelectedIndex(index);
		const log = logs[index];
		onChange({id: log.id, view: logs[index], model: logState.models[index]});
	};
	useInput((input, key) => {
		if (input === 'k') {
			updateSelectedIndex(Math.max(0, selectedIndex - 1));
		}

		if (input === 'j') {
			updateSelectedIndex(Math.min(logs.length - 1, selectedIndex + 1));
		}
		if (input === 'g') {
			updateSelectedIndex(0);
		}
		if (input === 'G') {
			updateSelectedIndex(logs.length - 1);
		}
		if (input === 'w') {
			updateSelectedIndex(Math.max(0, selectedIndex - pageSize));
		}
		if (input === 's') {
			updateSelectedIndex(Math.min(logs.length - 1, selectedIndex + pageSize));
		}
		if (input === 'q') {
			process.exit(0);
		}
	});
	useLayoutEffect(() => {
		logStore.subscribe(setLogState);
		logStore.init();
	}, []);

	return (
		<LogList width={width}>
			{lines.map(({id, data}, idx) => {
				const index = viewFrame[0] + idx;
				const selected = index === selectedIndex;
				return (
					<LogList.Item
						key={id}
						width={width}
						{...{model: logState.models[index]}}
					>
						<Row gap={1} width={width} selected={selected}>
							<Cell width={4} textAlign="right">
								<Text
									color={
										selected
											? theme.style('text')
											: theme.style('selection-background')
									}
								>
									{id}
								</Text>
							</Cell>
							<Cell>
								<Text color={theme.style('comments')}>{data.time.short}</Text>
							</Cell>
							<Cell width={7} textAlign="right">
								<Text
									color={theme.style(data.level.style.color)}
									inverse={data.level.name === 'FATAL'}
								>
									[{data.level.name}]
								</Text>
							</Cell>
							<Cell width={30} alignText="right">
								<Text color={theme.style('text')} wrap="truncate-middle">
									{data.event}
								</Text>
							</Cell>
							<Cell width={80}>
								<Text color={theme.style('dim')} wrap="truncate-middle">
									{JSON.stringify(logState.models[idx + viewFrame[0]].data)}
								</Text>
							</Cell>
						</Row>
					</LogList.Item>
				);
			})}
		</LogList>
	);
};
/*
return (
		<Box flexDirection="column" padding={1} height={height}>
			<Text color={theme.style('dim')}>Selected: {selectedIndex}</Text>

			{lines.map(({id, data}, idx) => (
				<Row key={id} gap={1}>
					<Cell width={4} textAlign="right">
						<Text inverse={viewFrame[0] + idx === selectedIndex}>{id}</Text>
					</Cell>
					<Cell>
						<Text color={theme.style('comments')}>{data.time.short}</Text>
					</Cell>
					<Cell width={7} textAlign="right">
						<Text
							color={theme.style(data.level.style.color)}
							inverse={data.level.name === 'FATAL'}
						>
							[{data.level.name}]
						</Text>
					</Cell>
					<Cell>
						<Text color={theme.style('text')}>{data.event}</Text>
					</Cell>
				</Row>
			))}
			<Spacer />
		</Box>
	);*/
/* <Box marginRight={1}>
							<Text color={theme.style('dim')} underline={shouldHighlight(id)}>
								{data.time.short}
							</Text>
						</Box>
						<Box marginRight={1}>
							<Text
								color={theme.style(data.level.style.color)}
								underline={shouldHighlight(id)}
							>
								[{data.level.name.toUpperCase()}]
							</Text>
						</Box>
						<Box marginRight={1}>
							<Text color={theme.style('text')} underline={shouldHighlight(id)}>
								{data.event}
							</Text>
						</Box> *
				</Box>
			))}
		</Box>
	);
};*/
export default List;
