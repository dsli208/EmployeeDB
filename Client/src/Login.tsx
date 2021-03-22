import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <Fragment>
                <h2>Login</h2>
                <form>
                    <label>Username:</label><br />
                    <input type="text" name="username" id="username" value={this.state['username']} onChange={this.handleChange}/>
                    <br />
                    <label>Password:</label><br />
                    <input type="password" name="password" id="password" value={this.state['password']} onChange={this.handleChange}/>
                    <br />
                    <Link to='/'><input type="submit" value="Log In" onClick={() => this.handleSubmit()} /></Link>
                    &nbsp;&nbsp;
                    <a href='/register'><input type="button" value="Sign Up"/></a>
                    <br />
                    <a href='/'><input type="button" value="Back"/></a>
                    <br />
                </form>
            </Fragment>
        );
    }
}