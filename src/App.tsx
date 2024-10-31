import "./App.css";
import TradeItemCard from "./components/TradeItemCard";
import { TradeItem } from "./types";
function App() {
  const tradeItem: TradeItem = {
    id: 1,
    name: "Iron",
    baseValue: 10,
    imageSrc: "/src/assets/resources/goods/Bear_Jelly_Burger.png",
  };

  return (
    <>
      <h1>hello world</h1>
      <TradeItemCard tradeItem={tradeItem} quantity={10} />
    </>
  );
}

export default App;
