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
					<p>{translate('confirmation_text_close_survey', { title: this.props.survey.title }, { start_date: this.props.survey.start_date })}</p>
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


	constructor(props) {
		super(props);
		
		this.state = {
			class_id : -1,
			group_id : -1,
			student_id : -1
		} 
	
	}

	onSelectClass = function (e) {
		let id = e.target.value;
		this.setState({
			class_id : id,
			group_id : -1,
			student_id : -1
		})
	}

	onSelectGroup = function (e) {
		let id = e.target.value;
		this.setState({
			group_id : id,
			student_id : -1,
		})
	}

	onSelectStudent = function (e) {
		let id = e.target.value;
		this.setState({
			student_id : id,
		})
	}


	renderClassesSelect(data){
		
        let options = [];
        if (data != null) {
            options.push(<option value={-1}> {"select a class"} </option>);
            data.forEach(function (c) {
				options.push(<option value={c._id}> {c.name} </option>)
				
            });
        }
        return (
			<select defaultValue={null} 
			onChange={this.onSelectClass.bind(this)}
			>
                {options}
            </select>
        )
	}

	renderGroupsSelect(data){
		let options = [];
		let compo = this
        if (data != null) {
            options.push(<option value={-1}> {"select a group"} </option>);
            data.forEach(function (c) {
				if(compo.state.class_id == -1) {
					c.groups.forEach(function (g){
						//options.push(<option value={g._id}> {g.name} </option>)
					})
				}else if(c._id == compo.state.class_id){
					c.groups.forEach(function (g){
						options.push(<option value={g._id}> {g.name} </option>)
					})
				}				
            });
        }
        return (
			<select defaultValue={null} 
			onChange={this.onSelectGroup.bind(this)}
			>
                {options}
            </select>
        )
	}

	renderStudentsSelect(data){
		let options = [];
		let compo = this
        if (data != null) {
            options.push(<option value={-1}> {"select a student"} </option>);
            data.forEach(function (c) {
				if(compo.state.class_id == -1) {
					c.groups.forEach(function (g){
						//options.push(<option value={g._id}> {g.name} </option>)
					})
				}else if(c._id == compo.state.class_id){
					c.groups.forEach(function (g){
						//options.push(<option value={g._id}> {g.name} </option>)
					})
				}				
            });
        }
        return (
			<select defaultValue={null} 
			onChange={this.onSelectStudent.bind(this)}
			>
                {options}
            </select>
        )
	}

	renderRequest = function (){
		let s = "I want "
		if(this.state.student_id != -1){
			s+= 'student ' + this.state.student_id + ' '
		}
		if(this.state.group_id != -1){
			s+= 'group ' + this.state.group_id + ' '
		}
		if(this.state.class_id != -1){
			s+= 'class ' + this.state.class_id + ' '
		}

		return s
	}



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
						{this.renderClassesSelect(this.props.data)}
						{this.renderGroupsSelect(this.props.data)}
						{this.renderStudentsSelect(this.props.data)}
					</div>					
				</div>
				{
					//this.renderRequest()
				}
				<div className="modal-footer">
					<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.getRequest(this.state)} >{translate('confirm')}</button>
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

