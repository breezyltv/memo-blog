import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import FooterLayout from "./components/Footer";
import HeaderLayout from "./components/Header";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
//const Login = lazy(() => import("./routes/Login"));
const About = lazy(() => import("./routes/About"));

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <Spin
              className="lazyContent"
              tip="Loading..."
              indicator={spinIcon}
            />
          }
        >
          <HeaderLayout />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Home} />
            <Route exact path="/articles/:uid/:article_id" component={Detail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFoundPage} />
          </Switch>

          <FooterLayout />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
