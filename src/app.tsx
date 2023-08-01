// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import ReactCurse, { Separator, Text, useInput, useExit, List, Bar, Block, useSize } from 'react-curse'
// import figures from 'figures'
// import theme from './stores/ThemeStore'
// import logStore from './stores/LogStore'



// const Timestamp = ({ time, lineWidth, }) => {

//   return (
//     <Text width={13} color={theme.style('comments')}>
//       <Block align="left">{time.split('T')[1]}</Block>
//     </Text>
//   )
// }
// const LogLevel = ({ level, children }) => (
//   <Text width={1} color={level.style.color}>
//     <Block align="left">{level.name}</Block>
//   </Text>
// )

// const LogLevelTick = ({ level, children }) => (
//   <Text width={3} color={theme.style(level.style.color)}>
//     <Block x={1}>
//       {figures.squareSmallFilled}
//     </Block>
//   </Text>
// )

// const LogData = (data) => (
//   <>
//     <Text width={1}>{' '}</Text>
//     <Text color={theme.style('dim')}>
//       {JSON.stringify({ ...data })}
//     </Text>
//   </>
// )


// const LogLine = ({ item: { display }, selected, pass: { width, height } }) => (
//   <Block background={selected ? theme.style('line-highlighting') : ''}>
//     <Block align='left' width={5}>
//       <Text width={4}>{display.id.toString().padStart(4, '0')}</Text>
//     </Block>
//     <Timestamp time={display.time.iso} />
//     <LogLevelTick level={display.level} />
//     <Text color={theme.style('text')}>{display.event}</Text>
//     <LogData data={display.data} />
//   </Block>

// )
// let outputId = 0
// const App = () => {
//   const [logState, setLogState] = useState(logStore.initialState)
//   const { width, height } = useSize()
//   useInput(
//     input => {
//       if (input === 'q') useExit()
//     },
//     []
//   )
//   useLayoutEffect(() => {
//     logStore.subscribe(setLogState)
//     logStore.init()
//   }, [])

//   return (
//     <>
//       <Text width={width}>
//         <Block align="left" >
//           <List data={logState.lines} renderItem={LogLine} pass={{ width, height }} />
//         </Block>
//       </Text>

//     </>
//   )
// }

// ReactCurse.render(<App />)
