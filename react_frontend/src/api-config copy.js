let backendHost1;
let backendHost2;
if (window.location.href.includes('localhost')) {
    backendHost1 = 'http://localhost:3001';
    backendHost2 = 'http://localhost:8000';
} else {
    backendHost1 = 'your-domain';
    backendHost2 = 'your-domain';
}

export const API_URL_1 = `${backendHost1}/`;
export const API_URL_2 = `${backendHost2}/`;
export const API_URL_IMAGES = `${backendHost2}/images/`