import { BrowserRouter } from "react-router-dom";
import Head from "./components/Head";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafafa]">
        <Head />
      </div>
    </BrowserRouter>
  );
}

export default App;
