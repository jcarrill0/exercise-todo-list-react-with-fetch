import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="display-1 text-info">todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
