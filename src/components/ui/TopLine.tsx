import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

type Props = {
  path: string;
  name: string;
};

export const TopLine = ({ path, name }: Props) => {
  const navigate = useNavigate();

  const backClicked = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div className="top-line">
        <button
          onClick={() => {
            backClicked(path);
          }}
        >
          <SlArrowLeft className="icon" />
        </button>
        <p className="text-lg">{name}</p>
      </div>
    </>
  );
};
