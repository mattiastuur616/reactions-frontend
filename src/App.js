import './App.css';
import ElementList from './components/element/elementList/ElementList';
import MainPageNav from './components/mainPageNav/MainPageNav';
import ReactionEvent from './components/reactionEvent/ReactionEvent';

function App() {
  function onDrag(e) {
    e.preventDefault();
  }

  return (
    <div className="App" onDragOver={(e) => onDrag(e)}>
      <div className='gradient__nav-bg'>
        <MainPageNav />
      </div>

      <div>
        
      </div>
      <header className="reactions__mainpage">
        <div className='reactions__mainpage-elemets' style={{ zIndex: 2, position: "relative" }}>
          <ElementList />
        </div>

        <div className='reactions__mainpage-operation' style={{ zIndex: 1 }}>
          <ReactionEvent />
        </div>
      </header>
    </div>
  );
}

export default App;