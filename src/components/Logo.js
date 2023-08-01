import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {Text, Box} from 'ink';

const Logo = () => (
	<Box justifyContent="center">
		<Gradient name="morning">
			<BigText text="Pino Noir" font="tiny" />
		</Gradient>
	</Box>
);
export default Logo;
