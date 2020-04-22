import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { faCcPaypal, faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PayPage(props) {
    return (
        <div className="container">
        <h1 className="text-center text-uppercase">Варианты оплаты в интернет-магазине музыкальных инструментов</h1>
        <p className="text-center w-75 m-auto">В нашем интернет-магазине вам доступно несколько удобных способов оплаты:</p>
        <ul>
            <li>Наличными в кассе магазина при самовывозе</li>
            <li>Безналичным способом по выставленному нами счету</li>
            <li>Пластиковой картой в кассе магазина при самовывозе</li>
            <li>Пластиковыми картами в режиме онлайн:</li>
        </ul>
        <ul>

        </ul>
        <p className="text-center w-75 m-auto"> Для выбора оплаты товара с помощью банковской карты на соответствующей странице необходимо нажать кнопку «Оплата заказа
           банковской картой". Оплата происходит через ПАО СБЕРБАНК с использованием Банковских карт следующих платежных систем: </p> 
        <p>PayPale <FontAwesomeIcon icon={faCcPaypal} aria-hidden="true" size="3x"/> </p>
        <p>Visa International <FontAwesomeIcon icon={faCcVisa} aria-hidden="true" size="3x"/></p>
        <p>Mastercard Worldwide <FontAwesomeIcon icon={faCcMastercard} aria-hidden="true" size="3x"/></p>
        

</div>
    );
}

export default PayPage;