import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);


    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(nome, email, password);

        try {
            const response = await axios.post('http://localhost:3001/cadastro',
                JSON.stringify({ nome, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log(response.data);
            setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status === 401) {
                setError('Usuário ou senha inválidos')
            };
        };
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
        setEmail('');
    };

    return (
        <div className="cadastro-form-wrap">
            {user === null ? (
                <div>
                    <h2>Cadastro</h2>
                    <form className='cadastro-form'>
                        <input type="nome"
                            name="nome"
                            placeholder="Nome"
                            required
                            onChange={(e) => setNome(e.target.value)} />
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit"
                            className='btn-cadastro'
                            onClick={(e) => handleLogin(e)}>Cadastro</button>
                    </form>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <h1>Ola, {user.name}</h1>
                    <button type="button"
                        className='btn-login'
                        onClick={(e) => handleLogout(e)}> Logout</button>

                </div>
            )}
        </div>
    );
}

export default Cadastro;