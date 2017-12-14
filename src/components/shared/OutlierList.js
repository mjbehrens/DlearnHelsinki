import React, { Component } from 'react';
import Spinner from 'react-spinner';

import { BACKEND_API } from '../../constants.js';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}

var sampleData = [];
var compo = null;

class OutlierList extends Component {

    constructor(props) {
        super(props);
        compo = this;
        sampleData = [];

        this.state = {
            isLoading: false,
        }
    }

    componentWillMount() {
    	this.getOutliers();
    }

    getOutliers= function () {

        compo.setState({ isLoading: true });

        let GET_OUTLIERS = 'outliers/' + this.props.classid;

        fetch(BACKEND_API.ROOT + GET_OUTLIERS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    sampleData = data;
                    compo.setState({
                        outliers: data,
                        isLoading: false,
                    });
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    render() {
        return (

        <div>
        	<div>
        		<h3>Outliers</h3>
        	</div>
        	<div>
        		<table className="table table-hover table-stripped">
        			<tr>
        				<th>Username</th>
        				<th>Local outlier score</th>
        			</tr>
        			{sampleData.map(function(outlier, index) {
        				return <tr key={outlier._id}>
        						<td>{outlier.username}</td>
        						<td>{outlier.lofScore}</td>
        					   </tr>;
        			})}
        		</table>
            </div>
        </div>
        );
    }

}
export default connect(mapStateToProps)(OutlierList);
