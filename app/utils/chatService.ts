import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { listProfiles } from "./profileHelpers";
import getImportantData from "./getImportantInfo";
import { useAppStore } from "~/lib/zustandStore";
import { SemesterAPI } from "./semesterHelpers";
import type { SemesterData } from "types";

const API_BASE = "https://nmdwo5oknk.execute-api.us-east-1.amazonaws.com/dev";
const CHAT_PATH = "/chat";

export interface ChatResponse {
  reply: string;
}

export async function sendJunieMessage(message: string): Promise<ChatResponse> {
  try {
    const session = await fetchAuthSession();
    const idToken = session?.tokens?.idToken?.toString();
    const userEmail = session?.tokens?.signInDetails?.loginId ?? "";
    const userId = session?.userSub ?? "";
    const userProfiles = await listProfiles();
    const profileFetched = userProfiles?.data.find(
      (profile) => profile.email === userEmail && profile.id === userId
    );

    if (!idToken) {
      throw new Error("No ID token found — user may not be logged in.");
    }
    const semesterModels = await SemesterAPI.list();

    const semesterDataList: SemesterData[] = await Promise.all(
      semesterModels.data.map(async (semesterModel): Promise<SemesterData> => {
        const { id, name, units, owner, courses } = semesterModel;
        return {
          id,
          name,
          units,
          owner,
          courses,
        };
      })
    );
    const important = JSON.stringify(getImportantData(semesterDataList));

    const fullMessage = profileFetched
      ? `User Profile - Name: ${profileFetched.firstName} ${profileFetched.lastName}, Username: ${profileFetched.username}, Email: ${profileFetched.email}. Student Info: ${important}. Message: ${message}`
      : message;

    const resp = await axios.post(
      `${API_BASE}${CHAT_PATH}`,
      { message: fullMessage },
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
    return Promise.reject(err);
  }
}
