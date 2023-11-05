import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import LearnHome from "./pages/LearnHome";
import TestHome from "./pages/TestHome";
import TestPage from "./pages/TestPage";
import Learn from "./pages/Learn";
import Working from "./pages/Working";
import About from "./pages/About";
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
        <Route exact path="/working" component={Working} />
        <Route exact path="/about" component={About} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

export default App;
