import React, { Fragment } from 'react';
import axios from 'axios';
import { RouteProps } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

interface MyProps {
    //api: Api
}

interface MyState {
    //someString: string,
    //loading: boolean
}

export default class Add extends React.Component<MyProps & RouteProps, MyState> {
    static counter = 1;

    constructor(props) {
        
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            age: "",
            id: Add.counter
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    
    handleSubmit() {
        console.log("Axios Add");

        if (this.state["first_name"] === "" || this.state["last_name"] === "" || this.state["email"] === "" || this.state["age"] === "") {
            alert("Please make sure ALL fields are filled out properly");
            return;
        }
        axios.post('http://localhost:3001/add', {
            "first_name": this.state["first_name"],
            "last_name": this.state["last_name"],
            "email": this.state["email"],
            "age": this.state["age"],
            "id": this.state["id"]
        }).then(res => {
            console.log(this.state['id']);
            Add.counter++;
            this.setState({id: Add.counter}, () => {
                console.log(this.state['id']);
                alert("Employee added");
                console.log("Employee added");
                window.location.href = "/";
            });
        }).catch(e => alert(e));
            
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }


    render() {
        return(
            <Fragment>
                <h2>Add Employee</h2>
                <div>
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
                    <a href='/'><input type="submit" value="Submit" onClick={() => this.handleSubmit()} /></a>
                    &nbsp;&nbsp;
                    <a href='/'><input type="button" value="Cancel"/></a>
                </form>
                </div>
            </Fragment>
        );
    }
    
}