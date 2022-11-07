import React, { useState } from 'react';
import './signin.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='Sistema Logo' />
                </div>

                <form>
                    <h1>Entrar</h1>
                    <input type={'text'} placeholder='Digite seu email' />
                    <input type={'password'} placeholder='******* ' />
                    <button type='submit'>Acessar</button>
                </form>

                <Link to='/register'>Criar uma conta</Link>

            </div>
        </div>
    );
}