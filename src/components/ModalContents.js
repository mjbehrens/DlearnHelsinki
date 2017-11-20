import React from "react";
import SurveyCreationForm from './teacherCompo/SurveyCreationForm.js'


class DefaultModal extends React.Component {
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


class OpenSurveyModal extends React.Component {
  render() {
    return (
	<div className="modal-content">
	    <div className="modal-header">
	    <h5 className="modal-title" id="mainModalLabel">Creation of a new survey</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		<SurveyCreationForm
		    onChangeTitle={this.props.getTitle}
		    onChangeDescription={this.props.getDescription}
		    onChangeThemes={this.props.getThemes}
		    title={"New Survey"}
		    description={"new survey for today\'s exercices"} />
	    </div>
	    <div className="modal-footer">
		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={() => this.props.requestToOpenSurvey(this.props.title, this.props.description, this.props.theme_ids)} disabled={!this.props.createButtonEnabled}>Create</button>
	<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
	    </div>
	</div>
    );
  }
}


class CloseSurveyModal extends React.Component {
  render() {
    return (
	<div className="modal-content">
	    <div className="modal-header">
		<h5 className="modal-title" id="mainModalLabel">Closing the current survey</h5>
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>
	    <div className="modal-body">
		<p>You are about to close the survey.<br />
		The students will no longer be able to answer this survey after that.<br />
		Do you really want to close the survey {this.props.survey.title} from {this.props.survey.start_date} ?</p>
	    </div>
	    <div className="modal-footer">
		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={this.props.requestToCloseSurvey}>Close Survey</button>
		<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
	    </div>
	</div>
    );
  }
}

export default {
    DefaultModal,
    OpenSurveyModal,
    CloseSurveyModal,
};

// import React from "react";
// import SurveyCreationForm from './teacherCompo/SurveyCreationForm.js'
// import { withTranslate } from 'react-redux-multilingual';
//
// class DefaultModal extends React.Component {
//   render() {
//     const { translate } = this.props;
//     return (
// 	<div className="modal-content">
// 	    <div className="modal-header">
// 		<h5 className="modal-title" id="mainModalLabel">My Modal Title</h5>
// 		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
// 		    <span aria-hidden="true">&times;</span>
// 		</button>
// 	    </div>
// 	    <div className="modal-body">
// 		My Modal Body
// 	    </div>
// 	    <div className="modal-footer">
// 		My Modal Footer
// 	    </div>
// 	</div>
//     );
//   }
// }
//
//
// class OpenSurveyModal extends React.Component {
//   render() {
//     const { translate } = this.props;
//     return (
// 	<div className="modal-content">
// 	    <div className="modal-header">
// 	    <h5 className="modal-title" id="mainModalLabel">{this.props.translate('creation_new_survey')}</h5>
// 		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
// 		    <span aria-hidden="true">&times;</span>
// 		</button>
// 	    </div>
// 	    <div className="modal-body">
// 		<SurveyCreationForm
// 		    onChangeTitle={this.props.getTitle}
// 		    onChangeDescription={this.props.getDescription}
// 		    onChangeThemes={this.props.getThemes}
// 		    title={this.props.translate('new_survey')}
// 		    description={this.props.translate('new_survey_descpription')} />
// 	    </div>
// 	    <div className="modal-footer">
// 		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={() => this.props.requestToOpenSurvey(this.props.title, this.props.description, this.props.theme_ids)} disabled={!this.props.createButtonEnabled}>{this.props.translate('create')}</button>
// 	<button type="button" className="btn btn-secondary" data-dismiss="modal">{this.props.translate('cancel')}</button>
// 	    </div>
// 	</div>
//     );
//   }
// }
//
//
// class CloseSurveyModal extends React.Component {
//   render() {
//     const { translate } = this.props;
//     return (
// 	<div className="modal-content">
// 	    <div className="modal-header">
// 		<h5 className="modal-title" id="mainModalLabel">{this.props.translate('closing_survey')}</h5>
// 		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
// 		    <span aria-hidden="true">&times;</span>
// 		</button>
// 	    </div>
// 	    <div className="modal-body">
// 		<p>{this.props.translate('confirmation_text_close_survey', {title: this.props.survey.title}, {start_date: this.props.survey.start_date})}</p>
// 	    </div>
// 	    <div className="modal-footer">
// 		<button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#mainModal" onClick={this.props.requestToCloseSurvey}>{this.props.translate('close_survey')}</button>
// 		<button type="button" className="btn btn-secondary" data-dismiss="modal">{this.props.translate('cancel')}</button>
// 	    </div>
// 	</div>
//     );
//   }
// }
//
//
// export default {
//   DefaultModal,
//   OpenSurveyModal,
//   CloseSurveyModal,
// };
