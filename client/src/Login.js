import React, { Component } from 'react';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        let self = this;
        let email = this.email.value;
        let password = this.password.value;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            dataType: 'json',
            url: '/api/login',
            // why async? to update this code
            async : false,
            success: function (json) {
                self.props.history.push('/tasks');
            },
            error: function (e) {
                // handle this
            }
        })
    }

    render() {
        return (
            <div>
                <h5>Login</h5>

                <form onSubmit={(e) => this.handleLogin(e)}>
                    <input ref={(input) => this.email = input} type="email" placeholder="Email" />
                    <input ref={(input) => this.password = input} type="password" placeholder="Password" />

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;