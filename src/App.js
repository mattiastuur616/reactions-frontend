import './App.css';
import ElementList from './components/element/elementList/ElementList';
import MainPageNav from './components/mainPageNav/MainPageNav';
import ReactionEvent from './components/reactionEvent/ReactionEvent';

function App() {
  return (
    <div className="App">
      <div className='gradient__nav-bg'>
        <MainPageNav />
      </div>

      <div>
        
      </div>
      <header className="reactions__mainpage">
        <div className='reactions__mainpage-elemets'>
          <ElementList />
        </div>

        <div>
          <ReactionEvent />
        </div>
      </header>
    </div>
  );
}

export default App;
