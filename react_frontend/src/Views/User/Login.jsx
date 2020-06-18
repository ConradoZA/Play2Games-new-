import React, { useState } from "react";
import SnackBar from "../../Components/SnackBar";
import {
	Avatar,
	Button,
	TextField,
	Grid,
	Typography,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import { login, sendRecoverEmail } from "../../Redux/actions/users";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const history = useHistory();
	const classes = useStyles();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [sendMail, setSendMail] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");

	const handleSendMail = () => {
		setSendMail(!sendMail);
	};

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleSendMailPassword = (event) => {
		event.preventDefault();
		sendRecoverEmail(email)
			.then((res) => {
				if (!res) {
					setMessage("No existe ese usuario");
					setType("error");
				} else {
					setMessage("Revisa tu cuenta de correo");
					setType("success");
				}
				openSnackBar();
				setTimeout(() => {
					handleSendMail();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			email,
			password,
		};
		login(user)
			.then(() => {
				setMessage("¡Bienvenido! ¿Preparad@ para jugar?");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					history.push("/myGames");
				}, 2500);
			})
			.catch(() => {
				setMessage("Usuario o contraseña incorrectas");
				setType("error");
				openSnackBar();
			});
	};

	const handleShowPassword = () => {
		setShowPass(!showPass);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Conéctate
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Dirección de e-mail'
						name='email'
						type='email'
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						value={email}
					/>
					<TextField
						variant='outlined'
						type={showPass ? "text" : "password"}
						margin='normal'
						required
						fullWidth
						name='password'
						id='password'
						label='Contraseña'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={handleShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'>
										{showPass ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
						value={password}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Entrar
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to='#' className='link-like' onClick={handleSendMail} variant='body2'>
								¿Te olvidaste la contraseña?
							</Link>
						</Grid>
						<Grid item>
							<Link className='link-like' to='/register' variant='body2'>
								¡Regístrate!
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Dialog open={sendMail} onClose={handleSendMail} fullWidth>
				<DialogTitle>¿No recuerdas tu contraseña?</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSendMailPassword} className='flex-column center'>
						<p>
							Por favor, escribe el mail asociado a tu usuario.
							<br />
							Te enviaremos un correo con un enlace para que puedas crear una nueva
							contraseña.
						</p>
						<br />
						<TextField
							variant='outlined'
							name='email'
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							required
							label='Tu dirección de e-mail'
						/>
						<br />
						<Button type='submit' variant='contained' color='primary'>
							Enviar correo
						</Button>
					</form>
				</DialogContent>
			</Dialog>
			<SnackBar type={type} open={open} message={message} />
		</Container>
	);
};

export default Login;
