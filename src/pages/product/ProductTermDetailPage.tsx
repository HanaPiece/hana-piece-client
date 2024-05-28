import { useLocation } from "react-router-dom";

export const ProductTermDetailPage = () => {
  const location = useLocation();
  const { name, content } = location.state;
  return (
    <>
      <div className="container"></div>
    </>
  );
};
