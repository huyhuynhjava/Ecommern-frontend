import Login from "../Users/Forms/Login";

function AdminRoute({ children }) {
  //get user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.data?.isAdmin ? true : false;
  return <>{isLoggedIn ? children : <h2>Access denied</h2>} </>;
}

export default AdminRoute;
