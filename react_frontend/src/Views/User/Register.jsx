import React, { useEffect, useState } from "react";
import { register } from "../../Redux/actions/users";
import {
	Avatar,
	Button,
	Grid,
	Typography,
	Container,
	Snackbar,
	Slide,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Register = (props) => {
	const history = useHistory();
	const classes = useStyles();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [openS, setOpenS] = useState(false);
	const [openF, setOpenF] = useState(false);

	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== password) {
				return false;
			}
			return true;
		});
		return () => {
			ValidatorForm.removeValidationRule("isPasswordMatch");
		};
	}, [rePassword, password]);

	const TransitionDown = (props) => {
		return <Slide {...props} direction='down' />;
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenF(false);
		setOpenS(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			name,
			email,
			password,
			image: "",
		};
		register(user)
			.then((_res) => {
				setOpenS(true);
				setTimeout(() => {
					history.push("/login");
				}, 1500);
			})
			.catch((_error) => {
				setOpenF(true);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Registro
				</Typography>
				<ValidatorForm
					className={classes.form}
					onSubmit={handleSubmit}
					onError={(errors) => console.log(errors)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextValidator
								name='name'
								onChange={(event) => {
									setName(event.target.value);
								}}
								value={name}
								variant='outlined'
								required
								fullWidth
								label='Nombre'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								name='email'
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								value={email}
								variant='outlined'
								required
								fullWidth
								label='Dirección de e-mail'
								type='email'
								validators={["isEmail"]}
								errorMessages={["Dirección no válida"]}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								name='password'
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								value={password}
								variant='outlined'
								required
								fullWidth
								label='Contraseña'
								type='password'
								validators={[
									"minStringLength:6",
									"matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+*=@#$%^&])(?=.{6,})",
								]}
								errorMessages={[
									"Longitud mínima: 6 caracteres",
									"Debe contener minúscula, mayúscula, número y caracter especial",
								]}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								name='rePassword'
								onChange={(event) => {
									setRePassword(event.target.value);
								}}
								value={rePassword}
								variant='outlined'
								required
								fullWidth
								label='Repite la contraseña'
								type='password'
								validators={["isPasswordMatch"]}
								errorMessages={["Las contraseñas no coinciden"]}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Enviar
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link className='link-like' to='/login' variant='body2'>
								¿Ya tienes una cuenta? ¡Conéctate!
							</Link>
						</Grid>
					</Grid>
				</ValidatorForm>
			</div>
			<Snackbar
				open={openS}
				autoHideDuration={3000}
				TransitionComponent={TransitionDown}
				onClose={handleClose}>
				<Alert elevation={6} variant='filled' severity='success' onClose={handleClose}>
					¡Bienvenido! Ya estás registrado.
				</Alert>
			</Snackbar>
			<Snackbar
				open={openF}
				autoHideDuration={3000}
				TransitionComponent={TransitionDown}
				onClose={handleClose}>
				<Alert elevation={6} variant='filled' severity='error' onClose={handleClose}>
					¡Ha habido un problema!
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Register;
