import React from 'react';
import {IP} from "./GLOBALVAR";
import Login from './components/Login';
import Index from './components/Index';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IP: IP,
      currentScreen: "login",
    }
    this.setCurrentScreen = this.setCurrentScreen.bind(this);
  }

  setCurrentScreen(A){
    this.setState({currentScreen: A})
  }


  render() {
    switch (this.state.currentScreen) {
      case "login":
        return (
          <Login 
            IP={this.state.IP}
            setCurrentScreen={this.setCurrentScreen}>

          </Login>
        );
        
      case "index":
        return(
        <Index
          IP={this.state.IP}
          setCurrentScreen={this.setCurrentScreen}
        ></Index>
        );
      default:
        break;
    }
  }
}

export default App;