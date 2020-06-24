let backendHost1;
let backendHost2;
if (window.location.href.includes('localhost')) {
    backendHost1 = 'http://localhost:3001';
    backendHost2 = 'http://localhost:8000';
} else {
    backendHost1 = 'https://play-two-games-mongo.herokuapp.com';
    backendHost2 = 'https://play-two-games-users.herokuapp.com';
}

export const API_URL_1 = `${backendHost1}/`;
export const API_URL_2 = `${backendHost2}/api/v1/`;
// export const API_URL_IMAGES = `${backendHost2}/images/`
export const API_URL_IMAGES = `https://play2games.s3.eu-west-1.amazonaws.com/`