import React, { Fragment } from 'react';
import Link from 'react-router-dom';

export default class Edit extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Edit Employee</h2>
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
                    <input type="button" value="Cancel"/>
                    
                </form>
            </Fragment>
        );
    }
}