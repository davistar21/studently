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
interface IAppDialog {
  triggerLabel?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AppDialog: React.FC<IAppDialog> = ({
  triggerLabel = "Open",
  title = "Dialog Title",
  description = "",
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
          className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
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
