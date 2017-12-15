import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { withTranslate } from 'react-redux-multilingual';
import Popup from 'react-popup';

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

const buttonStyle = {
    marginLeft: '5px',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    padding: '0',
}

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
        const { translate } = this.props;
        return (

        <div>
        	<div>
        		<h3>{translate('outlier_title')}</h3>
        	</div>
        	<div>
        		<table className="table table-hover table-stripped">
        			<tr>
        				<th className="text-center">{translate('outliers_name')}</th>
        				<th className="text-center">{translate('outlier_score')}
                   <button type="button" className="btn btn-secondary" style={buttonStyle} onClick={() => Popup.plugins().showInfo(this.props)}>
                  i</button>
                </th>
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
Popup.registerPlugin('showInfo', function (props) {


    this.create({
        title: props.translate('outlier_score'),
        content: props.translate('what_is_outlier'),
        buttons: {
            right: [{
                text: props.translate('cancel'),
                className: null, // optional
                action: function (popup) {
                    //do things
                    popup.close();
                }
            }],
        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});
export default connect(mapStateToProps)(withTranslate(OutlierList));
