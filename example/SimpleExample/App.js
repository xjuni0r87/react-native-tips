/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tips from 'react-native-tips'

import StatusBar from './Components/StatusBar'
import Menu from './Components/Menu'
import { STATUSBAR_HEIGHT } from './constants'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const primaryColor = '#0091EA'

type Props = {};
export default class App extends Component<Props> {
  /* LIFECYCLE */

  /**
   * @constructor
   * @param {*} props - Properties of the pure component
   */
  constructor(props) {
    super(props)

    this.waterfallTips = new Tips.Waterfall([
      'username', 'buttonConnect', 'iconMenu',
      'menu', 'final'
    ])

    this.state = {
      username: '',
      password: '',
      menuVisible: false,
      tipsVisible: false
    }

    this.handleNextTips = this.handleNextTips.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.start = this.start.bind(this)
  }

  /**
   * @componentDidMount
   */
  componentDidMount() {
    this.start()
  }


  /* METHODS */

  /**
   * Show the next tips
   */
  handleNextTips() {
    const tipsVisible = this.waterfallTips.next()

    switch (tipsVisible) {
      case 'menu':
        this.setState({
          tipsVisible: false
        })

        setTimeout(() => this.setState({ menuVisible: true }), 500)
        setTimeout(() => this.setState({ tipsVisible }), 1500)
        break

      case null:
        this.setState({ tipsVisible })

        setTimeout(() => this.setState({ menuVisible: false }), 1000)
        break

      default: this.setState({ tipsVisible })
        break
    }
  }

  /**
   * Show the menu
   */
  showMenu() {
    this.setState({ menuVisible: true })
  }

  /**
   * Hide the menu
   */
  hideMenu() {
    this.setState({ menuVisible: false })
  }

  /**
   * Start the tips
   */
  start() {
    this.setState({
      tipsVisible: this.waterfallTips.start()
    })
  }


  /* RENDER */

  /**
   * @render
   * @returns {JSX}
   */
  render() {
    const { username, password, menuVisible, tipsVisible } = this.state

    return (
      <View style={styles.container}>
        <StatusBar />

        <View style={styles.header} ref={view => this.view = view}>
          <Tips
            visible={tipsVisible === 'iconMenu'}
            onRequestNext={this.handleNextTips}
            position="right"
            text="When you are logged, you can click here to acceed to the menu and edit your profile."
          >
            <TouchableOpacity
              onPress={this.showMenu}
            >
              <Icon
                style={styles.headerIcon}
                size={30}
                name={menuVisible ? 'clear' : 'menu'}
              />
            </TouchableOpacity>
          </Tips>

          <Text style={styles.headerText}>
            Simple example
          </Text>
        </View>

        <View style={styles.title}>
          <Icon name="person-outline" size={120} style={styles.titleIcon} />
          <Text style={styles.titleText}>
            User profile
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Tips
            visible={tipsVisible === 'username'}
            onRequestNext={this.handleNextTips}
            text="Enter your username and password here."
          >
            <View style={styles.form}>
              <Icon style={styles.formIcon} name="person" size={16} />
              <TextInput
                style={styles.formInput}
                placeholder="Username"
                value={username}
              />
            </View>
          </Tips>

          <View style={styles.form}>
            <Icon style={styles.formIcon} name="vpn-key" size={16} />
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              value={password}
            />
          </View>

        </View>

        <Tips
          visible={tipsVisible === 'buttonConnect'}
          onRequestNext={this.handleNextTips}
          enableChildrenInteraction
          position="bottom"
          text="When it's done, click here to connect to your user account. (clicking on the button won't close the Tips)"
        >
          <Button
            color={primaryColor}
            onPress={() => { Alert.alert('Click event', 'You have clicked on the button !') }}
            title="Connection"
          />
        </Tips>

        <Menu
          visible={menuVisible}
          tipsMenuVisible={tipsVisible === 'menu'}
          tipsFinalVisible={tipsVisible === 'final'}
          onRequestClose={this.hideMenu}
          onRequestNext={this.handleNextTips}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: '100%',
    backgroundColor: '#F5FCFF',
  },
  statusBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 30,
    backgroundColor: primaryColor
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    height: 40
  },
  headerIcon: {
    color: primaryColor
  },  
  headerText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleIcon: {
    color: primaryColor,
    marginBottom: 10
  },
  titleText: {
    fontWeight: 'bold',
    color: primaryColor
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30
  },

  form: {
    width: 300,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: primaryColor
      }
    })
  },
  formIcon: {
    color: primaryColor,
    marginRight: 10,
    alignSelf: 'center'
  },
  formInput: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
