import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class ShowGoodReads extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // https://stackoverflow.com/a/32157488
        return (
            <div>
                <ShelfBooks shelfBooks={this.props.shelfBooks} />
            </div>
        );
    }
}

class ShelfBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', nextProps);
        // if (!this.props.shelfBooks) {
        //     console.log("componentWillReceiveProps: there is no shelfBooks data, yet");
        //     return;
        // }

        let books = nextProps.shelfBooks
            .filter(shelfBook => {
                return Date.parse(shelfBook.started_at) < Date.parse(shelfBook.read_at);
            })
            .map(shelfBook => {
                console.log('shelfBook:', shelfBook);
                let result = [
                    shelfBook.book.title,
                    new Date(Date.parse(shelfBook.started_at)),
                    new Date(Date.parse(shelfBook.read_at))
                ];

                console.group();
                console.log('result:', result);
                console.groupEnd();


                return result;
            });

        console.log('componentWillReceiveProps: books', books);

        this.setState({
            "chartType": "Timeline",
            "columns": [
                { "id": "BookTitle", "type": "string" },
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
        // if (!this.props.shelfBooks) {
        if (!this.state.chartType) {
            console.log("there is no state, yet....");
            return <div>there is no shelfBooks data</div>;
        }

        console.log('render: this.state', this.state);

        // let books = this.props.shelfBooks.map(shelfBook => {
        //     return (
        //         <div key={shelfBook.id}>
        //             <div>Title:</div><div>{shelfBook.book.title}</div>
        //             <div>Started At:</div><div>{shelfBook.started_at}</div>
        //             <div>Read At:</div><div>{shelfBook.read_at}</div>
        //             <br />
        //             <br />
        //         </div >
        //     );
        // });


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