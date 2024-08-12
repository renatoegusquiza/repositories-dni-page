import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoadingGif from '../assets/images/loading.gif'

import './GitHubRepos.css'

// Componente principal que se encarga de mostrar los repositorios de GitHub
const GitHubRepos = () => {
    // Definición de estados:
    // - repos: almacena la lista de repositorios obtenida de la API
    // - loading: indica si los datos aún se están cargando
    // - error: almacena cualquier error que ocurra durante la obtención de datos
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hook useEffect que se ejecuta una vez cuando el componente se monta
    useEffect(() => {

        // Función asíncrona para obtener los repositorios y sus contribuidores
        const fetchRepos = async () => {
            // Reemplaza esto con tu token de acceso personal
            const token = process.env.REACT_APP_GITHUB_TOKEN;; // Token de acceso personal a la API de GitHub
                                                               //Esto llama al token dentro de la variable de entorno

            try {
                // Llamada a la API de GitHub para obtener los repositorios del usuario
                const response = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `token ${token}`, // Autenticación con el token personal 
                        Accept: 'application/vnd.github.v3+json', // Especifica que se use la versión 3 de la API de GitHub
                    },
                });

                // Obtener contribuidores para cada repositorio usando Promise.all para hacer solicitudes paralelas
                const reposWithContributors = await Promise.all(
                    response.data.map(async (repo) => {
                        try {
                            // Llamada a la API para obtener los contribuidores de cada repositorio
                            const contributorsResponse = await axios.get(repo.contributors_url, {
                                headers: {
                                    Authorization: `token ${token}`,
                                    Accept: 'application/vnd.github.v3+json',
                                },
                            });
                            return {
                                ...repo, // Copia el objeto del repositorio original
                                contributors: contributorsResponse.data // Agrega los contribuidores al objeto del repositorio
                            };
                        } catch (error) {
                            // Manejo de errores si la solicitud para obtener contribuidores falla
                            console.error(`Error al obtener los contribuidores para el repo ${repo.name}:`, error);
                            return {
                                ...repo,
                                contributors: [], // Asegura que contributors siempre sea un array, incluso si hay un error
                            };
                        }

                    })
                );

                // Actualiza el estado con la lista de repositorios y sus contribuidores
                setRepos(reposWithContributors);
            } catch (error) {
                // Manejo de errores si la solicitud para obtener repositorios falla
                setError('Error al obtener los repositorios.');
            } finally {
                // Una vez que la solicitud se completa (éxito o error), cambia el estado de loading a false
                setLoading(false);
            }
        };

        // Llama a la función para obtener los repositorios y sus contribuidores
        fetchRepos();
    }, []);// El array vacío asegura que el useEffect solo se ejecute una vez cuando el componente se monta

    if (loading) {
        return <p className='loading-repositories'>Cargando repositorios... <img src={LoadingGif} alt='loading-gif' className='loading-gif' /></p>;
    }
    if (error) return <p>{error}</p>;

    return (
        <section className='section-repositories'>
            <h2 className='title-section-repositories'>Mis Repositorios de GitHub</h2>
            <ul className='repository-items'>
                {repos.map((repo) => (
                    <li key={repo.id} className='repository-item'>
                        <h3>
                            <strong>Respositorio: </strong>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className='repository-link'>
                                {repo.name}
                            </a>
                        </h3>
                        <div className='owner-contributors'>
                            <h3>
                                <p>
                                    <strong>Dueño: </strong>
                                    {repo.owner.login}
                                </p>
                            </h3>
                            <h3>
                                <p>
                                    <strong>Autores: </strong> {repo.contributors && repo.contributors.length > 0
                                        ? repo.contributors.map(contributor => contributor.login).join(', ')
                                        : 'No hay autores disponibles'}
                                </p>
                            </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GitHubRepos;
