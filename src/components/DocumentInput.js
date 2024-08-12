import React, { useState, useEffect } from 'react'

//Import de la hoja de estilos
import './DocumentInput.css'

function DocumentInput({ onDocumentChange }) {
    const [documentType, setDocumentType] = useState('DNI');
    const [numberDocument, setNumberDocument] = useState('');


    useEffect(() => {
        // Llama a la función onDocumentChange cuando cambian los valores
        onDocumentChange(documentType, numberDocument);
    }, [documentType, numberDocument, onDocumentChange]);

    return (
        <div className='document-input-container'>
            <div className='document-type-select'>
                <select value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className='select-box'>
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
                <span className="arrow down"></span>
            </div>
            <input
                type="text"
                placeholder='Nro. de documento'
                value={numberDocument}
                onChange={(e) => setNumberDocument(e.target.value)}
                className="document-number-input"
            />
        </div>
    )
}

export default DocumentInput