import React, { Fragment } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import { useParams, match } from 'react-router-dom';
import { RouteProps } from 'react-router';

interface MyProps {
    //api: Api
}

interface MyState {
    //someString: string,
    //loading: boolean
}

export default class Edit extends React.Component<MyProps & RouteProps, MyState> {
    
    constructor(props) {
        super(props);
        
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            age: "",
            id: 4
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit() {
        console.log("Axios Edit");
        var id = this.props.match.params.id;

        if (this.state["first_name"] === "" || this.state["last_name"] === "" || this.state["email"] === "" || this.state["age"] === "") {
            alert("Please make sure ALL fields are filled out properly");
        }
        axios.post(`http://localhost:3001/user/${id}/update`, {
            "first_name": this.state["first_name"],
            "last_name": this.state["last_name"],
            "email": this.state["email"],
            "age": this.state["age"]
            //"id": this.state["id"]
        })
          .then(res => {
            alert("Employee added");
            console.log("Employee added");
        }).catch(e => alert(e));
            
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      componentDidMount() {
        console.log("Axios");
        var props = this.props;
        console.log(props);
        var id = props.match.params.id;
        console.log(id);
        axios.get(`http://localhost:3001/user/${id}`)
          .then(res => {
            console.log(res.data.employee);
            const employee = res.data.employee;
            this.setState({first_name: employee['First Name'], last_name: employee['Last Name'], email: employee['Email'], age: employee['Age']});
            console.log(this.state);
        }).catch(e => console.log(e));
    
      }

    render() {
        return(
            <Fragment>
                <h2>Edit Employee: </h2>

                <form>
                    <label>
                        First Name:
                        &nbsp;&nbsp;
                        <input type="text" name="first_name" id="firstname" value={this.state['first_name']} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Last Name:
                        &nbsp;&nbsp;
                        <input type="text" name="last_name" id="lastname" value={this.state['last_name']} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        E-Mail:
                        &nbsp;&nbsp;
                        <input type="text" name="email" id="email" value={this.state['email']} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Age:
                        &nbsp;&nbsp;
                        <input type="text" name="age" id="age" value={this.state['age']} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" onClick={() => this.handleSubmit()} />
                    &nbsp;&nbsp;
                    <a href='/'><input type="button" value="Cancel"/></a>
                </form>
            </Fragment>
        );
    }
}