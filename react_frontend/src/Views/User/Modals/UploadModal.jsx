import React, { useRef, useState } from "react";
import SnackBar from "../../../Components/SnackBar";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { uploadImage } from "../../../Redux/actions/users";

const UploadModal = ({ handleUploadModal }) => {
	const uploadRef = useRef();
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const [imageUpload, setImageUpload] = useState("");
	const [previewUrl, setPreviewUrl] = useState("");

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleChange = (event) => {
		setImageUpload(event.target.files[0]);
		let reader = new FileReader();
		reader.onloadend = () => {
			setPreviewUrl(reader.result);
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleUpload = (event) => {
		event.preventDefault();
		const fd = new FormData();
		fd.append("image", imageUpload, imageUpload.name);
		uploadImage(fd)
			.then((_res) => {
				setMessage("Imagen subida");
				setType("success");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("error");
				openSnackBar();
			});
		setTimeout(() => {
			handleUploadModal();
		}, 2500);
	};

	return (
		<Card>
			<CardHeader title='Carga tu imagen' />
			<CardContent>
				<form onSubmit={handleUpload} className='flex-column center'>
					<Button
						variant='contained'
						color='primary'
						size='small'
						onClick={() => {
							uploadRef.current.click();
						}}>
						Elegir archivo
					</Button>
					<br />
					<input
						name='image'
						onChange={handleChange}
						type='file'
						className='display-none'
						ref={uploadRef}
					/>
					{previewUrl ? (
						<img src={previewUrl} alt='' width='200px' />
					) : (
						<div>
							<br />
							<br />
						</div>
					)}
					<br />
					<Button type='submit' size='small' variant='contained' color='primary'>
						Subir
					</Button>
				</form>
			</CardContent>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default UploadModal;
