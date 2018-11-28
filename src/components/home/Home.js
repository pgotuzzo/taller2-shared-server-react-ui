import React, {Component} from 'react';
import "./Home.css";

export default class Home extends Component {

    render() {
        return (
            <div>
                <div className={"option-box"}>
                    <h2>Pagos</h2>
                    <span>
                        Permite visualizar el listado de pagos pendientes existentes. Ademas se permite ver el detalle de
                        cada uno de ellos, facilitando adicionalmente la administracion de los mismos.
                    </span>
                </div>
                <div className={"option-box"}>
                    <h2>Envios</h2>
                    <span>
                        Permite visualizar el listado de envios existentes. Ademas se permite ver el detalle de cada uno de
                        ellos, facilitando adicionalmente la administracion de los mismos.
                    </span>
                </div>
                <div className={"option-box"}>
                    <h2>App Servers</h2>
                    <span>
                        Muesta los App Servers registrados y permite la administracion de cada uno de ellos.
                    </span>
                </div>
                <div className={"option-box"}>
                    <h2>Estadisticas</h2>
                    <span>
                        Detalla algunos datos estadisticos relevantes al uso de los App Servers
                    </span>
                </div>
            </div>
        );
    }

}
