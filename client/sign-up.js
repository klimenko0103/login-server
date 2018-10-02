import React, { Component } from 'react';
import * as md5 from 'js-md5';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        var email = props.email ||'';
        var EmailIsValid = this.validateEmail(email);
        var login = props.login || '';
        var LoginIsValid = this.validateLogin(login);
        var password = props.password ||'';
        var PasswordIsValid = this.validatePassword(password);
        this.state = {
            name:'',
            age:'',
            emailValid: EmailIsValid,
            email: email,
            login: login,
            loginValid: LoginIsValid,
            password: password,
            passwordValid: PasswordIsValid
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    validateEmail(email){
        if (email.trim().length > 0) {
            return true;
        }
        return false;
    }
    validateLogin(login) {
        if (login.trim().length > 0) {
            return true;
        }
        return false;
    }

    validatePassword(password){
        if (password.trim().length > 0) {
            return true;
        }
        return false;
    }

    handleEmailChange(e) {
        var val = e.target.value;
        var valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    }
    handleLoginChange(e) {
        var val = e.target.value;
        var valid = this.validateLogin(val);
        this.setState({login: val, loginValid: valid});
    }
    handlePasswordChange(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }
    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handleAgeChange(e){
        this.setState({age:e.target.value})
    }

    signup(){
        localStorage.setItem('locpassword',md5(this.state.password || ''));
        localStorage.setItem('locname',this.state.name || '');
        localStorage.setItem('locage',this.state.age || '');
        localStorage.setItem('locemail',this.state.email || '');
        localStorage.setItem('loclogin',this.state.login || '');
        var  localValue = localStorage.getItem('locpassword');
        console.log(localValue);
    }

    render() {
        var emailColor = (this.state.emailValid===true)?"green":"red" ;
        var loginColor = (this.state.loginValid===true)?"green":"red" ;
        var passwordColor = (this.state.passwordValid===true)?"green":"red" ;

        return (
            <div className="forms">
                <div >
                    <form action="#" id="signup">
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="name"  onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" autoFocus />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAge">Age</label>
                            <input type="age" onChange={this.handleAgeChange} id="inputAge" className="form-control" placeholder="Age" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail"> Email address</label>
                            <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required style={{borderColor:emailColor}} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLogin">Login</label>
                            <input type="login" onChange={this.handleLoginChange} id="inputLogin" className="form-control" placeholder="Login" required style={{borderColor:loginColor}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword"> Password</label>
                            <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required style={{borderColor:passwordColor}}/>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.signup.bind(this)} type="button" disabled={!this.state.email| !this.state.login | !this.state.password}> Sign Up </button>
                    </form>
                </div>
            </div>
        )
    }
}



