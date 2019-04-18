import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Metrics from './Metrics'
import Dashboard from './Dashboard'

class App extends Component {

    constructor(props) {
        super(props);
    }

    Home = ()=> {
        return <h2>Home</h2>;
    }

    render() {

        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <nav className="navbar">
                            <div className="container">
                                <ul className="navbar-list">
                                    <li className="navbar-item"><Link to="/" className="navbar-link">Liz's UI</Link>
                                    </li>
                                    <li className="navbar-item"><Link to="/metrics"
                                                                      className="navbar-link">Metrics</Link></li>
                                    <li className="navbar-item"><Link to="/dashboard"
                                                                      className="navbar-link">Dashboard</Link></li>

                                </ul>
                                <ul className="navbar-list u-pull-right">
                                    <li className="navbar-item "><a className="navbar-link" href="#examples">Philip
                                        Pannenko</a></li>
                                </ul>
                            </div>
                        </nav>

                        <Route path="/" exact component={this.Home}/>
                        <Route path="/metrics/" component={Metrics}/>
                        <Route path="/dashboard/" component={Dashboard}/>

                    </div>

                </div>
            </Router>
        );
    }
}

export default App;
