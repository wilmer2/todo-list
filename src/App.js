import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { typeDefs, resolvers } from './utils/clientSchema';

import Layout from './layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

const client = new ApolloClient({
  uri: 'https://api.8base.com/ckbgxchq4000207md19u190fk',
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
