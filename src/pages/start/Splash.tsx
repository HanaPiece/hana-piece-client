import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

function Splash() {
  return (
    <>
      <div className="container">
        {/* <h2>
          SPLASHkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        </h2> */}
        <br></br>
        <TopLine path={"/tutorial"} name={"test"}></TopLine>
        <GreenButton name={"확인"}></GreenButton>
      </div>
    </>
  );
}

export default Splash;
