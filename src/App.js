import songs from './songs'
import Player from './Player'
import './App.css';

function App() {


  return (
    <div className="App">
      <Player songs={songs}/>
    </div>
  );
}

export default App;
