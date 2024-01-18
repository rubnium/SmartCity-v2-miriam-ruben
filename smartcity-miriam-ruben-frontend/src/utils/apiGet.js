import api from './api';

const apiGet = (endpoint, setData, setError) => {
    api.get(endpoint)
    .then((res) => { setData(res.data); })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            window.alert('Error: Sesión expirada o inválida. Vuelva a autenticarse.');
            window.location.href = "/login";
        } else {
            console.error('Error al obtener datos:', error);
            setError(error.message || 'Error en la solicitud');
        }
    });
};

export default apiGet;