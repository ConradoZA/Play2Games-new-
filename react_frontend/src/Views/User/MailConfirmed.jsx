import React, { useEffect } from "react";

import { confirmedEmail } from "../../Redux/actions/users";
import { API_URL_IMAGES } from "../../api-config";
import { useHistory } from "react-router-dom";

const MailConfirmed = (props) => {
	const history = useHistory();
	const token = props.match.params.passToken;
	useEffect(() => {
		confirmedEmail(token)
			.then((_res) => {
				setTimeout(() => {
					history.push("/profile");
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
		return () => {
			clearTimeout();
		};
	}, [token, history]);

	return (
		<img
			className='img-100'
			src={API_URL_IMAGES + "boardgames.jpg"}
			alt='Congrats, mail confirmed'
		/>
	);
};

export default MailConfirmed;
