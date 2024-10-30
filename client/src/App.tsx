import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Answer } from "./modules/Answer";
import { Home } from "./modules/Home";

function App() {
  return (
    <Router>
      <Header />
      <main className="mx-auto mt-14 mb-0  box-border w-full sm:w-4/5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
