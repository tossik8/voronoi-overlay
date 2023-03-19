import { useData } from "./hooks/useData";
import {LineChart} from "./components/LineChart";

const width = window.innerWidth;
const height = window.innerHeight;

function App() {

  const data = useData();

  return (
    data ? <LineChart width={width} height={height} data={data}/>: null
  );
}

export default App
