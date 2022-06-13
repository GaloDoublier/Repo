import {React} from "react";

export default function Footer(){
    return(
        <footer className="bg-dark">
            <div className="espacio20"/*style="height:20px"*/></div>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img className="MarginB15"/*style="margin-bottom: 15px;"*/ src="img/logo_byn.png" />
                    </div>
                    <div className="col-4 my-auto">
                        <div className="row">
                            <ion-item>
                                <ion-icon className="icon" name="location-outline"></ion-icon>
                                <span className="texto-f text">Beiro 3300 - Villa del Parque</span>
                            </ion-item>
                        </div>
                        <div className="row">
                            <ion-item>
                                <ion-icon className="icon" name="mail-open-outline"></ion-icon>
                                <span className="texto-f text">contacto@sanitarioscampana.com.ar</span>
                            </ion-item>

                        </div>
                    </div>
                    <div className="col-4 my-auto text-center">
                        <div className="row">
                            <ion-item>
                                <ion-icon className="icon2" name="phone-portrait-outline"></ion-icon><span className="text icon2">4503-6015</span>
                            </ion-item>
                        </div>
                    </div>
                </div>
            </div>
        </footer>    
        );
}
