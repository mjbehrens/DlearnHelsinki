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

    addToLog = () => {
        this.setState({
            ...this.state,
            modalProps: {
                ...this.state.modalProps,
            }
        }, () => this.props.dispatch(modalActions.setModal('CompetenceWallLogModal', this.state.modalProps)));
        this.props.dispatch(modalActions.showModal())
    }

    deleteFromLog = function (id) {
        var elem = document.getElementById(id);
        console.log(elem);
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
        this.addItemToLog();

    }

    addItemToLog = function () {

        /*
        for (let x = 0; x < y; x++) {
            var count = y-x;
            var ul = document.getElementById("logList");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("Student "+count));
            var button = document.createElement("button");
            button.innerHTML = "X";
            button.className = "btn btn-secondary button-right";
            li.appendChild(button);
            li.setAttribute("id", "attrib"+count);
            li.className = "list-group-item";
            ul.insertBefore(li, ul.childNodes[1]);
        }
        */
        let compo = this;
        let count = 1;
        var li_item = [];
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

    /*
        renderList = function () {
            return (
                <div >
                    <ul className="list-group" id="logList">
                        <li className="list-group-item active">Log</li>
                        <li className="list-group-item" id="attrib01">
                            Student 1<button type="button" className="btn btn-secondary button-right" onClick={this.deleteFromLog.bind(this, "attrib01")}>X</button>
                        </li>
                        <li className="list-group-item" id="attrib02">
                            Student 2<button type="button" className="btn btn-secondary button-right" onClick={this.deleteFromLog.bind(this, "attrib02")}>X</button>
                        </li>
                        <li className="list-group-item" id="attrib03">
                            Student 3<button type="button" className="btn btn-secondary button-right" onClick={this.deleteFromLog.bind(this, "attrib03")}>X</button>
                        </li>
                        <li className="list-group-item" id="attrib04">
                            Student 4<button type="button" className="btn btn-secondary button-right" onClick={this.deleteFromLog.bind(this, "attrib04")}>X</button>
                        </li>
                        <button type="button" className="list-group-item list-group-item-secondary list-group-item-action" onClick={this.addToLog}>Add an item</button>
                    </ul>
                </div>
            )
        }
        */

    render() {
        return (
            <div>
                <ul className="list-group" id="logList">
                    <li className="list-group-item active">Log</li>
                    {this.addItemToLog()}
                    <button type="button" className="list-group-item list-group-item-secondary list-group-item-action" onClick={this.addToLog}>Add an item</button>
                </ul>

            </div>
        )
    }
}


export default connect(mapStateToProps)(CompetenceWallLog);
