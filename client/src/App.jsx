import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import LearnHome from "./pages/LearnHome";
import TestHome from "./pages/TestHome";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/learn/:type" component={LearnHome} />
        <Route exact path="/learn/:type/:id" component={LearnPage} />
        <Route exact path="/test/" component={TestHome} />
        <Route exact path="/test/:type" component={TestPage} />
      </Switch>
    </div>
  );
}

export default App;
