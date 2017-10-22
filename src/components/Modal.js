import React from "react";
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
	modal: store.modal,
    }
}


class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
	return (
	<div className="modal fade" id="mainModal" tabindex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
	    <div className="modal-dialog" role="document">
		<div className="modal-content">
		    <div className="modal-header">
		    <h5 className="modal-title" id="mainModalLabel">{this.props.modal.title}</h5>
			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
		    </div>
		    <div className="modal-body">
		    {this.props.modal.body}
		    </div>
		    <div className="modal-footer">
		    {this.props.modal.footer}
		    </div>
		</div>
	    </div>
	</div>
	)
    }
}

export default connect(mapStateToProps)(Modal);
