import classes from "./ToggleIcon.module.css";

const ToggleIcon = ({ onClose, open }: ToggleIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${classes.icon} ${open ? "" : classes.closed}`}
      onClick={onClose}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

type ToggleIconProps = {
  onClose: () => void;
  open: boolean;
};

export default ToggleIcon;
