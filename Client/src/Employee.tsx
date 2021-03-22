import React, {Fragment} from 'react';
import axios from 'axios';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

interface MyProps {
    //api: Api
}

interface MyState {
    //someString: string,
    //loading: boolean
}

export default class Employee extends React.Component<MyProps & RouteProps, MyState> {
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
            this.setState({first_name: employee['First Name'], last_name: employee['Last Name'], email: employee['Email'], age: employee['Age'], phone: employee['Phone Number'], location: employee['Location'], department: employee['Department']});
            console.log(this.state);
        }).catch(e => console.log(e));
    
    }

    getDepartment(department) {
        if (department === "ifs" || department === "IFS") {
            return "Internal Firm Services (IFS)";
        }
        else if (department === "asr" || department === "ASR") {
            return "Assurance (ASR)";
        }
        else {
            return "";
        }
    }

    render() {
        return(
            <Fragment>
            <h2>Employee Information: {this.state['first_name']} {this.state['last_name']}</h2>
            <p><b>ID: </b>{this.props.match.params.id}</p><br />
            <p><b>Email: </b>{this.state['email']}</p><br />
            <p><b>Age: </b>{this.state['age']}</p><br />
            <p><b>Phone Number: </b>{this.state['phone']}</p><br />
            <p><b>Department: </b>{this.getDepartment(this.state['department'])}</p><br />
            <p><b>Location: </b>{this.state['location']}</p><br />

            <a href={'/edit/' + this.props.match.params.id}><input type="button" value="Edit Employee Details"/></a>
            &nbsp;&nbsp;
            <a href='/'><input type="button" value="Back"/></a>
            </Fragment>
        );
    }

}