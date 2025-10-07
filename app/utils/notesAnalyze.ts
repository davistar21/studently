import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const API_URL =
  "https://8eakbwdc3a.execute-api.us-east-1.amazonaws.com/dev/analyze";

const callAnalyze = async (s3Key: string) => {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  const res = await axios.post(
    API_URL,
    { s3Key }, // body
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
    }
  );

  return res.data;
};
export default callAnalyze;
