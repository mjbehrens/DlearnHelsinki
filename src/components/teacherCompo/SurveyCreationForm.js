import React from "react";
import TextareaAutosize from 'react-autosize-textarea';
import { withTranslate } from 'react-redux-multilingual';


class SurveyCreationFrom extends React.Component {

    render() {
        const { translate } = this.props;
        return (
            <div>
                <h6>{translate('survey_title')}</h6>
                <input type="text" className="mm-popup__input"
                    placeholder={this.props.title}
                    onChange={this.props.onChangeTitle}
                />
                <br />
                <h6>{this.props.title}</h6>
                <TextareaAutosize type="text" className="mm-popup__input"
                    rows={3}
                    placeholder={this.props.description}
                    onChange={this.props.onChangeDescription}>
                </TextareaAutosize>
                <br />
                <h6>{translate('select_themes')}</h6>
                <input type="checkbox" name="Ideas and problem solving" value={1} onChange={this.props.onChangeThemes} /> {translate('problem_solving')} <br />
                <input type="checkbox" name="Opinions and arguments" value={2} onChange={this.props.onChangeThemes}/> {translate('opinions')} <br />
                <input type="checkbox" name="Persistence" value={3} onChange={this.props.onChangeThemes}/> {translate('persistence')}<br />
                <input type="checkbox" name="Responsibility" value={4} onChange={this.props.onChangeThemes}/> {translate('responsibility')} <br />
                <input type="checkbox" name="Sustainable work - respect" value={5} onChange={this.props.onChangeThemes}/> {translate('sustainable_work')} <br />


            </div>
        )
    }
}

export default withTranslate(SurveyCreationFrom);
