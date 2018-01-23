import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        let self = this;
        let email = this.email.value;
        let password = this.password.value;
        axios
            .post("/api/login", {
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
                <h5>Login</h5>

                <form onSubmit={(e) => this.handleLogin(e)}>
                    <input
                        ref={input => (this.email = input)}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        ref={input => (this.password = input)}
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
                <br />
                <Link to='/signup'>Users</Link>
            </div>
        );
    }
}

export default Login;