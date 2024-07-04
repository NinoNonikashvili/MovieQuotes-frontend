import Echo from "laravel-echo";
import Pusher from "pusher-js";
import instance from "../axios";

// Enable Pusher logging to console for debugging
Pusher.logToConsole = true;

// Extend the Window interface to include Pusher and Echo
declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

// Initialize Pusher and Echo
window.Pusher = Pusher;
window.Echo = new Echo({
  authEndpoint: `${import.meta.env.VITE_BACKEND_URL}/broadcasting/auth`,
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY as string,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER as string,
  forceTLS: true,
  authorizer: (channel: any) => {
    return {
      authorize: (socketId: string, callback: CallableFunction) => {
        console.log("Attempting to authorize:", {
          socketId,
          channelName: channel.name,
        });

        instance
          .post("/api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            console.log("Authorization successful:", response.data);
            callback(false, response.data);
          })
          .catch((error) => {
            console.error(
              "Authorization error:",
              error.response ? error.response.data : error.message,
            );
            callback(true, error);
          });
      },
    };
  },
});
