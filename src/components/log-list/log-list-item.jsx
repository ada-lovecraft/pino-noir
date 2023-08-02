import {Box, Text} from 'ink';
import React, {useContext} from 'react';
import {useComponentTheme} from '@inkjs/ui';
import {LogListItemContext} from './log-list-item-context.js';


export function LogListItem({children}) {
	const {marker} = useContext(LogListItemContext);
	const {styles} = useComponentTheme('UnorderedList');

	return (
		<Box {...styles.listItem()}>
			<Box {...styles.content()}>{children}</Box>
		</Box>
	);
}