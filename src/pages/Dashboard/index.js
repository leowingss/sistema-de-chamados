import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format, setDate } from 'date-fns';
import Modal from '../../components/Modal';
import './dashboard.css';


const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc')

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {

        loadChamados();

        return () => {

        }

    }, [])

    async function loadChamados() {
        await listRef.limit(5)
            .get()
            .then(snapshot => {
                updateState(snapshot);
            })
            .catch(err => {
                console.log(err);
                setLoadingMore(false);
            })

        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    complemento: doc.data().complemento,
                    status: doc.data().status
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //pegando o ultimo doc

            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot);
            })
    }

    function togglePostModal(item) {
        setShowPostModal(!showPostModal)
        setDetail(item);
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className='content'>
                    <Title name='Atendimentos'>
                        <FiMessageSquare color='#000' size={25} />
                    </Title>
                    <div className='container dashboard'>
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        )
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

                            <tbody >
                                {chamados.map((chamado, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label='Cliente'> {chamado.cliente} </td>
                                            <td data-label='Assunto'> {chamado.assunto} </td>
                                            <td data-label='Status'>
                                                <span className='badge' style={{ backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : '#999' }}> {chamado.status} </span>
                                            </td>
                                            <td data-label='Cadastrado'> {chamado.createdFormated}</td>
                                            <td data-label='#'>
                                                <button onClick={() => togglePostModal(chamado)} className='action' style={{ backgroundColor: '#3583f6' }}>
                                                    <FiSearch color='#fff' size={17} />
                                                </button>
                                                <button onClick={() => { }} className='action' style={{ backgroundColor: '#f6a935' }}>
                                                    <FiEdit2 color='#fff' size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

                    </>
                )}
            </div>

            {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}

        </div>
    );


}