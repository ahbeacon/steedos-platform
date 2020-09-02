import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import { getTenant, getSettings } from '../selectors';
import Navbar from './Navbar';

import { accountsClient, accountsRest } from '../accounts';


const Home = ({ history, settings, tenant, location }: any) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCookie = (name: string) => {
    let pattern = RegExp(name + "=.[^;]*")
    let matched = document.cookie.match(pattern)
    if(matched){
        let cookie = matched[0].split('=')
        return cookie[1]
    }
    return ''
  }

  const fetchUser = async () => {
    // refresh the session to get a new accessToken if expired
    const tokens = await accountsClient.refreshSession();
    if (!tokens) {
      history.push('/login');
      return;
    }
    const data = await accountsRest.authFetch( 'user', {});
  
    if (!data) {
      history.push('/login');
      return;
    }
    setUser(data);
    if(!data.spaces || data.spaces.length === 0){
      
    }else{
      const searchParams = new URLSearchParams(location.search);
      let redirect_uri = searchParams.get("redirect_uri");
      if (redirect_uri){
        if(!redirect_uri.startsWith("http://") && !redirect_uri.startsWith("https://")){
          redirect_uri = window.location.origin + redirect_uri
        }
        let u = new URL(redirect_uri);
        u.searchParams.append("token", tokens.accessToken);
        u.searchParams.append("X-Auth-Token", getCookie('X-Auth-Token'));
        u.searchParams.append("X-User-Id", getCookie('X-User-Id'));
        window.location.href = u.toString();
      }
    }
  };

  const onLogout = async () => {
    await accountsClient.logout();
    history.push('/login');
  };

  const onHome = async () => {
    window.location.href = settings.root_url ? settings.root_url : "/";
  };

  if (!user) {
    return null;
  }
  return (
    <div>
      <Navbar user={user}/>
      {/* <h4>
        <FormattedMessage
            id='accounts.welcome'
            defaultMessage='Welcome' 
        /> {user.email || user.name}
      </h4>
      {!(!user.spaces || user.spaces.length === 0) && <Button onClick={onHome} variant="contained" color="primary">
        <FormattedMessage
            id='accounts.home'
            defaultMessage='Home' 
        /> 
      </Button>
      }
      {(!user.spaces || user.spaces.length === 0) && <Typography variant="body2" gutterBottom><FormattedMessage
            id='accounts.notFindSpaces'
            defaultMessage='您没有所属公司，请联系系统管理员' 
          /></Typography>
      }
      <br/>
      <Button onClick={onLogout}>
        <FormattedMessage
            id='accounts.logout'
            defaultMessage='Logout' 
        /> 
      </Button> */}
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    tenant: getTenant(state),
    settings: getSettings(state),
  };
}

export default connect(mapStateToProps)(Home);