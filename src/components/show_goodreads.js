import React, { Component } from 'react';
import ShelfBooks from './shelfbooks';

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