import React, { useState, useEffect } from "react";
import AllGames from "./AllGames";
import CheckersGame from "./CheckersGame";
import { connect } from "react-redux";
import {
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	ListSubheader,
	Dialog,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CasinoRoundedIcon from "@material-ui/icons/CasinoRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import AllInclusiveRoundedIcon from "@material-ui/icons/AllInclusiveRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CheckersRules from "../../Components/CheckersRules";
import { unsetGame } from "../../Redux/actions/checkerGames";
import SendInvitation from "./SendInvitation";
import SendDraw from "./SendDraw";
import SendSurrender from "./SendSurrender";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	drawer: {
		[theme.breakpoints.down("md")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up("md")]: {
			marginTop: "70px",
		},
	},
	content: {
		flexGrow: 1,
		paddingRight: theme.spacing(3),
		paddingLeft: theme.spacing(1),
		paddingTop: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			paddingLeft: drawerWidth,
		},
	},
}));

const MainDrawer = (props) => {
	const window = props.window;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openRules, setOpenRules] = useState(false);
	const [openInvitation, setOpenInvitation] = useState(false);
	const [openDraw, setOpenDraw] = useState(false);
	const [openSurrender, setOpenSurrender] = useState(false);
	const showOne = !props.checkersGame.unset;
	const showAll = !showOne;

	useEffect(() => {
		return () => {
			unsetGame();
		};
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMain = () => {
		unsetGame();
	};

	const handleCheckersRules = () => {
		setOpenRules(!openRules);
	};
	const handleInvitationModal = () => {
		setOpenInvitation(!openInvitation);
	};
	const handleDrawModal = () => {
		setOpenDraw(!openDraw);
	};
	const handleSurrenderModal = () => {
		setOpenSurrender(!openSurrender);
	};

	const drawer = (
		<div>
			<List>
			<Toolbar className={classes.appbar}/>
				<ListItem onClick={handleMain} className='pointer'>
					<ListItemIcon>
						<CasinoRoundedIcon />
					</ListItemIcon>
					<ListItemText primary='Partidas en progreso' />
				</ListItem>
			</List>
			<Divider />
			<List subheader={<ListSubheader component='div'>Damas</ListSubheader>}>
				<ListItem onClick={handleCheckersRules} className='pointer'>
					<ListItemIcon>
						<DescriptionRoundedIcon />
					</ListItemIcon>
					<ListItemText primary='Reglas' />
				</ListItem>
				{showAll && (
					<ListItem onClick={handleInvitationModal} className='pointer'>
						<ListItemIcon>
							<AddCircleOutlineRoundedIcon />
						</ListItemIcon>
						<ListItemText primary='Nueva Partida' />
					</ListItem>
				)}
				{showOne && (
					<ListItem onClick={handleDrawModal} className='pointer'>
						<ListItemIcon>
							<AllInclusiveRoundedIcon />
						</ListItemIcon>
						<ListItemText primary='Ofrecer Tablas' />
					</ListItem>
				)}
				{showOne && (
					<ListItem onClick={handleSurrenderModal} className='pointer'>
						<ListItemIcon>
							<HighlightOffRoundedIcon />
						</ListItemIcon>
						<ListItemText primary='Rendirse' />
					</ListItem>
				)}
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<div className={classes.root}>
			{props.user && (
				<>
					<Toolbar className={classes.appbar}>
						<IconButton
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
					<nav className={(classes.drawer, "drawer")}>
						<Hidden smUp implementation='css'>
							<Drawer
								container={container}
								variant='temporary'
								anchor={theme.direction === "rtl" ? "right" : "left"}
								open={mobileOpen}
								onClose={handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								ModalProps={{
									keepMounted: true,
								}}>
								{drawer}
							</Drawer>
						</Hidden>
						<Hidden smDown implementation='css'>
							<Drawer
								classes={{
									paper: classes.drawerPaper,
								}}
								variant='permanent'
								open>
								{drawer}
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						{showAll && <AllGames />}
						{showOne && <CheckersGame />}
					</main>
					<Dialog open={openRules} onClose={handleCheckersRules} fullWidth>
						<CheckersRules />
					</Dialog>
					<Dialog open={openInvitation} onClose={handleInvitationModal} fullWidth>
						<SendInvitation handleInvitationModal={handleInvitationModal} />
					</Dialog>
					<Dialog open={openDraw} onClose={handleDrawModal} fullWidth>
						<SendDraw id={props.checkersPlay.id} handleDrawModal={handleDrawModal} />
					</Dialog>
					<Dialog open={openSurrender} onClose={handleSurrenderModal} fullWidth>
						<SendSurrender
							id={props.checkersPlay.id}
							handleSurrenderModal={handleSurrenderModal}
						/>
					</Dialog>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user.user,
	allCheckersGame: state.allCheckersGame,
	checkersGame: state.checkersGame,
	checkersPlay: state.checkersPlay,
});
export default connect(mapStateToProps)(MainDrawer);
