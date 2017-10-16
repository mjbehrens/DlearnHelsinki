import React, { Component } from 'react';

// About password guidelines: https://pages.nist.gov/800-63-3/sp800-63b.html
// TL;DR: https://nakedsecurity.sophos.com/2016/08/18/nists-new-password-rules-what-you-need-to-know/


//import adjList from '../res/adjectives.txt';
//import nounList from '../res/nouns.txt';

const margins = {
    margin: '5px'
}

var adj = "";
var noun = "";
var nbr = "";
var username = "";

var adjectives = [];
var nouns = [];

class StudentAccountCreator extends Component {
    
    constructor(props) {
        super(props);
        var adj = "";
        var noun = "";
        var nbr = "";
        var username = "";
        var adjectives = [];
        var nouns = [];
        this.generateUsername();
    }

    readFile = (file, target) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            
        }
        
    }

    // Select 2 adjectives
    selectAdjectives = function() {
//        console.log(adjList);
//        let lines = adjList.split('\n');
//        let i = 0;
        let file = "../res/adjectives.txt"
        this.readFile(file, adjectives);
        

        let rnb = Math.floor(Math.random()*(adjectives.length));
        console.log("An adjective should be here. "+adjectives[rnb]);
        
        let temp1 = "";
        let temp2 = "";
        adj = temp1+" "+temp2

        console.log("adjective chosen")
    }
    
    // Select a noun
    selectNoun = function() {
        let nounList = '../res/nouns.txt';
        
        noun = "c"
        console.log("noun chosen")
    }
    
    // Select a number
    selectNumber = function() {
        // select pseudorandom 4 digit number?
        let temp = "";
        while (temp.length < 4) {
            temp = temp + Math.floor((Math.random()*10));
        }; 
        nbr = temp;
        console.log("number chosen")
        
    }

    generateUsername = function() {
        // Math.floor((Math.random()*(wordlist_length)+1) //if indexing starts from 1
        
        this.selectAdjectives();
        this.selectNoun();
        this.selectNumber();
        
        let temp = ""+adj +" "+ noun +nbr;
        username = temp;
        // Check that the generated username is not already in the system.
        // If it is, run this function again.
        console.log("username generated")
    }

    render() {
        console.log("Username: "+username);
        
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
                        value = {username}
                        />
                    <label for="password">Choose a password:</label>
                    <input type="text" 
                        className="form-control"
                        style = {margins}  
                        id = "password"
                        />
                    <div style = {{textAlign: "left"}}>
                        <i>
                        <ul>
                            <li>It is recommended to use a password that is as long as possible. </li>
                            <li>A password must be at least 12 characters long. </li>
                            <li>Passwords can contain any UTF-8 characters.</li>
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
} export default StudentAccountCreator;