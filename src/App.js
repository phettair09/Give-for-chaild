import logo from './logo.svg';
import './App.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Front

import Header from './components/Header';
import Home from './pages/Home';
import Activity from './pages/Activity';
import Booking from './pages/Booking';
import Donate from './pages/Donate';
import ActivityList from './pages/ActivityList';
import ActivityDetail from './pages/ActivityDetail';
import Profile from './pages/Profile';

import Login from './pages/Login';
import GetLogin from './pages/module/getlogin';
import DonateForm from './pages/DonateForm';

// BackOffice

import Member from './backoffice/Member';
import ActivityBack from './backoffice/ActivityBack';
import HeaderBackend from './backoffice/components/HeaderBackend';
import CreateActivity from './backoffice/CreateActivity';
import DonateBack from './backoffice/DonateBack';
import JoinActivity from './backoffice/JoinActivity';

import BookingBack from './backoffice/BookingBack';
import ActivityEdit from './backoffice/Activity-edit';
import LoginAdmin from './backoffice/LoginAdmin';
import RegisterAdmin from './backoffice/RegisterAdmin';
import PageTest from './pages/PageTest';
import CreateFoundation from './backoffice/CreateFoundation';
import AdminFoundation from './backoffice/AdminFoundation';
import CreateAdmin from './backoffice/CreateAdmin';
import Foundation from './backoffice/Foundation';
import Catagory from './backoffice/Foundation-catagory';
import Option from './backoffice/Foundation-option';
import GenerateJson from './backoffice/GenerateJson'
import axios from 'axios';

// axios.defaults.baseURL = 'https://give-for-child.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:3001/';

const PrivateAdmin = () => {
    return (
        <Route>
            <HeaderBackend></HeaderBackend>
            <Switch>
                <Route path='/backend/member' exact component={Member} />
                <Route path='/backend/admin-login' exact component={LoginAdmin} />
                <Route path='/backend/activity-back' exact component={ActivityBack} />
                <Route path='/backend/create-activity' exact component={CreateActivity} />
                <Route path='/backend/donate-back' exact component={DonateBack} />
                <Route path='/backend/booking-back' exact component={BookingBack} />
                <Route path='/backend/activity-edit/:id' exact component={ActivityEdit} />
                <Route path='/backend/join-activity' exact component={JoinActivity} />
                <Route path='/backend/generate-json' exact component={GenerateJson} />
                <Route path='/backend/foundation' exact component={Foundation} />
                <Route path='/backend/foundation/:name' exact component={Catagory} />
                <Route path='/backend/foundation/:foundation/:name' exact component={Option} />
                <Route path='/backend/create-foundation' exact component={CreateFoundation} />
                <Route path='/backend/admin-foundation' exact component={AdminFoundation} />
                <Route path='/backend/create-admin' exact component={CreateAdmin} />
                <Route
                    path='/backend/logout'
                    component={() => {
                        localStorage.clear();
                        window.location.replace('/backend/login');
                    }}
                />
            </Switch>
        </Route>
    );
};

const isAuthenticated = localStorage.getItem('admin_id') ? true : false;
console.log(isAuthenticated);

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/backend/adminregister' component={RegisterAdmin} />
                {/* <Route path='/pageTest' component={PageTest} /> */}
                <Route path='/pagetest' component={PageTest} />
                <Route path='/backend/:path'>{isAuthenticated ? <PrivateAdmin /> : <LoginAdmin />}</Route>
                <Route path='/backend' component={LoginAdmin} />

                <Route>
                    <Header></Header>
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route
                            path='/logout'
                            component={() => {
                                localStorage.clear();
                                window.location.replace('/');
                            }}
                        />
                        <Route path='/activity' component={Activity} />
                        <Route path='/booking' component={Booking} />
                        <Route path='/donate' component={Donate} />
                        <Route path='/activity-list' component={ActivityList} />
                        <Route path='/activity-detail/:id' component={ActivityDetail} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/donate-form' component={DonateForm} />
                        <Route path='/getlogin' component={GetLogin} />
                        <Route component={Home}></Route>
                    </Switch>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
