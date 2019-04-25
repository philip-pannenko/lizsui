import React, {Component} from 'react';
import {getHTMLElementFrieldyTodaysDate, generateMetricsData} from './utils';

class Metrics extends Component {

    constructor(props) {
        super(props);
        let today = getHTMLElementFrieldyTodaysDate();
        this.state = {metrics: [], date: today};
    }

    componentDidMount() {
        const {date} = this.state;
        this.fetchMetrics(date);
    }

    fetchMetrics = async (date) => {
        debugger;
        if (date === null || date === undefined || 0 === date.trim().length) {
            this.setState({metrics: []});
        } else {

            try {
                let response = await fetch(`metric/1/${date}`);
                const json = await response.json();
                // let data = generateMetricsData(); //json
                let data = json;
                this.setState({metrics: data});
            } catch (e) {
                console.error(e);
            }
        }
    };

    updateMetric = async (metric) => {
        const settings = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(metric)
        };

        try {
            const response = await fetch(`metric/${metric.id}`, settings);
            const json = await response.json();
            return json;
        } catch (e) {
            console.error(e);
            return e
        }
    };


    handleCalendarChange = (event) => {
        let value = event.target.value;
        this.fetchMetrics(value);
        this.setState({date: value});
    };

    handleMetricChange = async (event) => {
        let {date} = this.state;
        let id = Number(event.target.dataset.id);
        let value = Number(event.target.value);
        let metric = {id: id, value: value};
        await this.updateMetric(metric);
        await this.fetchMetrics(date);
        // this.setState({value: event.target.value});
    };


    render() {
        const {metrics, date} = this.state;
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

                {metrics.map((mc, index) => (
                    <table key={index} className="u-full-width">
                        <thead>
                        <tr>
                            <th>Group Name - {mc.name}</th>
                            <th>Sum - {mc.sum}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {mc.metrics.map((m, index) => (
                            <tr key={index}>
                                <td>{m.name}</td>
                                <td>
                                    <input data-id={m.values.id}
                                           type="number"
                                           name="name"
                                           value={m.values.value}
                                           onChange={this.handleMetricChange}/>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                ))}
            </div>
        );
    }
}

export default Metrics;
