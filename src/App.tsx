import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Splash from "./pages/start/Splash";
import { TutorialPage1 } from "./pages/start/TutorialPage1";
import { HomePage } from "./pages/home/HomePage";
import { SplitMainPage } from "./pages/split/SplitMainPage";
import { SplitManualPage } from "./pages/split/SplitManualPage";
import { SplitAutoPage } from "./pages/split/SplitAutoPage";
import { GoalProductDetailPage } from "./pages/home/GoalProductDetailPage";
import { ProductListPage } from "./pages/product/ProductListPage";
import { ProductDetailPage } from "./pages/product/ProductDetailPage";
import { ProductTermPage } from "./pages/product/ProductTermPage";
import { ProductSignupPage } from "./pages/product/ProductSignupPage";
import { ProductCompletePage } from "./pages/product/ProductCompletePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* NavBar 있는 화면 */}
          <Route path="home">
            <Route index element={<HomePage />} />
            <Route path=":id" element={<GoalProductDetailPage />} />
          </Route>
          <Route path="product">
            <Route index element={<ProductListPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
            <Route path=":id/term" element={<ProductTermPage />} />
            <Route path=":id/signup" element={<ProductSignupPage />} />
            <Route path=":id/complete" element={<ProductCompletePage />} />
          </Route>
          <Route path="split">
            <Route index element={<SplitMainPage />} />
            <Route path="manual" element={<SplitManualPage />} />
            <Route path="auto" element={<SplitAutoPage />} />
          </Route>
        </Route>

        {/* NavBar 없는 화면 */}
        <Route path="/splash">
          <Route index element={<Splash />} />
        </Route>
        <Route path="/tutorial">
          <Route index element={<TutorialPage1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
