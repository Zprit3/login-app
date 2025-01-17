import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (window.csrfToken) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.csrfToken;
} else {
    console.error('CSRF token not found (window.csrfToken)');
}