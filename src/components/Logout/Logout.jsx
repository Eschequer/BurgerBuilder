import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authLogout } from "../../store/actions";

function Logout() {
  useEffect(() => {
    dispatch(authLogout());
  }, []);

  const dispatch = useDispatch();
  return <Redirect to="/" />;
}

export default Logout;
