import React, { Component } from 'react';
import * as md5 from "js-md5";

export default class Edit extends Component {

    constructor(props) {
        super(props);
        // var gender = props.gender;
        // var genderIsValid = this.validateGender(gender);
        var password = props.password || '';
        var PasswordIsValid = this.validatePassword(password);
        var name = props.name||'';
        var NameIsValid = this.validateName(name);
        var age = props.age|| '';
        var AgeIsValid = this.validateAge(age);
        this.state = {
            name:localStorage.getItem('locname'),
            nameValid:NameIsValid,
            age:localStorage.getItem('locage'),
            ageValid: AgeIsValid,
            gender:null,
            // genderValid: genderIsValid,
            password: password,
            passwordValid: PasswordIsValid

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // validateGender(gender){
    //     return (!gender);
    // }
    validatePassword(password){
        if (password.trim().length > 0) {
            return true;
        }
        return false;
    }
    validateAge(age){
        if (age.trim().length > 0) {
            return true;
        }
        return false;
    }
    validateName(name){
        if (name.trim().length > 0) {
            return true;
        }
        return false;
    }



    handleGenderChange(e) {
        var val = e.target.value;
        // console.log(val)
        this.setState({gender: val});
        // console.log(this.state.gender)

    }
    
    handlePasswordChange(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }
    handleNameChange(e){
        var val = e.target.value;
        // console.log(val)
        var valid = this.validateName(val);
        this.setState({name: val, nameValid: valid})
        // console.log(this.state.name)

    }
    handleAgeChange(e){
        var val = e.target.value;
        var valid = this.validateAge(val);
        this.setState({age: val, ageValid: valid});

    }


    edit(){
        localStorage.setItem('locpassword',md5(this.state.password || ''));
        localStorage.setItem('locname',this.state.name || '');
        localStorage.setItem('locage',this.state.age || '');
        localStorage.setItem('locgender',this.state.gender || '');

        // var  localValue = localStorage.getItem('locpassword');
        // console.log(localValue);
        // console.log(this.state.gender);
    }

    componentDidMount(){
        var radios = document.getElementsByName("inlineRadioOptions");
        // console.log(radios)
        var valloc = localStorage.getItem('locgender');
        // console.log(valloc)
        for(var i=0;i<radios.length;i++) {
            if (radios[i].value === valloc) {
                radios[i].checked = true;
                 // console.log(radios[i])
            }
        }

    }



    render() {
        var passwordColor = (this.state.passwordValid===true)?"green":"red" ;
        var nameColor = (this.state.nameValid===true)?"green":"red" ;
        var ageColor = (this.state.ageValid===true)?"green":"red" ;

        return (
            <div className="forms">
                <div >

                    <form action="#" id="edit">
                        <h1>Profile setup</h1>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="name" value={this.state.name} onChange={this.handleNameChange}  id="inputName" className="form-control"  autoFocus style={{borderColor:nameColor}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAge">Age</label>
                            <input type="age" value={this.state.age} onChange={this.handleAgeChange}  id="inputAge" className="form-control" style={{borderColor:ageColor}} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="input">Gender</label>
                            <div className="form-check form-check-inline">
                                <input onChange={this.handleGenderChange} className="form-check-input" name="inlineRadioOptions" type="radio"  id="Radios1" value="m"  />
                                <label className="form-check-label" htmlFor="Radios1">Man</label>
                                <input onChange={this.handleGenderChange} className="form-check-input" name="inlineRadioOptions" type="radio"  id="Radios2" value="w" />
                                <label className="form-check-label" htmlFor="Radios2">Women</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword"> Change password</label>
                            <input type="password" onChange={this.handlePasswordChange}  id="inputPassword" className="form-control" placeholder="Password" required style={{borderColor:passwordColor}}/>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.edit.bind(this)} type="button" disabled={!this.state.age || !this.state.gender || !this.state.name || !this.state.password}> Save </button>
                    </form>
            </div>
            </div>

        )
    }
}