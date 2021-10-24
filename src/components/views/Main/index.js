import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";

function Main() {
	return (
		<section className="vw-100 vh-100 ">
			<div className={styles.container}>
				<img src="/hackfestLogo.png" alt="..." className={styles.image} />
				<Link to="/login" className="text-white text-decoration-none">
					<Button className={`${styles.buttonLogin} rounded-pill`}>
						LOGIN
					</Button>
				</Link>
			</div>
		</section>
	);
}

export default Main;