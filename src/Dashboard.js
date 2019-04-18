import React, {Component} from 'react';
import {getHTMLElementFrieldyTodaysDate, generateDashboardData} from './utils';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        let today = getHTMLElementFrieldyTodaysDate();
        this.state = {dashboard: [], date: today};
    }

    componentDidMount() {
        const {date} = this.state;
        this.fetchDashboard(date);
    }

    fetchDashboard = async (date) => {
        console.log("Fetching Metrics for date: " + date);

        try {
            let response = await fetch('http://5cb7f2151551570014da3a0c.mockapi.io/metrics');
            const json = await response.json();
            let data = generateDashboardData(); //json
            this.setState({dashboard: data});
        } catch (e) {
            console.error(e);
        }

    };

    handleCalendarChange = (event) => {
        let value = event.target.value;
        this.fetchMetrics(value);
        this.setState({date: value});
    };

    render() {
        const {dashboard, date} = this.state;
        return (
            <div className="section">
                <form>
                    <div className="row">
                        <div>
                            <label htmlFor="metricDate">Metric Date</label>
                            <input id="metricDate" type="date" defaultValue={date}
                                   onBlur={this.handleCalendarChange}/>
                        </div>
                    </div>
                </form>

                {dashboard.map((item, index) => (
                    <div>
                        <table key={index} className="u-full-width">
                            <thead>
                            <tr>
                                <th>{item.name}</th>
                                <th>Totals</th>
                                {item.users.map((item, index) => (
                                    <th key={index}>{item.name}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {item.metrics.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td> {item.sum} </td>
                                    {item.values.map((item, index) => (
                                        <td key={index}>{item.value}</td>
                                    ))};
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        );
    }
}

export default Dashboard;
