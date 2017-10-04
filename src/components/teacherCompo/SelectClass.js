import React from "react";

class SelectClass extends React.Component {
    
    render(){

        return(
//            <div>
                <button style = {{margin: "1vmin"}}
                        className="btn btn-primary">
                            {this.props.nameOfClass}
                </button>
//            </div>
        );
    }
}

export default SelectClass