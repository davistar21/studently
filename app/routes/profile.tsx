import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
import ProfileSection from "~/components/profile/ProfileSection";
import capitalizeWords from "~/utils/capitalizeWords";
import {
  createProfile,
  listProfiles,
  updateProfile,
} from "~/utils/profileHelpers";
import type { Route } from "../+types/root";

export interface ProfileProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently Profile" },
    { name: "description", content: "View and edit your Studently profile" },
  ];
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileNotInitialized, setProfileNotInitialized] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState("Loading profile...");
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const session = await fetchAuthSession();
        const userEmail = session?.tokens?.signInDetails?.loginId ?? "";
        const userId = session?.userSub ?? "";
        const userProfiles = await listProfiles();
        const profileFetched = userProfiles?.data.find(
          (profile) => profile.email === userEmail && profile.id === userId
        );
        if (profileFetched) {
          setProfile(profileFetched);
        } else {
          setProfile((prev) => ({
            ...prev,
            firstName: prev?.firstName ?? "",
            lastName: prev?.lastName ?? "",
            username: prev?.username ?? userId,
            email: userEmail,
            id: userId,
          }));
          setProfileNotInitialized(true);
        }
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setStatusText("Saving profile...");
      const form = e.currentTarget.closest("form");
      if (!form) return;
      const formData = new FormData(form);
      const firstName = formData.get("first-name") as string;
      const lastName = formData.get("last-name") as string;
      const username = formData.get("username") as string;
      if (!firstName || !username) return;
      setProfile((prev) => ({
        ...prev,
        email: prev!.email,
        id: prev!.id,
        firstName: capitalizeWords(firstName),
        lastName: capitalizeWords(lastName),
        username,
      }));
      if (!profile) return;
      await createProfile(profile);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
      setStatusText("Redirecting...");
      setProfileNotInitialized(false);
      navigate("/dashboard");
    }
  }
  if (error) return <Error error={error} />;
  return (
    <div className="container mx-auto">
      {isLoading && <Loader statusText={statusText} />}
      {profileNotInitialized ? (
        <form
          className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-500 rounded-2xl p-6 space-y-6 w-[90%] md:max-w-lg mx-auto mt-10 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h2>Personal Details</h2>
          <label htmlFor="username" className="w-full">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </label>
          <label htmlFor="first-name" className="w-full">
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="First Name"
            />
          </label>
          <label htmlFor="last-name" className="w-full">
            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="Last Name"
            />
          </label>
          <button
            className="primary-button w-fit !rounded-md ml-auto"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <ProfileSection profile={profile} />
      )}
    </div>
  );
}
