import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import RegisterForm from "./RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterPage(props) {
    const [isRegistered, setIsRegistered] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        await fetch('/register', {
            method: 'POST',
            body: data,
        }).then(response => response.json()).then(data => {
            setIsRegistered(data);
            //console.log(isRegistered);
        });
    };

    return (
        <div>{isRegistered === null ? <RegisterForm handleSubmit={handleSubmit}/> :
            isRegistered ? (<Redirect to={'/login'}/>) : (
                <div>
                    <p className={'text-danger'}>Вы не прошли регистрацию</p>
                    <RegisterForm handleSubmit={handleSubmit}/>
                </div>
            )}</div>

    );
}

export default RegisterPage;