import React from 'react'
import { Text } from 'react-native'

import Tips from './../index'

import renderer from 'react-test-renderer';


describe('<Tips />', () => {
  it('should render and not be visible', () => {
    const tree = renderer.create((
      <Tips>
        <Text>Highlighted text !</Text>
      </Tips>
    )).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should make tips visible', () => {
    const tree = renderer.create((
      <Tips
        visible
      >
        <Text>Highlighted text !</Text>
      </Tips>
    )).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
