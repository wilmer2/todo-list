import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import I18n from 'i18n-js';
import translations from './translations';
import { typeDefs, resolvers } from './utils/clientSchema';

import Layout from './layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

I18n.translations = translations;
I18n.locale = 'es';

const client = new ApolloClient({
  uri:  `https://api.8base.com/${process.env.REACT_APP_TOKEN_ID ? process.env.REACT_APP_TOKEN_ID: 'ckbq678e0000207kzc4rt1en2'}`,
  typeDefs,
  resolvers,
  request(operation) {
    const token = localStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  onError(error) {
    console.log('error', error);
  }
});


console.log(`https://api.8base.com/${process.env.REACT_APP_TOKEN_ID ? process.env.REACT_APP_TOKEN_ID: 'ckbq678e0000207kzc4rt1en2'}`);

const initialData = {
  isLoggedIn: false,
};


client.writeData({data : initialData });

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />  
        <Route exact path='/register' component={Register} />
        <Layout>
          <Route exact path='/home' component={Home} />
        </Layout>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
