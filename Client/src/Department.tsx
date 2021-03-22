import React, {Fragment} from 'react';
import axios from 'axios';
import { RouteProps } from 'react-router';
import {Link} from 'react-router-dom';

interface MyProps {
    //api: Api
}

interface MyState {
    //someString: string,
    //loading: boolean
}

export default class Department extends React.Component<MyProps & RouteProps, MyState> {
    state = {
        dept: "",
        data: []
    }

    confirmDelete(id) {
        if (window.confirm('Are you sure you want to delete this employee?')) {
          // Save it!
          axios.delete(`http://localhost:3001/user/${id}`)
          .then(res => {
            console.log(res);
            console.log("Deleted successfully");
            window.location.reload();
          })
        } else {
          // Do nothing!
        }
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

    componentDidMount() {
        console.log("Axios");
        var props = this.props;
        console.log(props);
        var name = props.match.params.name;
        axios.get(`http://localhost:3001/dept/${name}`)
          .then(res => {
            console.log(res.data);
            const employees = res.data;
            this.setState({ dept: name, data: employees });
            console.log(this.state.data);
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <Fragment>
            <h2>Department: {this.getDepartment(this.state.dept)}</h2>
            <a href='/add'><input type="button" value="Add New Employee"/></a>
            <br />
            <br />
            <table style={{alignItems: 'center'}}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-Mail</th>
                <th>Age</th>
                <th>Department</th>
                <th>Location</th>
              </tr>
              <tr>
                <td>{this.state.data['First Name']}</td>
                <td>{this.state.data['Last Name']}</td>
                <td>{this.state.data['Email']}</td>
                <td>{this.state.data['Age']}</td>
              </tr>
              {this.state.data.map(( row, value ) => {
                  return (
                    <tr key={value}>
                      <td>{row['First Name']}</td>
                      <td>{row['Last Name']}</td>
                      <td>{row['Email']}</td>
                      <td>{row['Age']}</td>
                      <td>{row['Department']}</td>
                      <td>{row['Location']}</td>
                      <td></td>
                      <td><a href={`/user/` + row['_id']}><input type="button" value="..." id="user"/></a></td>
                      <td><a href={`/edit/` + row['_id']}><input type="button" value="Edit" id="edit"/></a></td>
                      <td><Link to='/' onClick={() => this.confirmDelete(row['_id'])}><input type="button" value="Delete" id="delete"/></Link></td>
                    </tr>
                  );
              })}
            </table>
            <br />
            <a href='/'><input type="button" value="Back"/></a>
            </Fragment>
        );
    }
}