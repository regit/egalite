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
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div class="panel">
                <div class="panel-heading"><h3 class="panel-title">Qu'est ce que l'IEHG ?</h3></div>
                <div class="panel-body">
                 <p class="text-justify">
                   L'Indice d'Égalité Hiérarchique par Genre (IEHG) est une mesure de l'égalité
                   des chances de promotion au sein d'une organisation. Il mesure l'écart entre
                   la répartition globale des sexes et la composition des instances dirigeantes (comité exécutif, secrétariat général).
                   Si l'IEHG vaut 100 alors les chances de promotions d'un homme ou d'une femme sont égales. Si il vaut 0 alors un genre
                   maintient l'autre sous une domination totale.
                </p>
               </div>
             </div>  
            </div>
            <div class="col-sm-4">
              <h2>Derniers Calculs</h2>
              <div className="organizations-list">
                {this.state.organizations.map(function(orga) {
                  return(
                   <Organization key={orga.pk} data={orga} />
                  )
                })}
              </div>
            </div>
            <div class="col-sm-4" className="organization-detail">
            </div>
          </div>
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
        <h5>{this.props.data.name}</h5>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style={{ width: orga_iegh + '%' }} aria-valuenow="{ orga_iegh}" aria-valuemin="0" aria-valuemax="100">{ orga_iegh }%</div>
        </div>
      </div>
    )
  }
}

export default App;
