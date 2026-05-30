import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getAuth } from "firebase/auth";

export default function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const verify = async () => {
      const user = auth.currentUser;
      if (!user) {
        setAllowed(false);
        return;
      }

      const token = await user.getIdTokenResult(true);
      setAllowed(token.claims.admin === true);
    };

    verify();
  }, []);

  if (allowed === null) return null; // or loader
  if (!allowed) return <Navigate to="/" />;

  return children;
}
