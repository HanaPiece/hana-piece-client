import { IoIosBatteryFull, IoIosWifi } from "react-icons/io";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { currentTime } from "../../components/utils/formatters";

export const Header = () => {
  return (
    <div className="sticky flex justify-between top-0 left-0 w-full px-3 bg-white">
      <p className="font-bold text-lg">{currentTime()}</p>
      <div className="flex gap-x-1 items-center">
        <MdOutlineSignalCellularAlt size={"20"} />
        <IoIosWifi size={"20"} />
        <IoIosBatteryFull size={"25"} />
      </div>
    </div>
  );
};
