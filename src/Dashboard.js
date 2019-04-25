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
        let userGroup = 1;

        try {
            let response = await fetch(`dashboard/${userGroup}/${date}`);
            const json = await response.json();
            // let data = generateDashboardData(); //json
            let data = json;
            this.setState({dashboard: data});
        } catch (e) {
            console.error(e);
        }
    };

    handleCalendarChange = async (event) => {
        let value = event.target.value;
        await this.fetchDashboard(value);
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

                {dashboard.map((mc, index) => (
                    <table key={index} className="u-full-width">
                        <thead>
                        <tr>
                            <th>{mc.name}</th>
                            <th>Totals</th>
                            {mc.header.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {mc.metrics.map((m, index) => (
                            <tr key={index}>
                                <td>{m.name}</td>
                                <td> {m.sum} </td>
                                {m.values.map((item, index) => (
                                    <td key={index}>{item.value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                ))}
            </div>
        );
    }
}

export default Dashboard;
