import React, { Component } from 'react';

const margins = {
    margin: '5px'
}

const formStyle = {
    width: '50%'
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
            username: (""+this.state.adj + this.state.adv + this.state.noun + this.state.nbr)
        });
    }

    render() {
        this.genedateUsername;
        console.log("Username: "+this.state.username);
        return(
            <div className = "form-group" style = {formStyle}>
                <label for="uName">Username:</label>
                <input type="text"
                    className="form-control"
                    style = {margins}  
                    id = "uName"
                    value = {this.state.username}
                    required
                    />
                <label for="password">Password:</label>
                <input type="text" 
                    className="form-control"
                    style = {margins}  
                    id = "password"
                    required
                    />
                <div>
                    <button className="btn btn-primary" 
                        style = {margins}> 
                            Create Account
                    </button>
                </div>
            </div>
        )
    }
} export default LoginCreator;