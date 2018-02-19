# react-native-tips
[![Build Status](https://travis-ci.org/frichti/react-native-tips.svg?branch=master)](https://travis-ci.org/frichti/react-native-tips)

This module is used to create tips on your app to help your new users to understand how is your app.

![alt text](https://github.com/myvertigo/react-native-tips/raw/master/doc/react-native-tips.gif "react-native-tips")


# How to install
 
Via NPM

```bash
# Install via npm
npm install react-native-tips --save

# Install via yarn
yarn add react-native-tips
```


# How to use it

To use it, simply import it into yours components

```js
import Tips from 'react-native-tips'
```

# Example

The most basic example of this module is to use it like this : 

```js
import React from 'react'
import { View, Button } from 'react-native'
import Tips from 'react-native-tips'


const MyButton = (props = {}) => (
  <View>
    <Tips
      visible
      text="This is a tips !"
    >
      <Button title="Hello world !">
    </Tips>
  </View>
)

export default MyButton
```


# Configuration

## Properties of Tips:

| Property | Type | Requirement | Description |
|----------------|---------------|-----------|--------------------------------------|
| children | node | Optional | The `children` of Tips are elements that will be highlighted when the tips will be visible |
| position | enum (`top`, `left`, `right`, `bottom` or `none`) | Default: `top` | Define the position of your tips related to the children. |
| visible | Boolean | Default: `false` | Set the visibility of your Tips |
| text | String | Optional | Text inside the Tips. |
| content | node | Optional | Use this property if you want to add more than a simple text inside your Tips. |
| onRequestClose | function | Optional | Triggered when the user tap on  the screen. |
| onRequestNext | function | Optional | Triggered when the user tap on the screen. (See #waterfall-tips for more.) |
| style | Object | Optional | Override the style of your tips |
| modalStyle | Object | Optional | Override the style of the Modal Component (react-native) |
| contentStyle | Object | Optional | Override the style of the content of the Modal (used for positionning the highlight elements and tips) |
| textStyle | Object | Optional | Override the style of the text inside the Tips |
| offsetLeft | Number | Optional | Add an offset of the Tips in x axis. |
| offsetTop | Number | Optional | Add an offset of the Tips in y axis. |



# Waterfall Tips

You sometimes need to show tips one after another. This module as an helper to execute this scheme. You can use
`new Tips.Waterfall()` to create a new helper that help to you to show/hide tips in waterfall.

```js
import React, { PureComponent } from 'react'
import { View, Button, Text } from 'react-native'
import Tips from 'react-native-tips'


export default class MyButton extends PureComponent {
  constructor(props) {
    super(props)

    // 1st step - Create your helper with keys that will represent your tips
    this.waterfallTips = new Tips.Waterfall([
      'myTips1', 'myTips2'
    ])

    this.state = {
      tipsVisible: null
    }

    // This method will trigger the changement of tips
    this.handleNextTips = this.handleNextTips.bind(this)
  }

  componentDidMount() {
    // the 'start' method will set the first Tips key into your state.
    this.setState({
      tipsVisible: this.waterfallTips.start()
    })
  }

  handleNextTips() {
    // the 'next' method will set the next tips key into your state until it has no more keys.
    this.setState({
      tipsVisible: this.waterfallTips.next()
    })
  }

  render() {
    const { tipsVisible } = this.state

    return (
      <View>
        <Tips
          visible={tipsVisible === 'myTips1'}
          onRequestNext={this.handleNextTips}
        >
          <Button text="My button">
        </Tips>

        <Tips
          visible={tipsVisible === 'myTips2'}
          onRequestNext={this.handleNextTips}
        >
          <Text>My text</Text>
        </Tips>
      </View>
    )
  }
}
```

## methods of Tips.Waterfall:

| Method | Description |
|----------------|--------------------------------------|
| new Tips.Waterfall(indexes: *Array< String >*): Tips.Waterfall | Instanciate a new waterfallTips helper. |
| start(): *String* | Start the waterfall and set the first index has the current index. |
| isVisible(index: *String*): *Boolean* | Check if the index passed in parameter is the current index. |
| createIndex(index: *String*): *String* | Create a new index key. |
| next(): *String* | Set the next index has the current index. If it was the last key, the value will be `null` |
| previous(): *String* | Set the previous index has the current index. If it was the first key, the value will be **the first key**. |

