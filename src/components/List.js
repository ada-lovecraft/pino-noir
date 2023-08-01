import React, {useEffect, useLayoutEffect} from 'react';
import {Text, Box, Newline, Spacer, useInput} from 'ink';
import Row from './Row.js';
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

const List = ({items, height, onChange = () => {}, onSubmit = () => {}}) => {
	console.log({items: items.length}, 'List');
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const lines = items.slice(0, 10);
	const updateSelectedIndex = nv => {
		const ov = selectedIndex;
		if (nv !== ov) {
			setSelectedIndex(nv);
			console.log('onChange');
			onChange(items[nv], items[ov]);
		}
	};

	useInput((input, key) => {
		if (key.upArrow) {
			updateSelectedIndex(Math.max(0, selectedIndex - 1));
		}
		if (key.downArrow) {
			updateSelectedIndex(Math.min(items.length - 1, selectedIndex + 1));
		}
		if (input === 'z') {
			updateSelectedIndex(items.length - 1);
		}
		if (input === 'a') {
			updateSelectedIndex(0);
		}
	});

	return (
		<Box flexDirection="column" padding={1}>
			{lines.map(({id, data}, idx) => (
				<Row key={id}>
					<Box marginRight={2}>
						<Text>{id}</Text>
					</Box>
				</Row>
			))}
		</Box>
	);
};
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
