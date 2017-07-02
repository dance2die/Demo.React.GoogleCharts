import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class TimelineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "chartType": "Timeline",
            "columns": [
                { "id": "President", "type": "string" },
                { "id": "Start", "type": "date" },
                { "id": "End", "type": "date" }
            ],
            "rows": [
                [
                    "Washington",
                    new Date(1789, 4, 30),
                    new Date(1797, 3, 4),
                ],
                [
                    "Adams",
                    new Date(1797, 3, 4),
                    new Date(1801, 3, 4),
                ],
                [
                    "Jefferson",
                    new Date(1801, 3, 4),
                    new Date(1809, 3, 4),
                ]
            ],
            "options": { "width": "600px" },
            "width": "100%",
            "height": "400px",
            "graph_id": "TimeLine",
            "chartPackage": "timeline"
        };
    }

    render() {
        return (
            <Chart
                chartType={this.state.chartType}
                rows={this.state.rows}
                columns={this.state.columns}
                options={this.state.options}
                width={this.state.width}
                chartPackage={this.state.chartPackage}
                graph_id={this.state.graph_id}
                height={this.state.height}
                legend_toggle
            />
        );
    }
}