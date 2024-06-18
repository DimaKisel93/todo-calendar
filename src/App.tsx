import { TodoProvider } from './contexts/TodoContext';
import { Calendar } from './components/Calendar/Calendar';
import './App.css';
import { ProfileSelector } from './components/ProfileSelect/ProfileSelect';

const App = () => {
  return (
    <TodoProvider>
      <div className="app">
        <header className="app_header">
          <h1>To-Do лист календарь</h1>
          <ProfileSelector />
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    </TodoProvider>
  );
};

export default App;
