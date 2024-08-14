import React, { useState } from 'react'

//Import de la hoja de estilos
import './UserGithubInput.css'

//import LoadingGif from '../assets/images/loading.gif'


function UserGithubInput() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    //const [repos, setRepos] = useState([]);
    const [reposWithDetails, setReposWithDetails] = useState([]);
    //const [reposWithContributors, setReposWithContributors] = useState([]);
    //const [issues, setIssues] = useState([]);
    //const [stargazers, setStargazers] = useState([]);
    //const [events, setEvents] = useState([]);
    //const [gists, setGists] = useState([]);
    //const [branches, setBranches] = useState([]);
    //const [releases, setReleases] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    const apiGitHub = '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'

    const fetchUser = async () => {
        //setLoading(true); // Inicia la carga
        //setError(null); // Limpia cualquier error previo
        setUser(null);
        setReposWithDetails([]);
        try {
            const userResponse = await fetch(`https://api.github.com/users/${search}`, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`,
                }
            });

            if (!userResponse.ok) {
                throw new Error('Error en la consulta de la api')
            }

            const userData = await userResponse.json();
            console.log('User Data:', userData); // Verifica la respuesta del usuario
            setUser(userData);


            // Fetch de los repositorios
            const reposResponse = await fetch(userData.repos_url, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`,
                }
            });

            if (!reposResponse.ok) {
                throw new Error('Error en la consulta de la api para repositorios');
            }

            const reposData = await reposResponse.json();
            console.log('Repos Data:', reposData); // Verifica la respuesta de los repositorios
            const reposWithDetailsData = [];

            // Itera sobre cada repositorio para obtener sus contribuidores
            for (let repo of reposData) {
                const [contributorsResponse, issuesResponse, branchesResponse, stargazersResponse, releasesResponse] = await Promise.all([
                    fetch(repo.contributors_url, {
                        headers: { Authorization: `Bearer ${apiGitHub}` }
                    }),
                    fetch(`${repo.url}/issues`, {
                        headers: { Authorization: `Bearer ${apiGitHub}` }
                    }),
                    fetch(`${repo.url}/branches`, {
                        headers: { Authorization: `Bearer ${apiGitHub}` }
                    }),
                    fetch(`${repo.url}/stargazers`, {
                        headers: { Authorization: `Bearer ${apiGitHub}` }
                    }),
                    fetch(`${repo.url}/releases`, {
                        headers: { Authorization: `Bearer ${apiGitHub}` }
                    })
                ])

                const [contributorsText, issuesText, branchesText, stargazersText, releasesText] = await Promise.all([
                    contributorsResponse.text(),
                    issuesResponse.text(),
                    branchesResponse.text(),
                    stargazersResponse.text(),
                    releasesResponse.text(),
                ]);

                const [contributorsData, issuesData, branchesData, stargazersData, releasesData] = [
                    contributorsText ? JSON.parse(contributorsText) : [],
                    issuesText ? JSON.parse(issuesText) : [],
                    branchesText ? JSON.parse(branchesText) : [],
                    stargazersText ? JSON.parse(stargazersText) : [],
                    releasesText ? JSON.parse(releasesText) : []
                ];

                /*
                const [contributorsData, issuesData, branchesData, stargazersData, releasesData] = await Promise.all([
                    contributorsResponse.json(),
                    issuesResponse.json(),
                    branchesResponse.json(),
                    stargazersResponse.json(),
                    releasesResponse.json(),
                ]);
                */

                reposWithDetailsData.push({
                    ...repo,
                    contributors: contributorsResponse.ok ? contributorsData : [],
                    issues: issuesResponse.ok ? issuesData : [],
                    branches: branchesResponse.ok ? branchesData : [],
                    events: stargazersResponse.ok ? stargazersData : [],
                    releases: releasesResponse.ok ? releasesData : [],
                });
            }
            setReposWithDetails(reposWithDetailsData); // Actualiza el estado con los repositorios y sus detalles


            /*
            //Fetch para los eventos
            // Realiza una solicitud para obtener los eventos públicos del usuario.
            const eventsResponse = await fetch(userData.events_url, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`, // Autenticación con el token de GitHub.
                }
            });

            // Si la respuesta no es exitosa, lanza un error.
            if (!eventsResponse.ok) {
                throw new Error('Error en la consulta de la API para los eventos');
            }

            // Convierte la respuesta a JSON y guarda los datos de los eventos en el estado 'events'.
            const eventsData = await eventsResponse.json();
            setEvents(eventsData);


            //Fetch para los gists
            // Realiza una solicitud para obtener los gists públicos del usuario.
            const gistsResponse = await fetch(userData.gists_url, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`, // Autenticación con el token de GitHub.
                }
            });

            // Si la respuesta no es exitosa, lanza un error.
            if (!gistsResponse.ok) {
                throw new Error('Error en la consulta de la API para los gists');
            }

            // Convierte la respuesta a JSON y guarda los datos de los gists en el estado 'gists'.
            const gistsData = await gistsResponse.json();
            setGists(gistsData);
            */

        } catch (error) {
            console.error('error', error.message);
            //setError('Error al obtener los repositorios.');
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
            <article className='article-about-user'>
                {user && (
                    <div className="user-github">
                        <img src={user.avatar_url} alt='avatar-user-github' className='avatar-user-github' />
                        <h4 key={user.login} className='username-github'>{user.login}</h4>
                        <p className='bio-github'>{user.bio}</p>
                    </div>
                )}

                {reposWithDetails.length > 0 && (
                    <div className="repos-github">
                        <h3>Repositorios</h3>
                        <ul>
                            {reposWithDetails.map((repo) => (
                                <li key={repo.id} className='repo-github'>
                                    <p><strong>Nombre: </strong><a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a></p>
                                    <p><strong>Descripción: </strong>{repo.description}</p>

                                    {repo.contributors.length > 0 && (
                                        <div>
                                            <p><strong>Contribuidores:</strong></p>
                                            <ul>
                                                {repo.contributors.map((contributor) => (
                                                    <li key={contributor.id}>
                                                        <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                                                            {contributor.login}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {repo.issues.length > 0 && (
                                        <div>
                                            <p><strong>Issues:</strong></p>
                                            <ul>
                                                {repo.issues.map((issue) => (
                                                    <li key={issue.id}>
                                                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                                                            {issue.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {repo.branches.length > 0 && (
                                        <div>
                                            <p><strong>Branches:</strong></p>
                                            <ul>
                                                {repo.branches.map((branch) => (
                                                    <li key={branch.name}>
                                                        {branch.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {repo.events.length > 0 && (
                                        <div>
                                            <p><strong>Eventos:</strong></p>
                                            <ul>
                                                {repo.events.map((event) => (
                                                    <li key={event.id}>
                                                        {event.type}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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