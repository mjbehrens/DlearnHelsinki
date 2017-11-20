import React from "react";
import { connect } from 'react-redux';
import ModalContents from './ModalContents';


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
	let ModalContent = ModalContents[this.props.modal.modalType]
	// let ModalContent = ModalContents['DefaultModal']
	return (
	<div className="modal fade" id="mainModal" tabIndex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
	    <div className="modal-dialog" role="document">
		<div className="modal-content">
		    <ModalContent {...this.props.modal.modalProps} />
		</div>
	    </div>
	</div>
	)
    }
}

export default connect(mapStateToProps)(Modal);
