import React from 'react';
import {Box} from 'ink';
const Cell = ({children, textAlign, ...props}) => {
	const justified = {
		right: 'flex-end',
		left: 'flex-start',
		center: 'space-around',
	}[textAlign];
	return (
		<Box
			flexWrap="nowrap"
			overflow="hidden"
			justifyContent={justified}
			padding={0}
			margin={0}
			{...props}
		>
			{children}
		</Box>
	);
};

export default Cell;
