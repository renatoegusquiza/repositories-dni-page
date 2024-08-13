import React, { useState } from 'react'

//Import de la hoja de estilos
import './UserGithubInput.css'

function UserGithubInput() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [reposWithContributors, setReposWithContributors] = useState([]);
    const [issues, setIssues] = useState([]);
    const [stargazers, setStargazers] = useState([]);
    const [releases, setReleases] = useState([]);

    const apiGitHub = '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'

    const fetchUser = async () => {
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
            const reposWithContributorsData = [];

            // Itera sobre cada repositorio para obtener sus contribuidores
            for (let repo of reposData) {
                const contributorsResponse = await fetch(repo.contributors_url, {
                    headers: {
                        Authorization: `Bearer ${apiGitHub}`,
                    }
                });

                if (contributorsResponse.ok) {
                    const contributorsData = await contributorsResponse.json();
                    reposWithContributorsData.push({
                        ...repo,
                        contributors: contributorsData, // Agrega los contribuidores al objeto del repositorio
                    });
                } else {
                    reposWithContributorsData.push({
                        ...repo,
                        contributors: [], // En caso de error, asigna una lista vacía
                    });
                }
            }

            setReposWithContributors(reposWithContributorsData); // Actualiza el estado con los repositorios y sus contribuidores


            // Fetch para las issues de cada repositorio
            // Realiza una solicitud para obtener los issues de los repositorios del usuario.
            const issuesResponse = await fetch(`https://api.github.com/repos/${search}/${reposData[0].name}/issues`, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`, // Autenticación con el token de GitHub.
                }
            });

            // Si la respuesta no es exitosa, lanza un error.
            if (!issuesResponse.ok) {
                throw new Error('Error en la consulta de la API para los issues');
            }

            // Convierte la respuesta a JSON y guarda los datos de los issues en el estado 'issues'.
            const issuesData = await issuesResponse.json();
            setIssues(issuesData);


            // Fetch para los stargazers de cada repositorio
            // Realiza una solicitud para obtener los stargazers del repositorio del usuario.
            const stargazersResponse = await fetch(`https://api.github.com/repos/${search}/${reposData[0].name}/stargazers`, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`, // Autenticación con el token de GitHub.
                }
            });

            // Si la respuesta no es exitosa, lanza un error.
            if (!stargazersResponse.ok) {
                throw new Error('Error en la consulta de la API para los stargazers');
            }

            // Convierte la respuesta a JSON y guarda los datos de los stargazers en el estado 'stargazers'.
            const stargazersData = await stargazersResponse.json();
            setStargazers(stargazersData);


            // Fetch para las releases de cada repositorio
            // Realiza una solicitud para obtener las releases del repositorio del usuario.
            const releasesResponse = await fetch(`https://api.github.com/repos/${search}/${reposData[0].name}/releases`, {
                headers: {
                    Authorization: `Bearer ${apiGitHub}`, // Autenticación con el token de GitHub.
                }
            });

            // Si la respuesta no es exitosa, lanza un error.
            if (!releasesResponse.ok) {
                throw new Error('Error en la consulta de la API para las releases');
            }

            // Convierte la respuesta a JSON y guarda los datos de las releases en el estado 'releases'.
            const releasesData = await releasesResponse.json();
            setReleases(releasesData);

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
            <article className='article-about-user'>
                {user && (
                    <div className="user-github">
                        <img src={user.avatar_url} alt='avatar-user-github' className='avatar-user-github' />
                        <h4 key={user.login} className='username-github'>{user.login}</h4>
                        <p className='bio-github'>{user.bio}</p>
                    </div>
                )}
                {repos.length > 0 && (
                    <div className="repos-github">
                        <h3>Repositorios</h3>
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
                {reposWithContributors.length > 0 && (
                    <div className="repos-github">
                        <h3>Repositorios</h3>
                        <ul>
                            {reposWithContributors.map((repo) => (
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
                                                    <li key={contributor.id} className='contributor-github'>
                                                        <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                                                            {contributor.login}
                                                        </a>
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
                {issues.length > 0 && (
                    <div className="issues-github">
                        <h3>Issues</h3>
                        <ul>
                            {issues.map((issue) => (
                                <li key={issue.id}>
                                    <p><strong>Título: </strong><a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                                        {issue.title}
                                    </a></p>
                                    <p><strong>Estado: </strong>{issue.state}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {stargazers.length > 0 && (
                    <div className="stargazers-github">
                        <h3>Stargazers</h3>
                        <ul>
                            {stargazers.map((stargazer, index) => (
                                <li key={index}>
                                    <p><strong>Nombre: </strong>{stargazer.login}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {releases.length > 0 && (
                    <div className="releases-github">
                        <h3>Releases</h3>
                        <ul>
                            {releases.map((release) => (
                                <li key={release.id}>
                                    <p><strong>Nombre: </strong>{release.name}</p>
                                    <p><strong>Publicado en: </strong>{new Date(release.published_at).toLocaleDateString()}</p>
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