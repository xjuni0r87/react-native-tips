import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import styled from 'styled-components/native'
import {
  Text, View, Modal, StyleSheet,
  TouchableOpacity, ViewPropTypes
} from 'react-native'


const getArrowStyleByPosition = (position = 'top') => {
  switch (position) {
    case 'right': return `
      left: -5px;
      top: 50%;
      margin-top: 5px;
      border-top-width: 5px;
      border-top-color: transparent;
      border-bottom-width: 5px;
      border-bottom-color: transparent;
      border-right-width: 5px;
      border-right-color: rgba(0, 0, 0, 0.5);
    `

    case 'left': return `
      right: -5px;
      top: 50%;
      margin-top: 5px;
      border-top-width: 5px;
      border-top-color: transparent;
      border-bottom-width: 5px;
      border-bottom-color: transparent;
      border-left-width: 5px;
      border-left-color: rgba(0, 0, 0, 0.5);
    `

    case 'bottom': return `
      top: -5px;
      left: 50%;
      margin-left: 2.5px;
      border-bottom-width: 5px;
      border-bottom-color: rgba(0, 0, 0, 0.5);
      border-right-width: 5px;
      border-right-color: transparent;
      border-left-width: 5px;
      border-left-color: transparent;
    `

    default: return `
      bottom: -5px;
      left: 50%;
      margin-left: 2.5px;
      border-top-width: 5px;
      border-top-color: rgba(0, 0, 0, 0.5);
      border-right-width: 5px;
      border-right-color: transparent;
      border-left-width: 5px;
      border-left-color: transparent;
    `
  }
}

const TooltipArrow = styled.View`
  position: absolute;
  shadow-offset: { width: 0, height: 0 };
  shadow-radius: 1px;
  shadow-color: black;
  shadow-opacity: 0.5;
  ${props => getArrowStyleByPosition(props.position)}
`

const Tooltip = styled.View`
  background: rgba(0, 0, 0, 0.5);
  flex: -1;
  padding: 10px;
  border-radius: 4px;
  shadow-offset: { width: 0, height: 0 };
  shadow-radius: 1px;
  shadow-color: black;
  shadow-opacity: 0.5;
`

const ModalContent = styled.View`
  width: 80%;
  display: flex;
  align-self: center;
  position: absolute;
  flex-wrap: nowrap;
`

const ChildrenOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`


const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'relative',
    flex: 1
  },

  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    flex: 1
  },

  text: {
    color: 'white',
    textAlign: 'center'
  }
})


export default class Tips extends PureComponent {
  /* LIFECYCLE */

  /**
   * @constructor
   * @param {*} props - Properties of the PureComponent
   */
  constructor(props) {
    super(props)

    this.state = {

      /**
       * The position of the children in x axis
       * @type {Number}
       */
      componentLeft: 0,

      /**
       * The position of the children in y axis
       * @type {Number}
       */
      componentTop: 0,

      /**
       * The width of the children
       * @type {Number}
       */
      componentWidth: 0,

      /**
       * The height of the children
       * @type {Number}
       */
      componentHeight: 0,

      /**
       * The position of the tooltip in x axis
       * @type {Number}
       */
      tooltipLeft: 0,

      /**
       * The position of the tooltip in y axis
       * @type {Number}
       */
      tooltipTop: 0,

      /**
       * Check if the component is ready
       * @type {Boolean}
       */
      ready: false
    }

    this.view = null

    this.handleLayout = this.handleLayout.bind(this)
    this.handleTooltipLayout = this.handleTooltipLayout.bind(this)
    this.handleRequestNext = this.handleRequestNext.bind(this)
  }

  /**
   * @componentWillReceiveProps
   * @param {*} nextProps - Next properties of the PureComponent
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.visible && !this.props.visible && !nextState.ready) {
      this.updateComponentPosition(true)
    } else if (!nextProps.visible && this.props.visible && nextState.ready) {
      this.setState({
        ready: false
      })
    }
  }


  /* METHODS */

  /**
   * Extends the stylesheet of the tooltip container to be relative to the
   * position passed in parameters
   * @param {String} position - The position
   * @returns {Object} Stylesheet properties
   */
  getModalContentStyleByPosition(position) {
    switch (position) {
      case 'right':
      case 'left': return {
        flexDirection: 'row'
      }

      case 'top':
      case 'bottom': return {
        flexDirection: 'column'
      }

      default: return {}
    }
  }

  /**
   * Call the measure to ensure positionning
   * @param {Boolean=} willBeReady - If true, the component state will be ready to be visible
   */
  updateComponentPosition(willBeReady = false) {
    this.requestAnimationFrame(() => {
      this.view.measure((x, y, width, height, pageX, pageY) => {
        this.setState(state => ({
          ready: willBeReady || state.ready,
          componentLeft: pageX,
          componentTop: pageY,
          componentWidth: state.componentWidth || width,
          componentHeight: state.componentHeight || height
        }))
      })
    })
  }

  /**
   * Measure the size of the children
   * @param {*} event - The event object
   */
  handleLayout(event) {
    const { width, height } = event.nativeEvent.layout

    this.setState({
      componentWidth: width,
      componentHeight: height
    })

    this.updateComponentPosition()
  }

  /**
   * Measure the size of the tooltip layout
   * @param {*} event - The event object
   */
  handleTooltipLayout(event) {
    const { position } = this.props
    const { width, height } = event.nativeEvent.layout

    this.setState((state) => {
      const {
        componentLeft, componentTop, componentWidth, componentHeight
      } = state
      const nextState = {}

      switch (position) {
        case 'right':
          nextState.tooltipTop = Math.max(-componentTop, (componentHeight / 2) - (height / 2))
          nextState.tooltipLeft = 10
          break

        case 'left':
          nextState.tooltipTop = Math.max(-componentTop, (componentHeight / 2) - (height / 2))
          nextState.tooltipLeft = -componentLeft - width - 10
          break

        case 'bottom':
          nextState.tooltipLeft = Math.max(-componentLeft, (componentWidth / 2) - (width / 2))
          nextState.tooltipTop = 10
          break

        case 'top':
          nextState.tooltipTop = Math.max(-componentTop, -componentHeight - height - 10)
          nextState.tooltipLeft = Math.max(-componentLeft, (componentWidth / 2) - (width / 2))
          break

        default:
          nextState.tooltipTop = 0
          nextState.tooltipLeft = 0
          break
      }

      return nextState
    })
  }

  /**
   * Handle event to switch between 'onRequestNext' and 'onRequestClose'
   */
  handleRequestNext() {
    const { onRequestNext, onRequestClose } = this.props

    if (onRequestNext) {
      return onRequestNext()
    }

    return !!onRequestClose && onRequestClose()
  }


  /* RENDER */

  /**
   * @render
   * @returns {JSX}
   */
  render() {
    const {
      children, position, text,
      modalStyle, textStyle, style, contentStyle,
      content, offsetLeft, offsetTop
    } = this.props

    const {
      componentLeft, componentTop,
      componentWidth: width, componentHeight: height,
      tooltipLeft, tooltipTop, ready
    } = this.state

    const left = componentLeft + offsetLeft
    const top = componentTop + offsetTop
    const visible = this.props.visible && ready

    return (
      <View
        collapsable={false}
        renderToHardwareTextureAndroid
        ref={(view) => { this.view = view }}
      >
        <View onLayout={this.handleLayout}>{children}</View>

        <Modal
          animationType="fade"
          visible={visible}
          transparent
        >
          <TouchableOpacity
            activeOpacity={1}
            focusedOpacity={1}
            style={{ flex: 1 }}
            onPress={this.handleRequestNext}
          >
            <View style={[styles.modal, modalStyle]}>
              <ModalContent
                style={[
                  this.getModalContentStyleByPosition(position),
                  { left, top },
                  contentStyle
                ]}
              >
                <View style={{ width, height }}>
                  {children}
                </View>

                <View
                  onLayout={this.handleTooltipLayout}
                  style={[styles.tooltipContainer, {
                    top: tooltipTop,
                    left: tooltipLeft
                  }]}
                >
                  <Tooltip
                    style={style}
                  >
                    {content}
                    {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                    {position !== 'none' && <TooltipArrow position={position} />}
                  </Tooltip>
                </View>

                <ChildrenOverlay
                  onPress={this.handleRequestNext}
                  style={styles.childrenOverlay}
                />
              </ModalContent>

            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}


Tips.defaultProps = {
  visible: false,
  style: {},
  textStyle: {},
  modalStyle: {},
  contentStyle: {},
  children: [],
  content: [],
  offsetLeft: 0,
  offsetTop: 0,
  text: '',
  position: 'top',
  onRequestClose: () => {},
  onRequestNext: () => {}
}


Tips.propTypes = {
  position: PropTypes.oneOf(['left', 'top', 'bottom', 'right', 'none']),
  style: ViewPropTypes.style,
  modalStyle: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
  onRequestClose: PropTypes.func,
  onRequestNext: PropTypes.func,
  children: PropTypes.node,
  text: PropTypes.string,
  content: PropTypes.node,
  visible: PropTypes.bool
}


ReactMixin(Tips.prototype, TimerMixin)
