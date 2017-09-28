import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

class SpiderGraph extends Component {

constructor(props) {
    super(props);
    this.state = {
      cpt: 0,
      url: "http://172.20.10.3:8080/skeleton/webapi/students/1/spidergraphs/1",
      data: {
	  labels: ['Value1', 'Value2', 'Value3', 'Value4', 'Value5', 'Value6', 'Value7', 'Value8', 'Value9', 'Value10', 'Value11', 'Value12', 'Value13'],
				datasets: [ {
					label: 0,
					backgroundColor: 'rgba(179,181,198,0.2)',
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
				    data: [3, 2, 5, 2, 4, 6, 2, 2, 3, 2, 5, 4, 7]
				}
				]
			}
	};
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      3000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
  	fetch(this.state.url)
  	.then((resp) => resp.json())
  	.then(function(jdata) {
  
			this.setState({...this.state,
		  data: {...this.state.data, datasets: [
			{
			  label: "Test SpiderGraph",
			  backgroundColor: "rgba(179,181,198,0.2)",
			  borderColor: "rgba(179,181,198,1)",
			  pointBackgroundColor: "rgba(179,181,198,1)",
			  pointBorderColor: "#fff",
			  pointHoverBackgroundColor: "#fff",
			  pointHoverBorderColor: "rgba(179,181,198,1)",
			  data: [jdata.value1, jdata.value2, jdata.value3, jdata.value4, jdata.value5]
			}
		  ]},
		});
		})
  }

  render() {  
    return (
      <div>
        <Radar data={this.state.data} />
      </div>
    );
  }
}

export default SpiderGraph;
