import React from "react";
import { useHistory } from "react-router-dom";
import { API_URL_IMAGES } from "../../api-config";

const Home = () => {
	const history = useHistory();
	const isToken = localStorage.getItem("authToken");
	if (isToken) {
		history.push("/myGames");
	}
	return (
		<main className='flex-column center'>
			<h1 className='justify-center'>El portal de juegos de mesa para 2 jugadores</h1>
			<h2 className='justify-center'>
				¿Te apetece jugar con gente de nuestra comunidad?
			</h2>
			<h3>¡Conéctate ya!</h3>
			<br/><br/>
			<img
				className='img-home'
				alt=''
				src={API_URL_IMAGES + "images/board-games-for-couples-1.jpg"}></img>
			<img
				className='img-home'
				alt=''
				src={API_URL_IMAGES + "images/als_ich_kan.jpg"}></img>
				<br/>
		</main>
	);
};

export default Home;
