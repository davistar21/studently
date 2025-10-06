import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import type { JSX } from "react";
interface IAppDialog {
  triggerLabel?: string | JSX.Element;
  triggerClassName?: string; // <- NEW
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AppDialog: React.FC<IAppDialog> = ({
  triggerLabel = "Open",
  title = "Dialog Title",
  description = "",
  triggerClassName = "",
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className={`bg-green-700 primary-gradient text-white font-semibold rounded-md p-3 border-1 border-transparent w-fit ${triggerClassName}`}
        >
          {triggerLabel}
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-200 shadow-md dark:bg-gradient-dark">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default AppDialog;
