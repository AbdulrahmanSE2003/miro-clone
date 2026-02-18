import { Star } from "lucide-react";

type FooterProps = {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
};

const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.stopPropagation();
    e.preventDefault();
    onClick();
  }
  return (
    <div className={`relative bg-white p-3`}>
      <p className={`text-sm truncate max-w-[calc(100%-20px)]`}>{title}</p>
      <p
        className={`opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate`}
      >
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-muted-foreground transition-all duration-300 hover:text-blue-600 ${disabled ? "cursor-not-allowed" : ""}`}
      >
        <Star
          className={`h-4 w-4 cursor-pointer ${isFavorite ? "fill-blue-600 text-blue-600," : ""}`}
        />
      </button>
    </div>
  );
};

export default Footer;
