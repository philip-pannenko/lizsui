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
        console.log("Fetching Metrics for date: " + date);

        try {
            let response = await fetch('http://5cb7f2151551570014da3a0c.mockapi.io/metrics');
            const json = await response.json();
            let data = generateMetricsData(); //json
            this.setState({metrics: data});
        } catch (e) {
            console.error(e);
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
            const response = await fetch('http://5cb7f2151551570014da3a0c.mockapi.io/metrics/' + metric.id, settings);
            const json = await response.json();
            console.log("Successfully updated Metric[" + metric.id + "] with new value, " + metric.value);
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

    handleMetricChange = (event) => {
        let id = Number(event.target.dataset.id);
        let value = Number(event.target.value);
        let metric = {id: id, value: value};
        this.updateMetric(metric);
        this.setState({value: event.target.value});
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

                {metrics.map((item, index) => (
                    <table key={index} className="u-full-width">
                        <thead>
                        <tr>
                            <th>Group Name - {item.name}</th>
                            <th>Sum - {item.sum}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {item.metrics.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    <input data-id={item.id}
                                           type="number" pattern="[0-9]*"
                                           name="name"
                                           value={item.value}
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
