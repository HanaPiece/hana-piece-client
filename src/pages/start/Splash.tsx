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
        <TopLine name={"test"}></TopLine>
        <GreenButton path={""} name={"확인"}></GreenButton>
      </div>
    </>
  );
}

export default Splash;
