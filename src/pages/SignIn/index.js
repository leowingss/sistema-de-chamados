import React, { useState } from 'react';
import './signin.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        alert('CLICOU');
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='Sistema Logo' />
                </div>

                <form onSubmit={handleSubmit} >
                    <h1>Entrar</h1>
                    <input type={'text'}
                        placeholder='Digite seu email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type={'password'}
                        placeholder='******* '
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button type='submit'>Acessar</button>
                </form>

                <Link to='/register'>Criar uma conta</Link>

            </div>
        </div>
    );
}