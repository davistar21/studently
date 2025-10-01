type LogoProps = {
  className?: string;
};
const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div
      className={`font-[Quicksand] text-2xl font-semibold text-gradient-2 ${className}`}
    >
      Studently
    </div>
  );
};

export default Logo;
