import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css'
import logoImg from '../../assets/logo.svg';

//style: primeira chave indica que é um codigo js, segunda chave indica que é um objeto
//preventDefault: previne o comporamento padrão do formulario de atualizar a pagina
export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            /*enviando os dados cadastrados pela api da pagina ongs, capturando a resposta*/
            const response = await api.post('ongs', data);

            /*utilizando crase, voce pode colocar variaveis dentro do alert, data é o resultado da resposta e id o campo*/
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //apos o cadastro, usuario é enviado para a rota raiz
        }catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/"><FiArrowLeft size={16} color="#E02041"/>Não, tenho cadastro</Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)} /> 
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}