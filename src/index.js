import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import { createStore } from 'redux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { logUser } from './actions';
import reducer from './reducers';
import { Provider } from 'react-redux';
import AdminView from './components/AdminView';
import AssetRequest from './components/AssetRequest';
import AssetApproval from './components/AssetApproval';
import AllAssets from './components/AllAssets';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {

    browserHistory.push('/app');
    const { email } = user;
    store.dispatch(logUser(email));
  } else {

  }
});

ReactDOM.render(
  <Provider store={store} >
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/empreq" component={AdminView} />
      <Route path="/empass" component={AllAssets} />
      <Route path="/request/:email" component={AssetRequest} />
      <Route path="/admin/:reqKey" component={AssetApproval} />
    </Router>
  </Provider>, document.getElementById('root'))
