import React, { useState } from 'react'
import GitHubRepos from './GitHubRepos';

//Import del componente documentos
import DocumentInput from './DocumentInput'

//Import de los estilos
import './MainContent.css'

export default function MainContent() {
    const [documentType, setDocumentType] = useState('DNI');
    const [numberDocument, setNumberDocument] = useState('');
    const [data, setData] = useState(null);

    const handleDocumentChange = (type, number) => {
        setDocumentType(type);
        setNumberDocument(number);
    };

    const handleSubmit = async () => {

        let apiUrl = '';

        // Se va a construir la URL de la API basada en el tipo de documento y número
        if (documentType === 'DNI') {
            apiUrl = `https://api.example.com/dni/${numberDocument}`;
        } else if (documentType === 'Pasaporte') {
            apiUrl = `https://api.example.com/pasaporte/${numberDocument}`;
        }

        //Aqui iria la logica para enviar los datos
        try{
            const response = await fetch(apiUrl);

            if(!response.ok){
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error){
            console.error('Error al obtener datos:', error);
            setData({ error: 'No se pudo obtener la información' });
        }
    }

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
                        <DocumentInput onDocumentChange={handleDocumentChange}/>
                        <button onClick={handleSubmit} className='start-button'>Comencemos</button>
                    </div>
                </section>
                <GitHubRepos/>
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
