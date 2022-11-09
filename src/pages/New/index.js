import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import './new.css';

export default function New() {

    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomer() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach(doc => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        console.log('NENHUMA EMPRESA ENCONTRADA')
                        setCustomers([{ id: '1', nomeFantasia: 'FREELA' }]);
                        setLoadingCustomers(false);
                        return;
                    }

                    setCustomers(lista);
                    setLoadingCustomers(false);

                })
                .catch(error => {
                    console.log(error);
                    setLoadingCustomers(false);
                    setCustomers([{ id: '1', nomeFantasia: '' }]);
                })
        }

        loadCustomer();
    }, [])


    async function handleRegister(e) {
        e.preventDefault();

        await firebase.firestore().collection('chamados')
            .add({
                created: new Date(),
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto,
                status,
                complemento,
                userId: user?.uid
            })
            .then(() => {
                toast.success('Chamado criado com sucesso!');
                setComplemento('');
                setCustomerSelected(0);
            })
            .catch(err => {
                toast.error('Erro ao registar.');
                console.log(err);

            })
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value);
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Novo chamado'>
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Cliente</label>

                        {loadingCustomers ? (
                            <input type={'text'} disabled={true} value='Carregando clientes...' />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>{item.nomeFantasia} </option>
                                    )
                                })}
                            </select>
                        )}



                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value={'Suporte'}>Suporte</option>
                            <option value={'Visita Tecnica'}>Visita Tecnica</option>
                            <option value={'Financeiro'}>Financeiro</option>
                        </select>

                        <label >Status</label>
                        <div className='status'>
                            <input
                                type={'radio'}
                                name='radio'
                                value='Aberto'
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />

                            <span>Em aberto</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value='Progresso'
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />

                            <span>Progesso</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value='Atendido'
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva seu problema'
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        />

                        <button type='submit'>Registar</button>

                    </form>

                </div>

            </div>
        </div>
    );
}