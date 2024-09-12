import { useState } from "react";
import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import { Answer } from "./modules/Answer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Router>
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/answer" element={<Answer />} />
          </Routes>
        </main>
      </Router>

      {/* <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">首页</TabsTrigger>
          <TabsTrigger value="password">刷题</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs> */}
    </div>
  );
}

export default App;
