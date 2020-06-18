import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Object.entries(user).length>0) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({ user: state.user.user });
export default connect(mapStateToProps)(ProtectedRoute);
