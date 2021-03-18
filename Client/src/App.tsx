import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Add from './Add';
import Edit from './Edit';
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
//import './bootstrap.min.css';

export default class App extends React.Component {
  static counter = 1;
  state = {
    //data: [{"First Name": "David", "Last Name": "Li", "Email": "david.c.li@pwc.com", "Age": 18, "ID": 1}, {"First Name": "David", "Last Name": "Lee", "Email": "david.c.lee@pwc.com", "Age": 19, "ID": 2}]
    data: []
  }

  /*confirmDelete = () => {
    console.log("Confirm Delete");
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
  };*/

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

  componentDidMount() {
    console.log("Axios");
    axios.get('http://localhost:3001/employees')
      .then(res => {
        console.log(res.data);
        const employees = res.data;
        this.setState({ data: employees });
        console.log(this.state.data);
        App.counter = this.state.data.length;
    }).catch(e => console.log(e));

  }

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
          <Route path="/edit/:id" component={(props) => <Edit {...props}/>}>
          </Route>
          <Route path="/add" component={(props) => <Add {...props}/>}>
            
          </Route>
          <Route path="/">
            <h2>Employee DB</h2>
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
                      <td>IFS</td>
                      <td><a href={`/edit/` + row['_id']}><input type="button" value="Edit" id="edit"/></a></td>
                      <td><Link to='/' onClick={() => this.confirmDelete(row['_id'])}><input type="button" value="Delete" id="delete"/></Link></td>
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
