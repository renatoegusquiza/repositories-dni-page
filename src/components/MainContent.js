import React from 'react'

//Import del componente documentos
import UserGithubInput from './UserGithubInput';

//Import de los estilos
import './MainContent.css'

export default function MainContent() {

    return (
        <>
            <main className='main-container'>
                <section className='start-description-container'>
                    <div className='all-first-section-container'>
                        <p className='start-description-title'>Inicio</p>
                        <h1 className='consultation-title'><strong>Consulta,</strong> afiliación <br />y pago</h1>
                        <p className='start-description-text'>Visualiza los productos asociados a los <br />documentos de los clientes.</p>
                    </div>
                </section>
                <section className='edition-documents-container'>
                    <div className='all-second-section-container'>
                        <p className='edition-documents-title'>Edita los datos para realizar la búsqueda</p>
                        <UserGithubInput/>
                    </div>
                </section>
                {/*data && (
                    <section className='result-container'>
                        {data.error ? (
                            <p>{data.error}</p>
                        ) : (
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        )}
                    </section>
                )*/}
            </main>
        </>
    )
}
