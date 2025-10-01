// src/pages/AuthPage.tsx
import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router";
import "@aws-amplify/ui-react/styles.css";

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Amplify UI handles redirection after sign-in
    // But we add fallback logic for safety
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Authenticator
        loginMechanisms={["email"]}
        signUpAttributes={["email"]}
        initialState="signIn"
      >
        {({ signOut, user }) => {
          // Show success message before redirecting
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);

          return (
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">
                Welcome, {user?.username}!
              </h2>
              <p className="text-green-600">You have successfully signed in.</p>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}
