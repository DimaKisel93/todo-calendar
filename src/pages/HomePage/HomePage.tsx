import { TodoProvider } from "../../contexts/TodoContext";
import { Calendar } from "../../components/Calendar/Calendar";
import { Header } from "../../components/Header/Header";

export const HomePage = () => {
  return (
    <TodoProvider>
      <Header />
      <Calendar />
    </TodoProvider>
  );
};
