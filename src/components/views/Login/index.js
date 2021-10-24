/** @jsxImportSource theme-ui */
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { theme } from "../../../theme";
import styles from "./Login.module.css";
import axios from "axios";

export function Login() {

	let history = useHistory();

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: ''
	})

	function handleChange(e) {
		setUserData({
			...userData,
			[e.target.name]: e.target.value
		})
	}

	async function handleSubmit(e) {
		e.preventDefault();
		history.push("/home")
	}

	return (
		<section className="vw-100 vh-100" sx={{
			backgroundColor: theme.colors.purple,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center"
		}}>
			<div
				className={styles.container}
				sx={{
					width: "50%"
				}}
			>
				<img src="/hackfestLogo.png" alt="..." className={styles.image} />
				{console.log("State: ", userData)}

				<form
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%"
					}}
					onSubmit={handleSubmit}

				>
					<p className={`mb-2 ${styles.boldText}`} sx={{
						color: theme.colors.grey,
						fontSize: "1.8rem",
						fontFamily: theme.fonts.montserrat
					}}>Welcome to the hackathon!</p>

					<div className="form-group my-2" sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "50%"
					}}>
						<input placeholder="First name" type="text"
							name="firstName"
							className="my-2 rounded-pill"
							id="exampleInputFN1"
							aria-describedby="emailHelp"
							value={userData.firstName}
							sx={{
								backgroundColor: theme.colors.darkPurple,
								color: theme.colors.white,
								border: "none",
								paddingX: "1rem",
								paddingY: "0.5rem",
								width: "100%",
								filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))",
								fontFamily: theme.fonts.montserratRegular
							}}
							onChange={handleChange}
						/>
						<input
							placeholder="Last name"
							type="text"
							className="my-2 rounded-pill"
							id="exampleInputLN1"
							name="lastName"
							value={userData.lastName}
							sx={{
								backgroundColor: theme.colors.darkPurple,
								color: theme.colors.white,
								border: "none",
								paddingX: "1rem",
								paddingY: "0.5rem",
								width: "100%",
								filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))",
								fontFamily: theme.fonts.montserratRegular
							}}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group my-2">
						<div className="form-group my-2">
							<button
								type="submit"
								className={`${styles.buttonLogin} rounded-pill`}
								sx={{
									background: "linear-gradient(90deg, #E93463 1.43%, #B03596 100%)",
									fontFamily: theme.fonts.montserrat,
									paddingY: "0.5rem",
									color: theme.colors.white
								}}
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
			<img src="/illustration.png" sx={{
				width: "50%",
				marginX: "4rem"
			}} />
		</section>
	);
}