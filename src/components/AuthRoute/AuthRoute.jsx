import Login from "../Users/Forms/Login";

function AuthRoute({ children }) {
  //get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  return <>{isLoggedIn ? children : <Login />} </>;
}

export default AuthRoute;
