import React from "react";

class SelectClass extends React.Component {
    
    render(){

        return(
//            <div>
                <button type="button" 
                        className="btn btn-primary">
                            {this.props.nameOfClass}
                </button>
//            </div>
        );
    }
}

export default SelectClass