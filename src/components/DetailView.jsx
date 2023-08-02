import React, {useEffect,useLayoutEffect, useRef} from 'react'
import { Box, Text, measureElement} from 'ink'
import {tokenize} from '@humanwhocodes/momoa'
import logStore from '../stores/LogStore.js'
import {inspect} from 'util'
import createLogger from '../logger.js'
const console = createLogger('DetailView')


const DetailView = ({width, height, ...props}) => {
  const [logState, setLogState] = React.useState(logStore.initialState)
  const [contentSize, setContentSize] = React.useState({width: 0, height: 0})
  
  const ast = logState.selected?.view?.data?.inspect
  
  
  useLayoutEffect(() => {
    logStore.subscribe(setLogState)
    logStore.init()
    setTimeout(() => {
      logStore.select(0)
    }, 500)
    
  }, [])
  
  return (
    <Box flexDirection="column" width={width} height={height}  {...props} >
      <Text>{ast}</Text>
      {/* <ASTDisplay ast={ast} path="$" width={width} height={height} /> */}
    </Box>
  )
}

export default DetailView