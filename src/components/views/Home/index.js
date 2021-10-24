import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Experience } from "../Experience";
import styles from "./Home.module.css";

function Home() {

	const [launch, setLaunch] = useState(false);

	return (
		<section className="vw-100 vh-100 ">
			<Experience launch={launch} />
			<div className={styles.container}>
				<div className={styles.image} />
				<div className="d-flex flex-row justify-content-start align-content-center">
					<Button
						className={`${styles.buttonEnter} rounded-pill`}
						onClick={() => setLaunch(true)}
					>
						Enter
					</Button>

					<Link to="/search" className="text-white text-decoration-none mx-2">
						<Button variant="outline-light" className={`${styles.buttonTeams} rounded-pill`}>
							Teams
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Home;