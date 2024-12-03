import banner from "../../assets/img/mainscreen/banner.png";

import "./ButtonTitle.scss";

interface ButtonTitleProps {
  onClick: () => void;
}

const ButtonTitle: React.FC<ButtonTitleProps> = ({ onClick }) => {
  return (
    <button className="button-title" onClick={onClick}>
      <img src={banner} alt="Title Button" className="image" />
    </button>
  );
};

export default ButtonTitle;
