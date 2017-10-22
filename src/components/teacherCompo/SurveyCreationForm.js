import React from "react";
import TextareaAutosize from 'react-autosize-textarea';


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
                <br />
                <h6>Description of the survey</h6>
                <TextareaAutosize type="text" className="mm-popup__input"
                    rows={3}
                    placeholder={this.props.description}
                    onChange={this.props.onChangeDescription}>
                </TextareaAutosize>
                <br />
                <h6>Select Themes of the survey</h6>
                <input type="checkbox" name="Ideas and problem solving" value={1} onChange={this.props.onChangeThemes} /> Ideas and problem solving <br />
                <input type="checkbox" name="Opinions and arguments" value={2} onChange={this.props.onChangeThemes}/> Opinions and arguments <br />
                <input type="checkbox" name="Persistence" value={3} onChange={this.props.onChangeThemes}/> Persistence <br />
                <input type="checkbox" name="Responsibility" value={4} onChange={this.props.onChangeThemes}/> Responsibility <br />
                <input type="checkbox" name="Sustainable work - respect" value={5} onChange={this.props.onChangeThemes}/> Sutainable work - respect <br />


            </div>
        )
    }
}

export default SurveyCreationFrom;
