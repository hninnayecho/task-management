import React from 'react';
//import $ from 'jquery';
import axios from 'axios';
import { Col, Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
          };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        let self = this;
        let email = self.state.email;
        let password = self.state.password;
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
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    render() {
        return (
            <Form horizontal onSubmit={(e) => this.handleLogin(e)}>
                <Col smOffset={1} sm={10}>
                    <h3 >Login Form</h3></Col>
                <FormGroup controlId="email">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
            </Col>
                    <Col sm={3}>
                        <FormControl type="email" placeholder="Email" onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
            </Col>
                    <Col sm={3}>
                        <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Link to='/signup'>Users</Link>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default Login;