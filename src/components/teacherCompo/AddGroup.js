import React from "react";
import { withTranslate } from 'react-redux-multilingual';
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";

class AddGroup extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { translate } = this.props;
        return (
            <div>
                <h6>{translate('name')}  :</h6><input type="text" placeholder={translate('group_name_placeholder')}
                    onChange={this.props.onChangeGroupName} />
            </div>
        )
    }
}


export default withTranslate(AddGroup);
