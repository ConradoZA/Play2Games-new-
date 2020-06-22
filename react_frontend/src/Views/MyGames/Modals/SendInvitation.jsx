import React, { useState, useEffect } from "react";
import store from "../../../Redux/store";
import {
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@material-ui/core";
import { getAllUsers } from "../../../Redux/actions/users";
import { waitForAproval, getAllGames } from "../../../Redux/actions/checkerGames";
import SnackBar from "../../../Components/SnackBar";

const SendInvitation = ({ handleInvitationModal }) => {
	const [user, setUser] = useState("");
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const state = store.getState();
	var myself = state.user.user.name;

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};
	useEffect(() => {
		getAllUsers().then((res) => {
			setUsers(res.data.users);
		});
	}, []);

	const handleChange = (event) => {
		setUser(event.target.value);
	};
	const sendTicket = () => {
		waitForAproval(user)
			.then((_res) => {
				setMessage("Invitación enviada. Ahora a esperar");
				setType("success");
				openSnackBar();
				getAllGames();
				setTimeout(() => {
					handleInvitationModal();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Card className='flex-column center'>
			<CardHeader title='Busca un oponente' />
			<CardContent className='space-between'>
				<FormControl>
					<InputLabel id='users'>Usuarios</InputLabel>
					<Select
						labelId='users'
						variant='outlined'
						value={user}
						onChange={handleChange}
						className='input-width'>
						<MenuItem value='' key={"none"}>
							<em>Nadie</em>
						</MenuItem>
						{users?.map((gamer) => {
							if (gamer.name !== myself) {
								return (
									<MenuItem key={gamer.name} value={gamer.name}>
										{gamer.name}
									</MenuItem>
								);
							}
							return "";
						})}
					</Select>
				</FormControl>
				<div className="make-space"></div>
				<Button variant='contained' color='primary' onClick={sendTicket}>
					Enviar Invitación
				</Button>
			</CardContent>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default SendInvitation;
