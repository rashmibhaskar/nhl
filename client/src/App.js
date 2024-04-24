import "./App.css";
import SummaryTable from "./components/summaryTable/index.js";
function App() {
  return (
    <div className="App">
      <div className="banner">
        <div className="logo"> </div>
        <div className="header"> National Hockey League Summary</div>
      </div>
      <div className="nhl-app">
        <SummaryTable />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
