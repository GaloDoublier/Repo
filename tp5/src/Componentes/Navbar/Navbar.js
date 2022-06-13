import { React } from "react";
export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
              <a className="navbar-brand" href="#"><img className="TamanioImagen" src="img/logo.png" alt="Campana"/></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div  className="collapse navbar-collapse me-auto" id="navbarNavAltMarkup">
                <div className="navbar-nav derecha" >
                  <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                  <a className="nav-link active" href="#">Quienes somos</a>
                  <a className="nav-link active" href="#">Productos</a>
                  <a className="nav-link active" href="#">Contacto</a>
                </div>
              </div>
            </div>
          </nav>
    )

}
