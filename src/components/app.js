import React, { Component } from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import TimeLineChart from './timeline_chart';
import ShowGoodReads from './show_goodreads';
import axios from 'axios';
import defiant from 'defiant';
import apiConfig from '../../apikeys';
import proxify from 'proxify-url';

export default class App extends Component {
  constructor(props) {
    super(props);

    // this.goodReadsURL = `https://www.goodreads.com/shelf/list.xml`;
    // this.q = `key=${apiConfig.goodreadsKey}&user_id=${apiConfig.goodreadsUserID}&page=1`;

    let {goodReadsURL, q} = this.getShelfBooksURL();

    this.url = proxify(`${goodReadsURL}?${q}`, { inputFormat: 'xml' });

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


    axios.get(this.url, { params: { format: "json" } })
      .then((yqlResponse) => {
        let data = yqlResponse.data;

        // DefiantJS XPath query for user shelf for "read" section.
        // let search = JSON.search(data, "//*/user_shelf[name='read']");
        let search = JSON.search(data, "//*/review");

        this.setState({ shelfBooks: search });

        // console.log(search);
      }).catch((error) => {
        alert(`error: ${error}`);
      });

  }

  render() {
    return (
      <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="ScatterChart"
          data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
          options={{}}
          graph_id="ScatterChart"
          width="100%"
          height="400px"
          legend_toggle
        />
        <TimeLineChart />
        <ShowGoodReads shelfBooks={this.state.shelfBooks} />
      </div>
    );
  }
}
