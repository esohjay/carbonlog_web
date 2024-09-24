import { useEffect } from "react";
// import { User } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const useTokenRefresher = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await auth?.currentUser?.getIdToken(true);
        // await user.getIdToken(true);
        console.log("Token refreshed successfully");
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    // Refresh token every 50 minutes
    // const intervalId = setInterval(refreshToken, 5 * 1000);
    const intervalId = setInterval(refreshToken, 50 * 60 * 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);
};
