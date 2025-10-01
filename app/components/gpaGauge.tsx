import { motion } from "framer-motion";
import { useIsIOS } from "~/hooks/useIsIOS";

const GPAGauge = ({ gpa }: { gpa: number }) => {
  const isIOS = useIsIOS();

  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const maxGPA = 5.0;
  const percentage = (gpa / maxGPA) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Conditional values based on iOS detection
  const textX = isIOS ? 100 : 50;
  const textY = isIOS ? 100 : 50;
  const fontSize = isIOS ? "36px" : "16px";

  return (
    <svg width={100} height={100} viewBox="0 0 100 100" className="mx-auto">
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={50}
        cy={50}
      />
      <motion.circle
        stroke="#3B82F6"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={50}
        cy={50}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform="rotate(-90 50 50)"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.text
        x={textX}
        y={textY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight="bold"
        className={"dark:fill-gray-200 fill-gray-900"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {gpa.toFixed(2)}
      </motion.text>
    </svg>
  );
};

export default GPAGauge;
