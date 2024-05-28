import { useNavigate } from "react-router-dom";

type Props = {
  path: string;
  name: string;
};

export const GreenButton = ({ path, name }: Props) => {
  const navigate = useNavigate();
  const buttonClicked = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <button
        className="green-button"
        onClick={() => {
          buttonClicked(path);
        }}
      >
        {name}
      </button>
    </>
  );
};
