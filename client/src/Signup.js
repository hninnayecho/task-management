import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
    }
    handleSignup(e) {
        e.preventDefault();
        let self = this;
        let username = self.username.value;
        let email = self.email.value;
        let password = self.password.value;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username:username, email: email, password: password }),
            dataType: 'json',
            url: '/api/signup',
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
                <h5>Register</h5>
                <form onSubmit={(e) => this.handleSignup(e)}>
                    <input ref={(input) => this.username = input} type="text" placeholder="UserName" />
                    <input ref={(input) => this.email = input} type="email" placeholder="Email" />
                    <input ref={(input) => this.password = input} type="password" placeholder="Password" />
                    <button type="submit">Sign-up</button>
                </form>
            </div>
        );
    }
}
export default Register;