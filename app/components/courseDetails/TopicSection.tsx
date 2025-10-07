import AppDialog from "~/components/AppDialog";
import TopicDeck from "~/components/TopicDeck";
import { Button } from "~/components/ui/button";
import type { Topic } from "types";
import { useAppStore } from "~/lib/zustandStore";
import Loader from "../Loader";

interface Props {
  topics: Topic[];
  onAddTopic: (e: React.FormEvent<HTMLFormElement>) => void;
  params: Params;
}
export type Params = {
  semesterId: string;
  courseId: string;
};

const TopicSection = ({ topics, onAddTopic, params }: Props) => {
  const { isLoading } = useAppStore();

  return (
    <div className="topics md:px-6">
      {isLoading&& <Loader statusText="Updating topics..." />}
      <div className="flex mb-4 justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Topics</h2>

        <AppDialog
          triggerLabel="Add Topic"
          title="Add a new topic"
          description="Fill in the topic details below."
        >
          <form className="space-y-2" onSubmit={onAddTopic}>
            <label htmlFor="course-topic" className="w-full">
              <input
                type="text"
                name="course-topic"
                id="course-topic"
                placeholder="Add Topic"
                className="border rounded-md capitalize"
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
      <TopicDeck topics={topics} params={params} />
    </div>
  );
};

export default TopicSection;
