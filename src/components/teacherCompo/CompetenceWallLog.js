import React from "react";
import { connect } from 'react-redux';
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

    addItem = () => {
        this.setState({
            ...this.state,
            modalProps: {
                ...this.state.modalProps,
                getRequest : this.props.getRequest,
                data : this.props.data,
            }
        }, () => this.props.dispatch(modalActions.setModal('CompetenceWallLogModal', this.state.modalProps )));
        this.props.dispatch(modalActions.showModal())
    }

    deleteFromLog = function (id) {
        var elem = document.getElementById(id);
        console.log(elem);
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
        this.renderItemIntoLog();

    }

    renderItemIntoLog = function () {

        let compo = this;
        let count = 1;
        var li_item = [];
        console.log(this.props.data_competence)
        this.props.data_competence.forEach(function (element) {
            li_item.push(
                <il id={element.request}
                    className="list-group-item">
                    {element.name}
                    <button type="button" onClick={() => compo.props.functionDelete(element.request)} className="btn btn-secondary button-right">X</button>
                </il>
            )
            count += 1;
        });

        return li_item;

    }


    render() {
        return (
            <div>
                <ul className="list-group" id="logList">
                    <li className="list-group-item active">Log</li>
                    {this.renderItemIntoLog()}
                    <button type="button" className="list-group-item list-group-item-secondary list-group-item-action" onClick={this.addItem}>Add an item</button>
                </ul>

            </div>
        )
    }
}


export default connect(mapStateToProps)(CompetenceWallLog);
