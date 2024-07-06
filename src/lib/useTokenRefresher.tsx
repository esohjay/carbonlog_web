import { useEffect } from "react";
import { User } from "firebase/auth";

export const useTokenRefresher = (user: User | null) => {
  useEffect(() => {
    if (!user) return;

    const refreshToken = async () => {
      try {
        await user.getIdToken(true);
        console.log("Token refreshed successfully");
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    // Refresh token every 50 minutes
    const intervalId = setInterval(refreshToken, 50 * 60 * 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [user]);
};
