import api from './api';

const handleError = (error, setError) => {
    if (error.response && error.response.status === 401) {
        window.alert('Error: Sesión expirada o inválida. Vuelva a autenticarse.');
        window.location.href = "/login";
    } else {
        console.error('Error al obtener datos:', error);
        setError(error.message || 'Error en la solicitud');
    }
};

const apiGet = (endpoint, setData, setError) => {
    api.get(endpoint)
    .then((res) => { setData(res.data); })
    .catch((error) => { handleError(error, setError); });
};

const apiPut = (endpoint, body, setError) => {  
    api.put(endpoint, body)
    .then((res) => { console.log('Respuesta exitosa:', res.data); })
    .catch((error) => { handleError(error, setError); });
};

export { apiGet, apiPut };