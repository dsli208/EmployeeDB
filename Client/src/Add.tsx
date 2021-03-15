import React, { Fragment } from 'react';

export default class Add extends React.Component {
    render() {
        return(
            <Fragment>
                <h2>Add Employee</h2>

                <form>
                    <label>
                        First Name:
                        &nbsp;&nbsp;
                        <input type="text" name="first_name" />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        &nbsp;&nbsp;
                        <input type="text" name="last_name" />
                    </label>
                    <br />
                    <label>
                        E-Mail:
                        &nbsp;&nbsp;
                        <input type="text" name="email" />
                    </label>
                    <br />
                    <label>
                        Age:
                        &nbsp;&nbsp;
                        <input type="text" name="age" />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                    &nbsp;&nbsp;
                    <a href='/'><input type="button" value="Cancel"/></a>
                </form>
            </Fragment>
        );
    }
    
}