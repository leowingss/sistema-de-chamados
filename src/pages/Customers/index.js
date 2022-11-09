import React, { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import './customers.css'
import { toast } from 'react-toastify';

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e) {
        e.preventDefault();

        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia,
                    cnpj,
                    endereco
                })
                .then(() => {
                    setNomeFantasia('');
                    setCnpj('');
                    setEndereco('');
                    toast.info('Empresa cadastrada com sucesso!');
                })
                .catch((err) => {
                    toast.error('Erro ao cadastrar essa empresa.');
                })
        } else {
            toast.error('Preencha todos os campos!');
        }

    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Clientes'>
                    <FiUser color='#000' size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>

                        <label>Nome fantasia</label>
                        <input type={'text'} placeholder='Nome da sua empresa' value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type={'text'} placeholder='Seu CNPJ' value={cnpj} onChange={e => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type={'text'} placeholder='Endereço da empresa' value={endereco} onChange={e => setEndereco(e.target.value)} />

                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>

            </div>
        </div>
    );
}