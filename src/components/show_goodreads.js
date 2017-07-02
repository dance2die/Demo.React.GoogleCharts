import React, { Component } from 'react';

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

    render() {
        if (!this.props.shelfBooks) {
            console.log("there is no shelfBooks data, yet");
            return <div>there is no shelfBooks data</div>;
        }

        console.log('this.props.shelfBooks', this.props.shelfBooks);

        let books = this.props.shelfBooks.map(shelfBook => {
            return (
                <div key={shelfBook.id}>
                    <div>Title:</div><div>{shelfBook.book.title}</div>
                    <div>Started At:</div><div>{shelfBook.started_at}</div>
                    <div>Read At:</div><div>{shelfBook.read_at}</div>
                    <br />
                    <br />
                </div >
            );
        });

        return (
            <div>{books}</div>
        );
    }
}