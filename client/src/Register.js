import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        let self = this;
        let username = self.username.value;
        let email = self.email.value;
        let password = self.password.value;

        axios
        .post("/api/register", {
            username,
            email,
            password
        })
        .then(function (response) {
          console.log(response);
          self.props.history.push('/tasks');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h5>Register</h5>

                <form onSubmit={(e) => this.handleLogin(e)}>
                    <input ref={(input) => this.username = input} type="text" placeholder="UserName" />
                    <input ref={(input) => this.email = input} type="email" placeholder="Email" />
                    <input ref={(input) => this.password = input} type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;