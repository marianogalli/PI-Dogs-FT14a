import './App.css';
import { Route } from 'react-router-dom'
import Landing from './views/Landing';
import Nav from './components/viewComponents/Nav'
import Home from './views/Home'
import Add from './views/Add'
import Detail from './views/Detail'

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route path="/dogs/add" component={Add}/>
      <Route path="/dogs/detail/:id" component={Detail}/>
      <Route path="/landing" component={Landing} />     
    </div>
  );
}

export default App;
