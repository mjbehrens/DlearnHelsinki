import React from "react";

class SelectClass extends React.Component {
    
    
    render(){
        
        return(
                <button style = {{margin: "1vmin"}}
                        className="btn btn-primary">
                            {this.props.nameOfClass}
                </button>
        );
    }
}

export default SelectClass