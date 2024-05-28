import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Splash } from "./pages/start/Splash";
import { Tutorial1Page } from "./pages/start/Tutorial1Page";
import { Tutorial2Page } from "./pages/start/Tutorial2Page";
import { Tutorial3Page } from "./pages/start/Tutorial3Page";
import { Tutorial4Page } from "./pages/start/Tutorial4Page";
import { LoginPage } from "./pages/start/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { GoalProductDetailPage } from "./pages/home/GoalProductDetailPage";
import { SplitMainPage } from "./pages/split/SplitMainPage";
import { SplitManualPage } from "./pages/split/SplitManualPage";
import { SplitAutoPage } from "./pages/split/SplitAutoPage";
import { ProductListPage } from "./pages/product/ProductListPage";
import { ProductDetailPage } from "./pages/product/ProductDetailPage";
import { ProductTermPage } from "./pages/product/ProductTermPage";
import { ProductSignupPage } from "./pages/product/ProductSignupPage";
import { ProductCompletePage } from "./pages/product/ProductCompletePage";
import { MypagePage } from "./pages/mypage/MypagePage";
import { SalaryPage } from "./pages/mypage/salary/SalaryPage";
import { GoalListPage } from "./pages/mypage/goal/GoalListPage";
import { GoalCreatePage } from "./pages/mypage/goal/GoalCreatePage";
import { GoalDetailPage } from "./pages/mypage/goal/GoalDetailPage";
import { AccountSettingPage } from "./pages/mypage/account/AccountSettingPage";
import { AccountOpenList } from "./pages/mypage/account/AccountOpenList";
import { AccountSavingList } from "./pages/mypage/account/AccountSavingList";

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
          </Route>
          <Route path="mypage">
            <Route index element={<MypagePage />} />
            <Route path="goal" element={<GoalListPage />} />
            <Route path="account">
              <Route path="setting">
                <Route index element={<AccountSettingPage />} />
                <Route path="open" element={<AccountOpenList />} />
                <Route path="saving" element={<AccountSavingList />} />
              </Route>
            </Route>
          </Route>
          <Route path="split">
            <Route index element={<SplitMainPage />} />
            <Route path="manual" element={<SplitManualPage />} />
            <Route path="auto" element={<SplitAutoPage />} />
          </Route>
        </Route>

        {/* NavBar 없는 화면 */}
        <Route path="/start">
          <Route index element={<Splash />} />
        </Route>
        <Route path="/tutorial">
          <Route index element={<Tutorial1Page />} />
        </Route>

        <Route path="splash" element={<Splash />} />
        <Route path="tutorial1" element={<Tutorial1Page />} />
        <Route path="tutorial2" element={<Tutorial2Page />} />
        <Route path="tutorial3" element={<Tutorial3Page />} />
        <Route path="tutorial4" element={<Tutorial4Page />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="product">
          <Route path=":id/term" element={<ProductTermPage />} />
          <Route path=":id/signup" element={<ProductSignupPage />} />
          <Route path=":id/complete" element={<ProductCompletePage />} />
        </Route>
        <Route path="mypage">
          <Route path="salary" element={<SalaryPage />} />
          <Route path="goal">
            <Route path=":id" element={<GoalDetailPage />} />
            <Route path="create" element={<GoalCreatePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
