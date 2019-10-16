import React, {useState, useMemo} from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, SetTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
   

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}    
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select Img"/>
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                type="company" 
                id="company" 
                placeholder="Digite sua empresa" 
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">Tecnlogias * <span>(Separe por virgula)</span></label>
            <input 
                type="techs" 
                id="techs" 
                placeholder="Digite suas techs" 
                value={techs}
                onChange={event => SetTechs(event.target.value)}
            />
            <label htmlFor="price">Preço <span> (Em branco gratuito)</span></label>
            <input 
                type="price" 
                id="price" 
                placeholder="Valor diaria" 
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
            </form>
    )
}
