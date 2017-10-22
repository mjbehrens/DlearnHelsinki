import React from "react";


class AddStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            getStudentSelected : true,
            createStudentSelected : false,
        }
    }

    componentDidMount(){
        document.getElementById('create').checked = true; 
    }

    renderExistedStudent = function () {
        let lst = this.props.allStudentsList;
        console.log(lst);
        let options = [];
        if (lst != null) {
            options.push(<option value={null}> {"default"} </option>);
            lst.forEach(function (s) {
                options.push(<option value={s._id}> {s.username} </option>)
            });
        }
        return (
            <select hidden={this.state.getStudentSelected} defaultValue={null} onChange={this.props.onChangeSelect}>
                {options}
            </select>
        )
    }

    renderCreateNewStudent = function () {
        return (
            <div hidden={this.state.createStudentSelected}>
                <h6>Username:</h6><input type="text" placeholder={this.props.username}
                    onChange={this.props.onChangeUsername} />
                <h6>Gender:</h6>
                <select onChange={this.props.onChangeGender}>
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <h6>Age:</h6><input type="number" min={1} max={99} placeholder={this.props.age}
                    onChange={this.props.onChangeAge} />
                <h6>Password:</h6><input type="text" placeholder={this.props.password}
                    onChange={this.props.onChangePassword} />
                <p className="bg-warning">Please make sure you give the password to the student before closing this windows</p>
            </div>
        )
    }

    renderFrom =  function (e)  {

        /*
        * UNCOMMENT WHEN BACK END READY TO SUPPORT ASS ALREADY EXISTING STUDENTS
        if(e.target.id==="get"){
            let checkGet = e.target;            
            let checkCreate = document.getElementById('create');
            if(checkGet.checked){
                checkCreate.checked = false;
            }else{
                checkCreate.checked = true;
            }  
        }else if (e.target.id==="create"){
            let checkGet = document.getElementById('get');            
            let checkCreate = e.target;
            if(checkCreate.checked){
                checkGet.checked = false;
            }else{
                checkGet.checked = true;
            }    
        }
        
        
        this.setState({
            getStudentSelected : !document.getElementById('get').checked,
            createStudentSelected : !document.getElementById('create').checked,
            
        })
        */
        
    }

    render() {
        return (
            <div>
                
                {
                /*        * UNCOMMENT WHEN BACK END READY TO SUPPORT ASS ALREADY EXISTING STUDENTS
                    <input type="checkbox" id="get" value={1} onChange={this.renderFrom.bind(this)} /> Get student <br />
                   this.renderExistedStudent()
                
                <br/> 
                <hr wight='2px'/>
                <br/>
                */
                }
                <input type="checkbox" id="create" value={2} onChange={this.renderFrom.bind(this)} /> Create a new student <br />
                {this.renderCreateNewStudent()}
            </div>
        )


    }
}


export default AddStudent;