

const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: 'include',
    });

    if (response.status === 401) {
        alert('Please log in to access this feature.');
        window.location.href = 'http://localhost:3000/login';
        return null;
    }

    return response;
};

export default fetchWithAuth;