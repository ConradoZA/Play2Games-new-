import React, { useState } from "react";
import UploadModal from "./Modals/UploadModal";
import HttpModal from "./Modals/HttpModal";
import Password from "./Modals/PasswordModal";
import Delete from "./Modals/DeleteModal";
import BaseProfile from "../../Components/Profile";
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
	Dialog,
	ListSubheader,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LockIcon from "@material-ui/icons/Lock";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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

const Profile = (props) => {
	const user = props.user.user;
	const window = props.window;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openUpload, setOpenUpload] = useState(false);
	const [openHttp, setOpenHttp] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleUploadModal = () => {
		setOpenUpload(!openUpload);
	};
	const handleHttpModal = () => {
		setOpenHttp(!openHttp);
	};
	const handlePasswordModal = () => {
		setOpenPassword(!openPassword);
	};
	const handleDeleteModal = () => {
		setOpenDelete(!openDelete);
	};

	const drawer = (
		<div>
			<List
				subheader={
					<ListSubheader component='div' id='nested-list-subheader'>
						Personalización
					</ListSubheader>
				}>
				<ListItem onClick={handleUploadModal} className='pointer'>
					<ListItemIcon>
						<FileCopyIcon />
					</ListItemIcon>
					<ListItemText primary='Subir imagen' />
				</ListItem>
				<ListItem onClick={handleHttpModal} className='pointer'>
					<ListItemIcon>
						<ImageSearchIcon />
					</ListItemIcon>
					<ListItemText primary='Link a imagen' />
				</ListItem>
			</List>
			<Divider />
			<List subheader={<ListSubheader component='div'>Seguridad</ListSubheader>}>
				<ListItem onClick={handlePasswordModal} className='pointer'>
					<ListItemIcon>
						<LockIcon />
					</ListItemIcon>
					<ListItemText primary='Cambiar contraseña' />
				</ListItem>
				<ListItem onClick={handleDeleteModal} className='pointer'>
					<ListItemIcon>
						<DeleteForeverIcon />
					</ListItemIcon>
					<ListItemText primary='Borrar usuario' />
				</ListItem>
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			{user && (
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
						<BaseProfile />
						<Dialog open={openUpload} onClose={handleUploadModal} fullWidth>
							<UploadModal handleUploadModal={handleUploadModal} />
						</Dialog>
						<Dialog open={openHttp} onClose={handleHttpModal} fullWidth>
							<HttpModal image={user.image_path} handleHttpModal={handleHttpModal} />
						</Dialog>
						<Dialog open={openPassword} onClose={handlePasswordModal} fullWidth>
							<Password handlePasswordModal={handlePasswordModal} />
						</Dialog>
						<Dialog open={openDelete} onClose={handleDeleteModal} fullWidth>
							<Delete handleDeleteModal={handleDeleteModal} />
						</Dialog>
					</main>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
