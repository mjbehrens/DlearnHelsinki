import React, { Component } from 'react';

class ClassSelection extends Component {
    
    render() {
        return (
            <div className="App">
                <h1>Select a Class</h1>
                <div className="row">
                    <div className="btn-group-horisontal">
                        <button type="button" className="btn btn-primary">Math 1</button>
                        <button type="button" className="btn btn-primary">Math 2</button>
                        <button type="button" className="btn btn-primary">Math 5</button>
                    </div>
                    <div className="btn-group-horisontal">
                        <button type="button" className="btn btn-primary">Math 8</button>
                        <button type="button" className="btn btn-primary">Math 12</button>
                        <button type="button" className="btn btn-primary">Math 21</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassSelection;