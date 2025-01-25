import { Provider } from "react-redux";
import { store } from "./Store/store";
import WeatherApp from "./Components/weatrherapp";

function App() {
  return (
    <div>
        <Provider store={store}>
          <WeatherApp/>
        </Provider>
    </div>
  );
}

export default App;
