import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterPage(props) {
    return (<div className="col-sm-6 offset-sm-3">
            <h2>Регистрация</h2>
            <form action="/register" method="post">
                <div className="form-group">
                    <label for="firstName">Имя</label>
                    <input type="text" name="firstName" className="form-control"/>
                    <div className="invalid-feedback">
                    </div>
                </div>
                <div className="form-group">
                    <label for="lastName">Фамилия</label>
                    <input type="text" name="lastName" className="form-control"/>
                    <div className="invalid-feedback">
                    </div>
                </div>
                <div className="form-group">
                    <label for="username">Логин</label>
                    <input type="text" name="username" className="form-control"/>
                    <div className="invalid-feedback">
                    </div>
                </div>
                <div className="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" className="form-control"/>
                    <div className="invalid-feedback">
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Регистрация" className="btn btn-warning"/>
                    <a routerLink="/login" className="btn link-warning">Войти</a>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;