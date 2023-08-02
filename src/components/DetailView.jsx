import React, {useEffect,useLayoutEffect, useRef} from 'react'
import theme from '../stores/ThemeStore.js'

import { Box, Text, useInput} from 'ink'
import figures from 'figures'
import logStore from '../stores/LogStore.js'


import createLogger from '../logger.js'
const console = createLogger('DetailView')

const padding = (width, str) => {
  const strLen = str.length
  const lpad = Math.floor((width - strLen) / 2)
  const rpad = width - strLen - lpad
  return [figures.square.repeat(lpad), figures.square.repeat(rpad)]
}

const Banner = ({title, level, width}) => {
  console.info({title, level, width}, 'banner-check')
  if(!title || !level || !width) return null
  const isTrace = level.name === 'TRACE'
  const textColor = isTrace ? 'foreground' : 'background'
  const backgroundColor = isTrace ? 'selection-background' : level.style.color
  const [lpad, rpad] = padding(width, title) 
  return(
    <Box flexDirection="row" width={width} height={1} flexShrink={2} >
      <Text wrap="wrap-truncate" color={theme.style(backgroundColor)}>{lpad}</Text>
      <Text wrap="wrap-truncate" color={theme.style(textColor)} backgroundColor={theme.style(backgroundColor)} >{title}</Text>
      <Text wrap="wrap-truncate" color={theme.style(backgroundColor)}>{rpad}</Text>
    </Box>
  )
}
const DetailView = ({width, height, active, onBlur, ...props}) => {
  
  const [logState, setLogState] = React.useState(logStore.initialState)
  const [contentSize, setContentSize] = React.useState({width: 0, height: 0})
  
  
  const {model, view} = logState.selected || {}
  const title = `${view?.data.level.name}: ${view?.data.msg}`
  console.info({title}, 'detail-title')
  
  useLayoutEffect(() => {
    logStore.subscribe(setLogState)
  }, [])
  useInput((input, key) => {
    if(!active) return
    console.log({input, key}, 'detail-input')
    if(key.escape) {
      onBlur()
    }
  })
  
  return (
    <Box flexDirection="column" width={width} height={height}  {...props} >
      <Banner level={view?.data.level} title={title} height={1} width={width}/>  
      <Box flexDirection="row" width={width} height={1} flexShrink={2} >
        
        <Text wrap="wrap-truncate">{view?.data.inspect}</Text>
      {/* <ASTDisplay ast={ast} path="$" width={width} height={height} /> */}
      </Box>
    </Box>
  )
}

export default DetailView