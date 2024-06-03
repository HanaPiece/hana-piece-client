import { SlArrowLeft } from "react-icons/sl";

type Props = {
  name: string;
};

export const TopLine = ({ name }: Props) => {
  return (
    <div className="relative flex items-center h-14 bg-white">
      <button
        onClick={() => {
          history.back();
        }}
        className="absolute left-5"
      >
        <SlArrowLeft className="icon text-gray-600" />
      </button>
      <p className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">{name}</p>
    </div>
  );
};
