import React from "react";
import { withTranslate } from 'react-redux-multilingual';
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";

class AddGroup extends React.Component {

    constructor(props) {
        super(props);
        const { translate } = this.props;
    }


    render() {

        return (
            <div>
                <h6>{this.props.translate('name')}  :</h6><input type="text" placeholder={this.props.translate('group_name_placeholder')}
                    onChange={this.props.onChangeGroupName} />
            </div>
        )
    }
}


export default withTranslate(AddGroup);
