import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Topic } from "types";
import { useState } from "react";

const STATUS_PROGRESS_MAP: Record<Topic["status"], number> = {
  not_started: 0,
  in_progress: 50,
  not_completed: 75,
  completed: 100,
};

const TopicDeck = ({ topics }: { topics: Topic[] }) => {
  // Local state to track status changes per topic
  const [topicStatuses, setTopicStatuses] = useState<
    Record<string, Topic["status"]>
  >(() => Object.fromEntries(topics.map((t) => [t.id, t.status])));

  // Handler when status changes
  const handleStatusChange = (id: string, newStatus: Topic["status"]) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  return (
    <div className="flex scrollbar gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {topics.map((topic, idx) => {
        const currentStatus = topicStatuses[topic.id];
        const progress = STATUS_PROGRESS_MAP[currentStatus] || 0;
        topic.progress = progress;

        return (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="min-w-[250px] relative bg-transparent border-none dark:bg-neumorphic-dark-2 text-gray-800 dark:text-gray-200 rounded-xl shadow flex flex-col justify-between min-h-[150px] snap-start group"
            whileHover={{ scale: 1.01 }}
          >
            <div
                className="absolute inset-0 rounded-2xl opacity-40 blur-[6px] z-0 transition-all duration-500 border-none  group-hover:opacity-70 group-hover:blur-sm bg-gradient-to-br from-[#0078ff] to-red-300 dark:from-green-200 dark:to-red-700"
                
              ></div>
<div className="relative h-full z-10 bg-neumorphic transition-all duration-500 min-w-[250px] dark:bg-neumorphic-dark-2 text-gray-800 dark:text-gray-200 rounded-xl  p-4 flex flex-col justify-between min-h-[150px] snap-start">
            <p className="font-semibold mb-2 text-clamp text-left capitalize">
              {topic.title}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Dropdown for completion state */}
            <Select
              value={currentStatus}
              onValueChange={(val) =>
                handleStatusChange(topic.id, val as Topic["status"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not started</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="not_completed">Almost Completed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </motion.div>

        );
      })}
    </div>
  );
};

export default TopicDeck;
