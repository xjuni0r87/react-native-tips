import React from 'react'

import { storiesOf } from '@storybook/react-native'

import Tips from 'react-native-tips'


storiesOf('Tips', module)
  .add('default', () => (
    <Tips
      visible
      text="This is the most basic usage of Tips"
    />))
