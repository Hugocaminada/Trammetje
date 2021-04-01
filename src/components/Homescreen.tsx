import React from 'react'
import {Button} from 'react-native'
import {connect} from 'react-redux'
import styled from 'styled-components/native'
import {incrementCount, decrementCount} from '../redux/actions/incrementer'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`

interface Props {
  counter: {counter: number}
  increment: (counter: number) => void
  decrement: (counter: number) => void
}

const App: React.FC<Props> = ({counter, increment, decrement}) => {
  // const isDarkMode = useColorScheme() === 'dark'
  return (
    <Container>
      <MainText>{counter.counter}</MainText>
      <Button title="increment" onPress={() => increment(counter.counter)} />
      <Button title="decrement" onPress={() => decrement(counter.counter)} />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: any) => ({
  increment: (counter: number) => {
    dispatch(incrementCount(counter))
  },

  decrement: (counter: number) => {
    dispatch(decrementCount(counter))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
