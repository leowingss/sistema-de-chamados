import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Dashboard() {

    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut();
    }


    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleSignOut}>Sair</button>
        </div>
    );
}