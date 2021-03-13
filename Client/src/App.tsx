import React, {Fragment} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    //data: [{"First Name": "David", "Last Name": "Li", "Email": "david.c.li@pwc.com", "Age": 18, "ID": 1}, {"First Name": "David", "Last Name": "Lee", "Email": "david.c.lee@pwc.com", "Age": 19, "ID": 2}]
    data: []
  }

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
      <a href='/'>Add</a>
      <a href='/'>Remove</a>
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

      <br />
      
      </Fragment>
    );
  }
}

//export default App;
