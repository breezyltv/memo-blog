import "./App.css";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import HeaderLayout from "./components/Header";
import FooterLayout from "./components/Footer";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Login from "./routes/Login";
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
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <FooterLayout />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
