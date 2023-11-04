import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import LearnHome from "./pages/LearnHome";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/learn/:type" component={LearnHome} />
      <Route exact path="/learn/:type/:id" component={LearnPage} />
    </Switch>
  );
}

export default App;
