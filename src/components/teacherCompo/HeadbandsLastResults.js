import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';


const style = {
    marginLeft : "100px",
    marginRight : "100px",
    border : "2px solid black",
    borderColor : "black"
};

const styleButton = {
    marginLeft : "15px"
}


class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onClickSurvey = () => {

    }

    render() {
        var group_list = [
            <button style = {styleButton} type="button" className="btn btn-primary">Group1</button>,
            <button style = {styleButton} type="button" className="btn btn-primary">Group2</button>,
            <button style = {styleButton} type="button" className="btn btn-primary">Group3</button>,
            <button style = {styleButton} type="button" className="btn btn-primary">Group4</button>,
            <button style = {styleButton} type="button" className="btn btn-primary">Group5</button>,    
        ]

        return (
            <div style={ style }>
                <div className="text-left">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="btn-group-vertical">
                               { group_list }
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <SpiderGraph />

                        </div>
                    </div>

                </div>
            </div>
        );

    }


}

export default HeadbandsLastResults;