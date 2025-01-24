import logo from './logo.svg';
import './App.css';
import CityWeather from './components/Cityweather/cityweather';
import { Provider } from 'react-redux';
import { store } from './components/Store/store';

function App() {
  return (
    <div>
      <Provider store={store}>
      <CityWeather/>
      </Provider>
    </div>
  );
}

export default App;
