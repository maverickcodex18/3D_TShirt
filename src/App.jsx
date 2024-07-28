import { useSnapshot } from "valtio"
import Canva from "./canva/Canva"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"
import state from "./store"
import CanvaExport from "./canva/CanvaExport"

function App() {
  const snap=useSnapshot(state);
  return(
    <div className="bg-gray-100">
      <Home></Home>
      <CanvaExport />
      <Customizer></Customizer>
    </div>
  )
}

export default App
