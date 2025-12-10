import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendCopilotMessage = async (message, sessionId = "user_123") => {
  try {
    const response = await axios.post(`${API_BASE_URL}/copilot/chat`, {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      session_id: sessionId,
      context: {},
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
