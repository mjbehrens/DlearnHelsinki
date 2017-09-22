import React from "react";


const style = { width: 600,
                margin: 50, 
                textAlign : 'center',
                background : 'blue' };


class OpenSurvey extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opening : true,
            closing : false,
            text : "Open Survey" 
        }
    }

    onClick = () => {
        // open a new suvey
        if(this.state.opening == true && this.state.closing == false){

        }else{
            //close the previously opened survey
            if(this.state.opening == false && this.state.closing == true){

            }
        }
    }

    render(){

        return(
            <div>
                <button type="button" 
                        className="btn btn-primary"
                        onClick={this.onClickNext}>{this.state.text }</button>
            </div>
        );

    }


}

export default OpenSurvey;