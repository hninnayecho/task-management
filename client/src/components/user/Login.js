import React from 'react';
import axios from 'axios';
import { Col, Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Form.css'

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
            <div className="container">
            <Form className="form" horizontal onSubmit={(e) => this.handleLogin(e)}>
                <Col smOffset={2} sm={10}>
                    <h3 >Login Form</h3>
                </Col>
                <FormGroup controlId="email">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={12}>
                        <FormControl type="email" placeholder="Email" onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={12}>
                        <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button className="btn" type="submit">Sign in</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        Not Register! <Link className="link" to='/signup'>Create an account</Link>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        );
    }
}

export default Login;