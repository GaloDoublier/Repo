import { React } from "react";
export default function Marcas() {
    return(
        <div className="container-fluid">
        <div className="row">
        <div className="publi">
          <div className="container mx-auto">
              <div className="row ">
                <div className="Height25"></div>
                <b className="Large">Marcas con las que trabajamos</b>
                <div className="col-3  my-auto mx-auto">
                  <img className="patro img-fluid  d-block m-auto my-auto" src="img/ferrum.png" alt="ferrum" srcSet=""/>
              </div>
              <div className="col-3 my-auto mx-auto">
                  <img className="patro img-fluid m-auto d-block my-auto" src="img/delta.png" alt="delta" srcSet=""/>
            </div>
            <div className="col-3 my-auto mx-auto">
              <img className="patro img-fluid m-auto  d-block my-auto" src="img/Logo-Negativo.png" alt="tigre" srcSet=""/>
          </div>
          <div className="col-3 my-auto mx-auto">
           <img className="patro img-fluid mx-auto d-block my-auto" src="img/logo_ips.png" alt="ips" srcSet=""/>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
    )
}