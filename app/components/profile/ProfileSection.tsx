import Loader from "~/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useAppStore } from "~/lib/zustandStore";
import type { ProfileProps } from "~/routes/profile";
import AppDialog from "../AppDialog";
import { useState } from "react";
import capitalizeWords from "~/utils/capitalizeWords";
import { updateProfile } from "~/utils/profileHelpers";

export default function ProfileSection({
  profile,
}: {
  profile: ProfileProps | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("Loading profile...");
  const [updatedProfile, setUpdatedProfile] = useState<ProfileProps | null>(
    null
  );

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setStatusText("Updating profile...");
      if (!updatedProfile) return;
      await updateProfile(updatedProfile.id, updatedProfile);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
    // Implement update logic here
  };
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {isLoading && <Loader statusText={statusText} />}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 sm:p-8 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt="User avatar" />
              <AvatarFallback>
                {profile?.firstName.charAt(0) ?? "--"}
                {profile?.lastName.charAt(0) ?? "--"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {profile?.firstName ?? "--"}
                &nbsp;
                {profile?.lastName || "--"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {profile?.email ?? "@---"}
              </p>
            </div>
          </div>
          <AppDialog
            triggerClassName="!bg-gradient-to-r from-transparent to-transparent !p-0"
            triggerLabel={
              <div onClick={() => setUpdatedProfile(profile!)}>
                Edit Profile
              </div>
            }
            title="Edit course"
            description="Edit the course details below."
          >
            <form className="space-y-2 text-black" onSubmit={handleUpdate}>
              <h2>Personal Details</h2>
              <label htmlFor="username" className="w-full">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={updatedProfile?.username || ""}
                  onChange={(e) => {
                    if (!updatedProfile) return;
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      firstName: prev?.firstName ?? "",
                      lastName: prev?.lastName ?? "",
                      email: prev!.email ?? "",
                      id: prev!.id,
                      username: e.target.value,
                    }));
                  }}
                />
              </label>
              <label htmlFor="first-name" className="w-full">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="First Name"
                  value={updatedProfile?.firstName || ""}
                  onChange={(e) => {
                    if (!updatedProfile) return;
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      lastName: prev?.lastName ?? "",
                      username: prev?.username ?? "",
                      email: prev!.email ?? "",
                      id: prev!.id,
                      firstName: capitalizeWords(e.target.value),
                    }));
                  }}
                />
              </label>
              <label htmlFor="last-name" className="w-full">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="Last Name"
                  value={updatedProfile?.lastName || ""}
                  onChange={(e) => {
                    if (!updatedProfile) return;
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      firstName: prev?.firstName ?? "",
                      username: prev?.username ?? "",
                      email: prev!.email ?? "",
                      id: prev!.id,
                      lastName: capitalizeWords(e.target.value),
                    }));
                  }}
                />
              </label>

              <Button
                type="submit"
                className="primary-button text-white ml-auto w-fit"
              >
                Save
              </Button>
            </form>
          </AppDialog>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">-</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Study Goals
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">-</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              AI Preferences
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personalized summaries, flashcards, and spaced repetition
              reminders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
