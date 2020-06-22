import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Button,
	Grow,
	Badge,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CasinoIcon from "@material-ui/icons/Casino";
import EmojiEventsRoundedIcon from "@material-ui/icons/EmojiEventsRounded";
import { logout } from "../Redux/actions/users";
import { API_URL_IMAGES } from "../api-config";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

const Header = ({ user, allCheckersGame }) => {
	const history = useHistory();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const myTurn = allCheckersGame
		.map(
			(game) =>
				(game.gamePlay?.turn % 2 === 0 && game.playerTwo === user.name && !game.winner) ||
				(game.gamePlay?.turn % 2 === 1 && game.playerOne === user.name && !game.winner) ||
				(!game.initiated && game.playerTwo === user.name && !game.winner)
		)
		.filter((game) => game === true);
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleLogoutMenuClose = () => {
		setAnchorEl(null);
		logout().then((_res) => history.push("/"));
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id='mobileMenu'
			keepMounted
			transformOrigin={{ vertical: -55, horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			TransitionComponent={Grow}>
			<MenuItem onClick={handleMenuClose}>
				<Link to='/profile' className='mobile-menu'>
					<IconButton color='inherit'>
						<AccountCircle />
					</IconButton>
					<p>Perfil</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link to='/myGames' className='mobile-menu'>
					<IconButton color='inherit'>
						{myTurn.length > 0 ? (
							<Badge
								color='error'
								badgeContent={myTurn.length}
								anchorOrigin={{ horizontal: "left", vertical: "top" }}>
								<CasinoIcon />
							</Badge>
						) : (
							<CasinoIcon />
						)}
					</IconButton>
					<p>Mis Partidas</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link to='/myRecord' className='mobile-menu'>
					<IconButton color='inherit'>
						<EmojiEventsRoundedIcon />
					</IconButton>
					<p>Partidas Terminadas</p>
				</Link>
			</MenuItem>
			<MenuItem onClick={handleLogoutMenuClose}>
				<IconButton color='inherit'>
					<ExitToAppIcon />
				</IconButton>
				<p>Desconectar</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<Link to='/'>
						<img src={API_URL_IMAGES + "logo.png"} alt='' id='title-img' />
					</Link>
					<Link to='/'>
						<h2 id='title-name'>Play 2 Games</h2>
					</Link>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{Object.entries(user).length > 0 ? (
							<div>
								<IconButton edge='end' onClick={handleProfileMenuOpen} color='inherit'>
									{myTurn.length > 0 ? (
										<Badge
											color='error'
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "left",
											}}
											variant='dot'>
											<AccountCircle />
										</Badge>
									) : (
										<AccountCircle />
									)}
								</IconButton>
							</div>
						) : (
							<></>
						)}
					</div>
					{Object.entries(user).length > 0 ? (
						<div className={classes.sectionMobile}>
							<IconButton onClick={handleProfileMenuOpen} color='inherit'>
								{myTurn.length > 0 ? (
									<Badge
										color='error'
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "left",
										}}
										variant='dot'>
										<MoreIcon />
									</Badge>
								) : (
									<MoreIcon />
								)}
							</IconButton>
						</div>
					) : (
						<Link to='/login'>
							<Button variant='contained' color='secondary'>
								Conectar
							</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user.user,
	allCheckersGame: state.allCheckersGame.all,
});
export default connect(mapStateToProps)(Header);
