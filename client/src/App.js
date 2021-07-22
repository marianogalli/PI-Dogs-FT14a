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
      <Route exact path="/" component={Landing} /> 
      <Route path="/" component={Nav} />
      <Route exact path="/dogs" component={Home} />
      <Route path="/dogs/add" component={Add}/>
      <Route path="/dogs/detail/:id" component={Detail}/>
          
    </div>
  );
}

export default App;
