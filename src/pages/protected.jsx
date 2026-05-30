import { useEffect } from "react";
import { useNavigate } from "react-router";
import useFBstore from "../store/fbstore";

function Protected({ children }) {
  const authStatus = useFBstore((s) => s.authStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === false) {
      navigate("/auth");
    }
  }, [authStatus, navigate]);

  // Optional: block render while checking auth
  if (authStatus === "loading") {
    return null; // or a loader/spinner
  }

  return children;
}

export default Protected;
