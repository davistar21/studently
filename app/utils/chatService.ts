import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE = "https://nmdwo5oknk.execute-api.us-east-1.amazonaws.com/dev";
const CHAT_PATH = "/chat";

export interface ChatResponse {
  reply: string;
}

export async function sendJunieMessage(message: string): Promise<ChatResponse> {
  try {
    const session = await fetchAuthSession();
    const idToken = session?.tokens?.idToken?.toString();

    if (!idToken) {
      throw new Error("No ID token found — user may not be logged in.");
    }
    console.log("thisisidtoken", idToken);

    const resp = await axios.post(
      `${API_BASE}${CHAT_PATH}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        timeout: 60000,
      }
    );

    return resp.data as ChatResponse;
  } catch (err) {
    console.error("chatService error:", err);
    throw new Error(
      err?.response?.data?.error || err.message || "Chat service failed"
    );
  }
}
