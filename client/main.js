import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './log-in';
import SignUp from './sign-up';
import Edit from './profile';
import Homes from './homes';


export default class Main extends Component
{
    constructor() {
        super();
        // console.log(11111111111111111)
        this.state = {
            extraClass1: 'active',
            extraClass2: '',
            extraClass3: 'active',
            extraClass4: '',

            isOnline:null,
            // online: localStorage.getItem('online')||""
        }
    }

    ActiveForm(str){
        str === 'log' ? this.setState({extraClass1: 'active', extraClass2: ''}) : this.setState({extraClass1: '', extraClass2: 'active'});
    }
    ActiveForm2(str){
        str === 'profile' ? this.setState({extraClass3: 'active', extraClass4: ''}) : this.setState({extraClass3: '', extraClass4: 'active'});
    }

    changeUser(user) {
        // console.log(user);
        this.setState({isOnline: user});
    }

    outUser(user){
        localStorage.setItem('online',JSON.stringify(!user));
        this.setState({isOnline:!user});
        // console.log(this.state.isOnline);
        this.setState({extraClass1:'active',extraClass2:'',extraClass3:'active',extraClass4:''})
    }

    componentDidMount(){
        var storageUser = localStorage.getItem('online');
        // console.log('sjcksd',storageUser);
        if (storageUser) {
            try {
                this.setState({isOnline: JSON.parse(storageUser)});
            } catch (e) {
                console.warn('Can not parse user', e)
                localStorage.removeItem('online');
            }
        }
    }


    render()
    {
        var extraClass1 = this.state.extraClass1;
        var extraClass2 = this.state.extraClass2;
        var extraClass3 = this.state.extraClass3;
        var extraClass4 = this.state.extraClass4;

        var user = this.state.isOnline;
        // console.log(user);
        // console.log(this.state.online);
        // console.log('TETE',user);


        return (
            <div className="f">
                <Router>
                    <div >
                        <div className="forms1">
                            <div >
                                <ul className="nav nav-tabs nav-justified">
                                    {!user && <li className={"tab " + extraClass1} onClick={this.ActiveForm.bind(this, 'log')}><Link to={'/'}>Log In</Link></li>}
                                    {!user &&<li className={"tab " + extraClass2} onClick={this.ActiveForm.bind(this, 'sign')}><Link to={'/sign-up'}>Sign Up</Link></li>}
                                    {user && <li className={"user " + extraClass3} onClick={this.ActiveForm2.bind(this, 'profile')}> <Link to={'/profile'}><img src={require('./2.png')} alt="profiles" height="36"/></Link></li>}
                                    {user &&<li className={"tab "+ extraClass4} onClick={this.ActiveForm2.bind(this, 'homes')}><Link to={'/homes'}>Homes</Link></li>}
                                    {user &&<li className={"tab " } onClick={this.outUser.bind(this)} ><Link to={'/'}>logout</Link></li>}
                                </ul>
                            </div>
                        </div>
                    <Switch>
                        <Route exact path="/" render={() => (
                            (user) ? (
                                <Redirect to="/profile"/>
                            ) : (
                                <Login onChange={this.changeUser.bind(this)} />
                            )
                        )}/>
                        <Route exact path='/homes' component={Homes} />
                        <Route exact path='/sign-up' component={SignUp} />
                        <Route exact path='/profile' component={Edit} />
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
