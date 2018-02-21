import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tips from 'react-native-tips'

import { PANEL_WIDTH, PRIMARY_COLOR, STATUSBAR_HEIGHT } from './../constants'
import StatusBar from './StatusBar'


const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    padding: 10,
    paddingTop: 30,
    width: PANEL_WIDTH,
    backgroundColor: PRIMARY_COLOR
  },

  closeIcon: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT + 5,
    left: 15,
    color: PRIMARY_COLOR
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },

  menuItem: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuItemText: {
    flex: 1,
    textAlign: 'center',
    color: 'white'
  },

  tipsFinal: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 142, 60, 0.7)'
  },

  tipsFinalContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: '40%'
  },

  mood: {
    color: 'white',
    marginBottom: 10
  }
})


const MenuItem = ({ text = '', icon } = {}) => (
  <TouchableOpacity>
    <View style={styles.menuItem}>
      <Icon style={{ color: 'white' }} size={25} name={icon} />
      <Text style={styles.menuItemText}>{text.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
)


export default class Menu extends PureComponent {
  /* LIFECYCLE */

  /**
   * @constructor
   * @param {*} props - Properties of the PureComponent
   */
  constructor(props) {
    super(props)

    this.state = {
      slideAnim: new Animated.Value(-PANEL_WIDTH)
    }
  }

  /**
   * @componentDidMount
   */
  componentDidMount() {
    if (this.props.visible) {
      this.slideAnimation()
    }
  }

  /**
   * @componentWillReceiveProps
   * @param {*} nextProps - Next properties of the PureComponent
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.slideAnimation(!nextProps.visible)
    }
  }


  /* METHODS */

  /**
   * Start the slide animation
   * @param {Boolean} closeAnimation - If true, the animation will be reversed
   */
  slideAnimation(reversed = false) {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: reversed ? -PANEL_WIDTH : 0,
        duration: 250
      }
    ).start()
  }


  /* RENDER */

  /**
   * @render
   * @returns {JSX}
   */
  render() {
    const {
      visible, tipsMenuVisible, tipsFinalVisible, onRequestNext,
      onRequestClose
    } = this.props

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <StatusBar />

          <TouchableOpacity
            onPress={onRequestClose}
          >
            <Icon
              style={styles.closeIcon}
              size={30}
              name="clear"
            />
          </TouchableOpacity>

          <Animated.View
            style={[styles.panel, {
              right: this.state.slideAnim
            }]}
          >
            <MenuItem icon="home" text="home" />

            <Tips
              visible={tipsMenuVisible}
              contentStyle={{ width: '90%' }}
              position="left"
              text="In this menu, just click to the desired functionality."
              onRequestNext={onRequestNext}
            >
              <MenuItem icon="search" text="search" />
            </Tips>

            <MenuItem icon="account-balance" text="balance" />
            <MenuItem icon="highlight-off" text="Quit" />
          </Animated.View>

          <Tips
            visible={tipsFinalVisible}
            onRequestNext={onRequestNext}
            style={styles.tipsFinal}
            contentStyle={styles.tipsFinalContent}
            content={<Icon name="mood" style={styles.mood} size={50} />}
            position="none"
            text="You're now ready to rumble !!"
          />
        </View>
      </Modal>
    )
  }
}


Menu.defaultProps = {
  visible: false,
  tipsMenuVisible: false,
  tipsFinalVisible: false,
  onRequestClose: () => {},
  onRequestNext: () => {}
}


Menu.propTypes = {
  visible: PropTypes.bool,
  tipsMenuVisible: PropTypes.bool,
  tipsFinalVisible: PropTypes.bool,
  onRequestNext: PropTypes.func,
  onRequestClose: PropTypes.func
}
