import React from 'react';
import figures from 'figures';
import {Box} from 'ink';
const selectedBorder = {
	topLeft: '',
	top: figures.line,
	topRight: '',
	left: '',
	bottomLeft: '',
	bottom: figures.line,
	bottomRight: '',
	right: '',
};
const Row = ({children, gap, selected, key, ...props}) => (
	<Box
		borderStyle={selected ? selectedBorder : null}
		flexDirection="row"
		overflow="hidden"
		padding={0}
		paddingLeft={selected ? 2 : 0}
		margin={0}
		columnGap={gap}
		{...props}
	>
		{children}
	</Box>
);

export default Row;
{
	/* <Box key={`log-${id}`} flexDirection="column"></Box> */
}
