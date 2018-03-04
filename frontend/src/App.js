import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="panel">
                <div className="panel-heading"><h3 className="panel-title">Qu'est ce que l'IEHG ?</h3></div>
                <div className="panel-body">
                 <p className="text-justify">
                   L'Indice d'Égalité Hiérarchique par Genre (IEHG) est une mesure de l'égalité
                   des chances de promotion au sein d'une organisation. Il mesure l'écart entre
                   la répartition globale des sexes et la composition des instances dirigeantes (comité exécutif, secrétariat général).
                   Si l'IEHG vaut 100 alors les chances de promotions d'un homme ou d'une femme sont égales. Si il vaut 0 alors un genre
                   maintient l'autre sous une domination totale.
                </p>
               </div>
             </div>  
            </div>
            <div className="col-sm-4">
              <h2>Dernières Entrées</h2>
              <div className="organizations-list">
                {this.state.organizations.map(function(orga) {
                  return(
                   <Organization key={orga.pk} data={orga} />
                  )
                })}
              </div>
            </div>
            <div className="col-sm-4 organization-detail" id="orga-detail">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Organization extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      axios.get('http://localhost:8080/' + 'api/orgdata/' + this.props.data.latest_data_id)
      .then(res => {
        const orgdata = <OrganizationData data={res.data} orga={this.props.data} />;
        ReactDOM.render(orgdata, document.getElementById('orga-detail'));
      });
  }

  render() {
    var orga_iegh = Number(this.props.data.iegh).toFixed(1);
    return (
      <div className="organization">
        <h5 onClick={this.handleClick}>{this.props.data.name}</h5>
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{ width: orga_iegh + '%' }} aria-valuenow="{ orga_iegh}" aria-valuemin="0" aria-valuemax="100">{ orga_iegh }%</div>
        </div>
      </div>
    )
  }
}

class OrganizationData extends Component {
  render() {
    console.log(this.props.data);
    var women_global_ratio = Number(100 - this.props.data.global_male_ratio).toFixed(1);
    var women_director_ratio = Number(100 * this.props.data.direction_female / (this.props.data.direction_female + this.props.data.direction_male)).toFixed(1);
    var iehg = Number(this.props.data.iehg).toFixed(1);
    return(
      <div className="panel">
        <div className="panel-heading">
          <h4 className="panel-title">{this.props.orga.name} (IEHG : {iehg})</h4>
        </div>
        <div className="panel-body">
           <dl className="dl-horizontal text-left">
             <dt>Part de femmes dans l'effectif global</dt><dd>{women_global_ratio} %</dd>
             <dt>Part de femmes directeurs</dt><dd>{women_director_ratio} %</dd>
             <dt>Composition de la direction</dt><dd>{this.props.data.direction_female} femme(s) et {this.props.data.direction_male} hommes</dd>
           </dl>
           <p style={{'font-size': '80%'}}>Données: {this.props.data.year}.</p>
        </div>
      </div>
    )
  }
}

export default App;
