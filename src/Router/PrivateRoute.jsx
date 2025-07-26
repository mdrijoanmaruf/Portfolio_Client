import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] flex items-center justify-center p-4">
        <div className="text-center space-y-5">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500/80 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-black/40 backdrop-blur-sm"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center space-x-2 items-end">
              <p className="text-blue-400/90 text-lg font-medium tracking-widest">
                LOADING
              </p>
              <div className="flex space-x-1 items-end pb-0.5">
                <div
                  className="h-1 w-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-1 w-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="h-1 w-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.email !== "rijoanmaruf@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
