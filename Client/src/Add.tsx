import React, { Fragment } from 'react';
import axios from 'axios';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import './Add.css';
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
            id: 4,
            department: "",
            location: "",
            phone: ""
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
            "id": this.state["id"],
            "department": this.state['department'],
            "phone": this.state['phone'],
            "location": this.state['location']
        }).then((res) => {
            console.log(this.state['id']);
            Add.counter++;
            console.log(this.state['id']);
            alert("Employee successfully added");
            console.log("Employee added");
            window.location.href = "/";
            this.setState({id: Add.counter}, () => {
                
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
                    <label>First Name:</label><br />
                    <input type="text" name="first_name" id="firstname" value={this.state['first_name']} onChange={this.handleChange}/>
                    <br />
                    <label>Last Name:</label><br />
                    <input type="text" name="last_name" id="lastname" value={this.state['last_name']} onChange={this.handleChange}/>
                    <br />
                    <label>E-Mail:</label><br />
                    <input type="text" name="email" id="email" value={this.state['email']} onChange={this.handleChange} />
                    <br />
                    <label>Age:</label><br />
                    <input type="text" name="age" id="age" value={this.state['age']} onChange={this.handleChange} />
                    <br />
                    <label>Phone Number:</label><br />
                    <input type="text" name="phone" id="phone" value={this.state['phone']} onChange={this.handleChange}/>
                    <br />
                    <label>Location:</label><br />
                    <input type="text" name="location" id="location" value={this.state['location']} onChange={this.handleChange}/>
                    <br />
                    <label>Department:</label><br />
                    <select value={this.state['department']} name="department" id="department" onChange={this.handleChange}>
                        <option value="IFS">IFS - Internal Firm Services</option>
                        <option value="ASR">ASR - Assurance</option>
                    </select>
                    <br />
                    <Link to='/'><input type="submit" value="Submit" onClick={() => this.handleSubmit()} /></Link>
                    &nbsp;&nbsp;
                    <a href='/'><input type="button" value="Cancel"/></a>
                </form>
                </div>
            </Fragment>
        );
    }
    
}