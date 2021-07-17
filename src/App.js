import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
    </Switch>
  );
}

export default App;
