import { useState, useEffect } from "react";
import LoginForm from "../components/loginform";
import checkUserStatus from "../utils/checkUserStatus";
import DashBoard from "../components/dashboard";

export default function Home() {
  const [user, setUser] = useState(false);
  const [showlogin, setshowLogin] = useState(false);
  useEffect(() => {
    let token =
      localStorage.getItem("token_info") ||
      sessionStorage.getItem("token_info");
    if (checkUserStatus(token)) setUser(true);
    else {
      setshowLogin(true);
    }
  }, []);

  if (user) {
    return <DashBoard />;
  }
  if (showlogin) {
    return <LoginForm />;
  }
}
