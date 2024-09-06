import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainScreen } from "./components/mainscreen";

function App() {
  return (
    <div className="page">
      <Header />
      <MainScreen />
      <Footer />
    </div>
  );
}

export default App;
