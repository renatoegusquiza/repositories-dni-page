import React, { useState } from 'react'

//Import de la hoja de estilos
import './UserGithubInput.css'

function UserGithubInput() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);

    const fetchUser = async () => {
        try {
            const userResponse = await fetch(`https://api.github.com/users/${search}`);
            const userData = await userResponse.json();

            setUser(userData);

            // Fetch de los repositorios
            const reposResponse = await fetch(userData.repos_url);
            const reposData = await reposResponse.json();
            setRepos(reposData);
        } catch (error) {
            console.error('error', error.message);

        }
    }

    return (
        <div className='search-user-container'>
            <div className='search-user-github'>
                <input
                    type="text"
                    placeholder=''
                    className="user-github-input"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label>Nombre del usuario</label>
            </div>
            <button onClick={fetchUser} className='start-button'>Buscar</button>
            <article>
                {user && (
                    <div className="user-github">
                        <img src={user.avatar_url} alt='avatar-user-github' className='avatar-user-github' />
                        <h4 key={user.login} className='username-github'>{user.login}</h4>
                        <p className='bio-github'>{user.bio}</p>
                    </div>
                )}
                {repos.length > 0 && (
                    <div className="repos-github">
                        <h3>Repositorios:</h3>
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.id}>
                                    <p><strong>Nombre: </strong><a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a></p>
                                    <p><strong>Descripción: </strong>{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </article>
        </div>
    )
}

export default UserGithubInput