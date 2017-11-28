import React from "react";
import { connect } from 'react-redux';
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import * as modalActions from '../../actions/modalActions';

function mapStateToProps(store) {
    return {
	modal: store.modal,
    }
}

class CompetenceWallLog extends React.Component {

    constructor(props) {
        super(props);
	this.state = {
	    modalProps: {},
	}
    }

    addToLog = () => {
	this.setState({
	    ...this.state,
	    modalProps: {
		...this.state.modalProps,
	    }
	}, () => this.props.dispatch(modalActions.setModal('CompetenceWallLogModal', this.state.modalProps)));
	this.props.dispatch(modalActions.showModal())
    }

    render() {

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item active">Log</li>
                    <li className="list-group-item">
                        Student 1
                        <input className="form-check-input float-right" type="checkbox" value="" />
                    </li>
                    <li className="list-group-item">
                        Student 2
                        <input className="form-check-input float-right" type="checkbox" value="" />
                    </li>
                    <li className="list-group-item">
                        Student 3
                        <input className="form-check-input float-right" type="checkbox" value=""/>
                    </li>
                    <li className="list-group-item">
                        Student 4
                        <input className="form-check-input float-right" type="checkbox" value=""/>
                    </li>
		    <button type="button" className="list-group-item list-group-item-secondary list-group-item-action" onClick={this.addToLog}>Add an item</button>
                </ul>
            </div>
        )
    }
}


export default connect(mapStateToProps)(CompetenceWallLog);
