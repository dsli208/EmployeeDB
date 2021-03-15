import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Add from './Add';
import { confirmAlert } from 'react-confirm-alert'; // Import

export default class App extends React.Component {
  state = {
    //data: [{"First Name": "David", "Last Name": "Li", "Email": "david.c.li@pwc.com", "Age": 18, "ID": 1}, {"First Name": "David", "Last Name": "Lee", "Email": "david.c.lee@pwc.com", "Age": 19, "ID": 2}]
    data: []
  }

  confirmDelete = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to delete this employee?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  componentDidMount() {
    console.log("Axios");
    axios.get('http://localhost:3001/employees')
      .then(res => {
        console.log(res.data);
        const employees = res.data;
        this.setState({ data: employees });
        console.log(this.state.data);
    }).catch(e => console.log(e));

  }

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/">
            <h2>Employees</h2>
            <a href='/add'>Add New Employee</a>
            <br />
            <br />
            <table>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>E-Mail</th>
                <th>Age</th>
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
                      <td><a href='/edit'>Edit</a></td>
                      <td><a href='/remove'>Remove</a></td>
                    </tr>
                  );
              })}
            </table>
          </Route>
          <Route path="/home">
            <a href='/add'>Add</a>
            &nbsp;&nbsp;
            <a href='/remove'>Remove</a>
            <br />
            <table>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>E-Mail</th>
                <th>Age</th>
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
                    </tr>
                  );
              })}
            </table>
          </Route>
          
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

//export default App;
