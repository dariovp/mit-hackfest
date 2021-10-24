/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import { theme } from './theme'
import { Switch, Route, BrowserRouter as Router, } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from "./components/views/Login";
import Main from "./components/views/Main";
import Home from "./components/views/Home";
import { Search } from "./components/views/Search";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
