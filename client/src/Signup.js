import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Col, Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        };
        this.handleSignup = this.handleSignup.bind(this);
    }
    handleSignup(e) {
        e.preventDefault();
        let self = this;
        let username = self.state.username;
        let email = self.state.email;
        let password = self.state.password;
        axios
        .post("/api/signup", {
            username,
            email,
            password
        })
        .then(function (response) {
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
            <Form horizontal onSubmit={(e) => this.handleSignup(e)}>
                <Col smOffset={1} sm={10}>
                    <h3 >User Registration Form</h3></Col>

                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        UserName
                </Col>
                    <Col sm={3}>
                        <FormControl type="text" placeholder="Username" onChange={this.handleChange} />
                    </Col>
                </FormGroup>
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
                        <Button type="submit">Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
export default Register;