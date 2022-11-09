import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);

    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut();
    }


    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiMessageSquare color='#000' size={25} />
                </Title>

                {chamados.length === 0 ? (
                    <div className='container dashboard'>
                        <span>Nenhum chamado registrado</span>
                        <Link to='/new' className='new'>
                            <FiPlus size={25} color='#fff' />
                            Novo chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to='/new' className='new'>
                            <FiPlus size={25} color='#fff' />
                            Novo chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='coll'>Cliente</th>
                                    <th scope='coll'>Assunto</th>
                                    <th scope='coll'>Status</th>
                                    <th scope='coll'>Cadastrado em </th>
                                    <th scope='coll'># </th>
                                </tr>
                            </thead>

                            {chamados.map(chamado => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td data-label='Cliente'> {chamado.cliente} </td>
                                            <td data-label='Assunto'> {chamado.assunto} </td>
                                            <td data-label='Status'>
                                                <span className='badge' style={{ backgroundColor: '#5cb85c' }}> {chamado.status} </span>
                                            </td>
                                            <td data-label='Cadastrado'> {chamado.cadastrado}</td>
                                            <td data-label='#'>
                                                <button className='action' style={{ backgroundColor: '#3583f6' }}>
                                                    <FiSearch color='#fff' size={17} />
                                                </button>
                                                <button className='action' style={{ backgroundColor: '#f6a935' }}>
                                                    <FiEdit2 color='#fff' size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}


                        </table>

                    </>
                )}



            </div>

        </div>
    );
}