import React from 'react';
import Login from './components/Login'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IP: "http://127.0.0.1/a_routes/",
      currentScreen: "login",
    }
  }


  render() {
    switch (this.state.currentScreen) {
      case "login":
        return (
          <Login IP={this.state.IP}>

          </Login>
        );
        
      case "index":
        break
      default:
        break;
    }
  }
}

export default App;