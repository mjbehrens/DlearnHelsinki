import React, { Component } from 'react';

// About password guidelines: https://pages.nist.gov/800-63-3/sp800-63b.html
// TL;DR: https://nakedsecurity.sophos.com/2016/08/18/nists-new-password-rules-what-you-need-to-know/

const margins = {
    margin: '5px'
}

class LoginCreator extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            adj: "",
            adv: "",
            noun: "",
            nbr: "",
            username: ""
        }
    }

    selectAdjective = function() {
        this.setState ({
            adj: "a"
        });
        // select random adjective
    }

    selectAdjectiveVerb = function() {
        this.setState ({
            adv: "b"
        });
        // select random adjective that is a verb
    }
    
    selectNount = function() {
        this.setState ({
            noun: "c"
        });
        // select random noun
    }
    
    selectNumber = function() {
        // select pseudorandom 4 digit number?
        let temp = "";
        while (temp.length < 4) {
            temp = temp + Math.floor((Math.random()*10));
        }
        this.setState ({
            nbr: temp
        });
        
    }

    generateUsername = function() {
        // Where are the words stored?
        // Math.floor((Math.random()*(wordlist_length)+1) //if indexing starts from 1
        this.selectAdjective;
        this.selectAdjectiveVerb;
        this.selectNoun;
        this.selectNumber;
        
        this.setState ({
            username: (""+this.state.adj +" "+this.state.adv +" "+ this.state.noun +" "+ this.state.nbr)
        });
    }

    render() {
        this.genedateUsername;
        console.log("Username: "+this.state.username);
        
        return(
            <div className ="Login-form">
                <h1>Create an account</h1>
                <br></br>
                <div className = "form-group">
                    <label for="uName">Choose a username:</label>
                    <input type="text"
                        className="form-control"
                        style = {margins}  
                        id = "uName"
                        value = {this.state.username}
                        required
                        />
                    <label for="password">Choose a password:</label>
                    <input type="text" 
                        className="form-control"
                        style = {margins}  
                        id = "password"
                        required
                        />
                    <div style = {{textAlign: "left"}}>
                        <i>
                        <ul>
                            <li>It is recommended to use a password that is as long as possible. </li>
                            <li>A password must be at least X characters long. </li>
                            <li>Be creative with your choice, or use a random word or password generator.</li>
                            <li>Do not use a username or a real name as the password. </li>
                            <li>Do not use obvious choices for passwords such as "password", a movie title,
                            or the name of a sports team in any form in any language. </li>
                            <li>Avoid using a popularized example of a password, such as "correct horse battery staple",
                            as an actual password.</li>
                            <li>If this account is for a child, instruct them to never share their password
                            with anyone, including their teacher, parent, sibling, or their best friend.</li>
                        </ul>
                        </i>
                    </div>
                    <div>
                        <button className="btn btn-primary" 
                            style = {margins}> 
                                Create Account
                        </button>
                    </div>
                </div>
            </div>
        )
    }
} export default LoginCreator;