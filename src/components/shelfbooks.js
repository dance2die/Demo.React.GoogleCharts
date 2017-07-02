import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class ShelfBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        let books = nextProps.shelfBooks
            // Filter out books with invalid date ranges.
            .filter(shelfBook => {
                return Date.parse(shelfBook.started_at) < Date.parse(shelfBook.read_at);
            })
            .map(shelfBook => {
                return [
                    shelfBook.book.title,
                    shelfBook.book.title,
                    new Date(Date.parse(shelfBook.started_at)),
                    new Date(Date.parse(shelfBook.read_at))
                ];
            });

        this.setState({
            "chartType": "Timeline",
            "columns": [
                { "id": "BookTitle", "type": "string", "width": "100%" },
                { "role": "tooltip", "type": "string" },
                { "id": "StartAt", "type": "date" },
                { "id": "EndAt", "type": "date" },
            ],
            "rows": books,
            "options": { "width": "600px" },
            "width": "100%",
            "height": "800px",
            "graph_id": "bookShelfTimeLine",
            "chartPackage": "timeline"
        });
    }

    render() {
        if (!this.state.chartType) {
            return <div>Loading...</div>;
        }

        let chart = <Chart
            chartType={this.state.chartType}
            rows={this.state.rows}
            columns={this.state.columns}
            options={this.state.options}
            width={this.state.width}
            chartPackage={this.state.chartPackage}
            graph_id={this.state.graph_id}
            height={this.state.height}
            legend_toggle
        />;

        return (
            <div>{chart}</div>
        );
    }
}