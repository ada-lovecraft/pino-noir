import {Box} from 'ink';

import React, {useMemo, useContext} from 'react';
import {useComponentTheme} from '@inkjs/ui';
import {LogListItem} from './log-list-item.js';
import {LogListContext} from './log-list-context.js';
import {LogListItemContext} from './log-list-item-context.js';
import {defaultMarker} from './constants.js';

export function LogList({children}) {
	const {depth} = useContext(LogListContext);
	const {styles, config} = useComponentTheme('LogList');

	const listContext = useMemo(
		() => ({
			depth: depth + 1,
		}),
		[depth],
	);

	const listItemContext = useMemo(() => {
		const {marker} = config();

		if (typeof marker === 'string') {
			return {marker};
		}

		if (Array.isArray(marker)) {
			return {
				marker: marker[depth] ?? marker[marker.length - 1] ?? defaultMarker,
			};
		}

		return {
			marker: defaultMarker,
		};
	}, [config, depth]);

	return (
		<LogListContext.Provider value={listContext}>
			<LogListItemContext.Provider value={listItemContext}>
				<Box {...styles.list()}>{children}</Box>
			</LogListItemContext.Provider>
		</LogListContext.Provider>
	);
}

LogList.Item = LogListItem;