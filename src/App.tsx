import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import FormPage from "./pages/Form";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 首页 */}
        <Route
          path="/"
          element={<Home />}
        />
        {/* 答题页 */}
        <Route
          path="/quiz"
          element={<Quiz />}
        />
        {/* 答题结果页 */}
        <Route
          path="/result"
          element={<Result />}
        />
        {/* 填写表单页 */}
        <Route
          path="/form"
          element={<FormPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
