import { SlArrowLeft } from "react-icons/sl";

type Props = {
  name: string;
};

export const TopLine = ({ name }: Props) => {
  return (
    <>
      <div className="top-line">
        <button
          onClick={() => {
            history.back();
          }}
        >
          <SlArrowLeft className="icon" />
        </button>
        <p className="text-lg">{name}</p>
      </div>
    </>
  );
};
