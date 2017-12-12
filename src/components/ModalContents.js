import React from "react";
import SurveyCreationForm from './teacherCompo/SurveyCreationForm.js'
import { withTranslate } from 'react-redux-multilingual';

class Default extends React.Component {
  render() {
    return (
	<div className="modal-content">
	    <div className="modal-header">
		<h5 className="modal-title" id="mainModalLabel">My Modal Title</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		My Modal Body
	    </div>
	    <div className="modal-footer">
		My Modal Footer
	    </div>
	</div>
    );
  }
}


class OpenSurvey extends React.Component {
  render() {
    const { translate } = this.props;
    return (
	<div className="modal-content">
	    <div className="modal-header">
	    <h5 className="modal-title" id="mainModalLabel">{translate('creation_new_survey')}</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		<SurveyCreationForm
		    onChangeTitle={this.props.getTitle}
		    onChangeDescription={this.props.getDescription}
		    onChangeThemes={this.props.getThemes}
		    title={translate('new_survey')}
		    description={translate('new_survey_descpription')} />
	    </div>
	    <div className="modal-footer">
		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={() => this.props.requestToOpenSurvey(this.props.title, this.props.description, this.props.theme_ids)} disabled={!this.props.createButtonEnabled}>{translate('create')}</button>
	<button type="button" className="btn btn-secondary" data-dismiss="modal">{translate('cancel')}</button>
	    </div>
	</div>
    );
  }
}


class CloseSurvey extends React.Component {
  render() {
    const { translate } = this.props;
    return (
	<div className="modal-content">
	    <div className="modal-header">
		<h5 className="modal-title" id="mainModalLabel">{translate('closing_survey')}</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		<p>{translate('confirmation_text_close_survey', {title: this.props.survey.title}, {start_date: this.props.survey.start_date})}</p>
	    </div>
	    <div className="modal-footer">
		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={this.props.requestToCloseSurvey}>{translate('close_survey')}</button>
		<button type="button" className="btn btn-secondary" data-dismiss="modal">{translate('cancel')}</button>
	    </div>
	</div>
    );
  }
}


class CompetenceWallLog extends React.Component {
  render() {
    const { translate } = this.props;
    return (
	<div className="modal-content">
	    <div className="modal-header">
		<h5 className="modal-title" id="mainModalLabel">Add an item</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		<p>Choose a type of item to add to the comparaison</p>
		<div className="btn-group-vertical">
		    <button type="button" className="btn btn-primary">Class</button>
		    <button type="button" className="btn btn-primary">Group</button>
		    <button type="button" className="btn btn-primary">Student</button>
		</div>
	    </div>
	    <div className="modal-footer">
		<button type="button" className="btn btn-secondary" data-dismiss="modal">{translate('cancel')}</button>
	    </div>
	</div>
    );
  }
}


const DefaultModal = withTranslate(Default);
const OpenSurveyModal = withTranslate(OpenSurvey);
const CloseSurveyModal = withTranslate(CloseSurvey);
const CompetenceWallLogModal = withTranslate(CompetenceWallLog);

export default {
  DefaultModal,
  OpenSurveyModal,
  CloseSurveyModal,
  CompetenceWallLogModal,
};
