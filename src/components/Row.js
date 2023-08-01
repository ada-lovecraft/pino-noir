import React from 'react';
import {Box} from 'ink';
const Row = ({children, ...props}) => (
	<Box flexDirection="row" {...props}>
		{children}
	</Box>
);

export default Row;
{
	/* <Box key={`log-${id}`} flexDirection="column"></Box> */
}
