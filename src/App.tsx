import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Splash from "./pages/start/Splash";
import { TutorialPage1 } from "./pages/start/TutorialPage1";
import { HomePage } from "./pages/home/HomePage";
import { SplitMainPage } from "./pages/split/SplitMainPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* NavBar 있는 화면 */}
          <Route path="home">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="split">
            <Route index element={<SplitMainPage />} />
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
