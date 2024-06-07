import { TodoProvider } from "./contexts/TodoContext";
import { Calendar } from "./components/Calendar";
import "./App.css";

const App = () => {
  return (
    <TodoProvider>
      <div className="app">
        <header className="app__header">
          <h1>To-Do лист календарь</h1>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    </TodoProvider>
  );
};

export default App;
