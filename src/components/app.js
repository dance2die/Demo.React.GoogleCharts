import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import ShowGoodReads from './show_goodreads';
import axios from 'axios';
import apiConfig from '../../apikeys';
import proxify from 'proxify-url';
import defiant from 'defiant';

export default class App extends Component {
    constructor(props) {
        super(props);

        let {goodReadsURL, q} = this.getShelfBooksURL();
        this.url = proxify(`${goodReadsURL}?${q}`, {inputFormat: 'xml'});
        this.state = {};
    }

    getShelfBooksURL() {
        // https://www.goodreads.com/api/index#reviews.list
        let goodReadsURL = ` https://www.goodreads.com/review/list`;
        let q = `v=2&key=${apiConfig.goodreadsKey}&id=${apiConfig.goodreadsUserID}&shelf=read&sort=date_started`;

        return {goodReadsURL, q};
    }

    componentDidMount() {
        // Get GoodReads data via Web API.
        axios.get(this.url, {params: {format: "json"}})
            .then((yqlResponse) => {
                let data = yqlResponse.data;

                // DefiantJS XPath query for user shelf for "read" section.
                // let search = JSON.search(data, "//*/user_shelf[name='read']");
                let search = JSON.search(data, "//*/review");
                this.setState({shelfBooks: search});
            }).catch((error) => {
            alert(`error: ${error}`);
        });
    }

    render() {
        return (
            <div className={'my-pretty-chart-container'}>
                <ShowGoodReads shelfBooks={this.state.shelfBooks}/>
            </div>
        );
    }
}
