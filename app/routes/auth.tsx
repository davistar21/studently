// src/pages/AuthPage.tsx
import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router";
import "@aws-amplify/ui-react/styles.css";
import { motion } from "framer-motion";
export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Amplify UI handles redirection after sign-in
    // But we add fallback logic for safety
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#192c43]">
      <Authenticator
        loginMechanisms={["email"]}
        signUpAttributes={["email"]}
        initialState="signIn"
      >
        {({ signOut, user }) => {
          // Show success message before redirecting
          // setTimeout(() => {
          //   navigate("/dashboard");
          // }, 2500);

          return (
            <div className="flex flex-col items-center gap-4 text-center p-6">
              <motion.div
                className="border-2 border-[#28a745] rounded-full p-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#28a745"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.h2
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome, {user?.username}!
              </motion.h2>
              <motion.p
                className="text-green-600"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                You have successfully signed in.
              </motion.p>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}
