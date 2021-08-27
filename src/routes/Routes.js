import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "../pages/login";
import Private from "./PrivateRoute";
import Auth from "./AuthRoute";
import Dashboard from "../pages/dashboard";
import TextModeration from "../pages/textModeration";
import Accounts from "../pages/accounts";
import Channels from "../pages/channels";
import Overview from "../pages/overview";
import Users from "../pages/users";
import Messages from "../pages/messages";
import ImageModeration from "../pages/imageModeration";

const Routes = () => (
  <BrowserRouter basename="/moderation-dashboard">
    <Switch>
      <Auth path="/" exact component={Login} />
      <Private path="/accounts" exact component={Accounts} />
      <Private path="/dashboard" exact component={Dashboard} />
      <Private path="/text-moderation" exact component={TextModeration} />
      <Private path="/channels" exact component={Channels} />
      <Private path="/overview" exact component={Overview} />
      <Private path="/users" exact component={Users} />
      <Private path="/channels/messages" exact component={Messages} />
      <Private path="/image-moderation" exact component={ImageModeration} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
