import logo from './logo.svg';
import './App.css';
import Footer from "./Componentes/Footer/Footer";
import Navbar from "./Componentes/Navbar/Navbar";
import Carousel from './Componentes/Carousel/Carousel';
import Productos from './Componentes/productos/productos';
import Marcas from "./Componentes/Marcas/Marcas";
import styles from "./styles.css"
//import { Carousel } from "./Componentes/Carousel";
//IGNORAME
function App() {
  return (
   <div>
    <Navbar/>
    <Carousel/>
    <Productos/>
    <Marcas/>
    <Footer/>      
  </div>
  );
}

export default App;
