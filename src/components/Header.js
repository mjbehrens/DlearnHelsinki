import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';
import * as userActions from '../actions/userActions';
import * as classActions from '../actions/classActions';
import { withTranslate, IntlActions } from 'react-redux-multilingual';

function mapStateToProps(store) {
	return {
		user: store.user.user,
		classes: store.classroom.classes,
	}
}

class Header extends React.Component {

    loginLogoutButton = () => {
	const { translate } = this.props
        if (this.props.user.loggedin) {
	    return (
		<Link to={ROUTES.ROOT}>
		    <button className="btn btn-outline-success my-2 my-sm-0"
			type="submit"
			onClick={this.onLogoutClick}>

		    {translate('log_out')}
		    </button>
		</Link>
	    )
	} else {
	    return (
		<Link to={ROUTES.LOGIN}>
		    <button className="btn btn-outline-success my-2 my-sm-0"
			type="submit">
		    {translate('log_in')}

		    </button>
				</Link>
			)
		}
	}

    headerLinks = () => {
	const { translate } = this.props
	if (this.props.user.type === 'teacher') {
	    return (
		<ul className="navbar-nav mr-auto">
		    <li className="nav-item">
			<Link to={ROUTES.TEACHER_DASHBOARD}>
			    <a className="nav-link" href="">{translate('dashboard')}</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.CLASS_SELECTION}>
			    <a className="nav-link" href="">{translate('classes')}</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.GROUP_MANAGEMENT}>
			    <a className="nav-link" href="">{translate('groups')}</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.COMPETENCE_WALL}>
			    <a className="nav-link" href="">Competence Wall</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.HISTORY}>
			    <a className="nav-link" href="">{translate('history')}</a>
			</Link>
		    </li>
		</ul>
	    )
	} else if (this.props.user.type === 'student') {
	    return (
		<ul className="navbar-nav mr-auto">
		    <li className="nav-item">
			<Link to={ROUTES.STUDENT_DASHBOARD}>
			    <a className="nav-link" href="">{translate('dashboard')}</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.CLASS_SELECTION}>
			    <a className="nav-link" href="">{translate('classes')}</a>
			</Link>
		    </li>
		</ul>
	    )
	} else {
	    return (
		<ul className="navbar-nav mr-auto">
		<li className="nav-item">
		<Link to={ROUTES.ROOT}><a className="nav-link" href="">{translate('home')}</a></Link>
		</li>
		<li className="nav-item">
		    <a className="nav-link" href="">{translate('about')}</a>
		</li>
		<li className="nav-item">
		    <a className="nav-link" href="">{translate('contact')}</a>
		</li>
		</ul>
	    )

	}
    }

    onLogoutClick = () => {
	    this.props.dispatch(userActions.logoutUser())
	    this.props.dispatch(classActions.deleteAllClasses())
    }

    translationButton = () => {
	const { translate } = this.props
	let newLocale =  translate('locale') === 'English' ? 'fi' : 'en'
	return (
	    <ul className="navbar-nav mr-right">
		<li className="nav-item dropdown">
		    <a className="nav-link dropdown-toggle" href="" id="translationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{translate('locale')}</a>
		    <div className="dropdown-menu" aria-labelledby="translationDropdown">
		    <button className="dropdown-item" onClick={() => {
			this.props.dispatch(IntlActions.setLocale(newLocale))
		    }}>
		    {newLocale === 'en' ? 'English' : 'Suomeksi'}
		    </button>
		    </div>
		</li>
	    </ul>
	)}

    render() {
	return (
	<header>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-static-top">
					<Link to={ROUTES.ROOT}><a className="navbar-brand" href="">Dlearn</a></Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

	    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
		{this.headerLinks()}
		{this.translationButton()}
		{this.loginLogoutButton()}
	    </div>
	    </nav>
			</header>
		);
	}
}

export default connect(mapStateToProps)(withTranslate(Header));
