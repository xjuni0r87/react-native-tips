import React from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

import { PRIMARY_COLOR, STATUSBAR_HEIGHT } from './../constants'


const StatusBarStyled = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: ${STATUSBAR_HEIGHT}
  background-color: ${PRIMARY_COLOR}
`


const Statusbar = () => (
  <StatusBarStyled>
    <StatusBar barStyle="light-content" />
  </StatusBarStyled>
)


export default Statusbar
