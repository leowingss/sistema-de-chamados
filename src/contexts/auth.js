import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    async function signUp(email, password, nome) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };

                        setUser(data);
                        storageUser(data);
                        loadingAuth(false);
                        toast.success('Bem vindo a plataforma');
                    })
            })
            .catch((err) => {
                console.log(err);
                toast.error('Erro ao cadastrar');
                setLoadingAuth(false);
            })
    }

    async function signIn(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid
                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                }


                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo(a) de volta ${userProfile.data().nome}`);

            })
            .catch(err => {
                console.log(err);
                toast.error('Algo deu errado');
                setLoadingAuth(false);
            })
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                loadingAuth,
                signUp,
                signOut,
                signIn,
                setUser,
                storageUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}