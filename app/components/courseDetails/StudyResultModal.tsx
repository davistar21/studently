import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useMedia } from "use-media";

interface Flashcard {
  question: string;
  answer: string;
}

interface StudyResultModalProps {
  open: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
  summary: string;
}

// const flashcards: Flashcard[] = [
//   {
//     id: 1,
//     question: "What is React?",
//     answer: "A JavaScript library for building UIs",
//   },
//   {
//     id: 2,
//     question: "What is Tailwind CSS?",
//     answer: "A utility-first CSS framework",
//   },
//   {
//     id: 3,
//     question: "What is Framer Motion?",
//     answer: "An animation library for React",
//   },
//   {
//     id: 4,
//     question: "What is Framer Motion?",
//     answer: "An animation library for React",
//   },
// ];

export const StudyResultModal: React.FC<StudyResultModalProps> = ({
  open,
  onClose,
  flashcards,
  summary,
}) => {
  const isMobile = useMedia("(max-width: 768px)");
  const [flipped, setFlipped] = React.useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              y: isMobile ? "100%" : 0,
              opacity: 0,
              scale: isMobile ? 1 : 0.95,
            }}
            animate={{
              y: isMobile ? "50%" : 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }}
            exit={{ y: isMobile ? "100%" : 0, opacity: 0 }}
            className={`w-full max-w-2xl rounded-2xl shadow-2xl border 
              ${
                isMobile
                  ? "absolute -bottom-10 -translate-y-1/2 h-[50vh] scrollbar overflow-y-baro"
                  : ""
              }
              bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 max-h-[500px] overflow-y-auto scrollbar`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Study Results</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Save
                </Button>
                <Button size="sm">Regenerate</Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="flex w-full justify-center bg-gray-200 dark:bg-gray-800 rounded-lg mb-4">
                <TabsTrigger
                  value="summary"
                  className="data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-700 rounded-lg"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="flashcards"
                  className="data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-700 rounded-lg"
                >
                  Flashcards
                </TabsTrigger>
              </TabsList>

              {/* Summary */}
              <TabsContent value="summary">
                <div className="space-y-3 ">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Here’s a summary of what you just studied. You can review
                    the flashcards to reinforce the main ideas.
                  </p>

                  <div className="">{summary}</div>
                </div>
              </TabsContent>

              {/* Flashcards */}
              <TabsContent value="flashcards">
                <div className="flex gap-4 overflow-x-auto scrollbar justify-items-cenbar">
                  {flashcards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      className="relative min-w-56 h-40 cursor-pointer perspective snap-center"
                      onClick={() => toggleFlip(idx)}
                    >
                      <motion.div
                        className="absolute w-full h-full [transform-style:preserve-3d]"
                        animate={{ rotateY: flipped[idx] ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Front */}
                        <Card className="absolute w-full h-full backface-hidden bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center justify-center text-center px-4">
                          <CardContent className="overflow-y-auto">
                            <p className="text-sm font-medium overflow-y-auto">
                              {card.question}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Back */}
                        <Card className="absolute w-full h-full bg-gray-800 dark:bg-gray-100 border-gray-300 dark:border-gray-700 flex items-center justify-center text-center px-4 [transform:rotateY(180deg)] backface-hidden">
                          <CardContent className="overflow-y-auto scrollbar">
                            <p className="text-sm text-gray-100 dark:text-gray-900 font-medium">
                              {card.answer}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
