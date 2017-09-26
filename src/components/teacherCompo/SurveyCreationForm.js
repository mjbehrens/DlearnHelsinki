import React from "react";

class SurveyCreationFrom extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Title of the survey</h6>
                <input type="text" className="mm-popup__input"
                    placeholder={this.props.title}
                    onChange={this.props.onChangeTitle}
                />
                <h6>Description of the survey</h6>
                <input type="text" className="mm-popup__input"
                    placeholder={this.props.description}
                    onChange={this.props.onChangeDescription}
                />

            </div>
        )
    }
}

export default SurveyCreationFrom;