import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organizations: []
    };
  }

  componentDidMount() {
        axios.get('http://localhost:8080/' + 'api/organization/')
      .then(res => {
        this.setState({ organizations: res.data });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">L'égalité c'est maintenant</h1>
        </header>
        <div className="organizations-list">
          <ul>
          {this.state.organizations.map(function(orga) {
            return(
            <Organization key={orga.pk} data={orga} />
            )
          })}
          </ul>
        </div>
      </div>
    );
  }
}

class Organization extends Component {
  render() {
    var orga_iegh = Number(this.props.data.iegh).toFixed(1);
    return (
      <div className="organization">
        <h2>{this.props.data.name}</h2>
        <ul>
          <li>IEGH: { orga_iegh } </li>
        </ul>
      </div>
    )
  }
}

export default App;
