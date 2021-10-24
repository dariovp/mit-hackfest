/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react';
import styles from './Search.module.css'

import { projectsMock } from '../../../mocks/projects.js';
import { theme } from '../../../theme';

function Team({ team }) {
	return (
		<li className="w-25 mx-4 h-25">
			<div className="card w-100">
				<img src={team.image} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{team.title}</h5>
					<p className="card-text">{team.description}</p>
				</div>
			</div>
		</li>
	);
}

function Category({ name }) {
	const [selected, setSelected] = useState(false);
	return (
		<button
			className={`border-0 rounded-pill text-light mx-5`}
			sx={{
				backgroundColor: selected ? theme.colors.pink : theme.colors.black,
				paddingX: "1.5rem",
				paddingY: "0.5rem",
				boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)"
			}}
			onClick={() => {
				setSelected(!selected);
			}}
		>
			{name}
		</button >
	);
}

export function Search() {

	const [teams, setTeams] = useState(undefined);

	useEffect(() => {
		setTeams(projectsMock)
	}, [])

	return (
		<div>
			<section className="vw-100" sx={{
				backgroundColor: theme.colors.purple
			}}>
				<nav className="d-flex flex-row align-items-center justify-content-start">
					<img src="/hackfestLogo.png" alt="..." className={styles.image} />
					<span className="mw-100 w-100" />
					<button className={`text-nowrap px-5 rounded-pill ${styles.btnAdd}`}
						sx={{
							backgroundColor: theme.colors.pink,
							paddingY: "0.5rem"
						}}
					>
						<img src="/plus.svg" alt="plus" />
						<div
							className="ml-3"
							className={styles.team}
							sx={{
								color: theme.colors.white
							}}
						>
							Add team
						</div>
					</button>
				</nav>
				<div className="w-100 d-flex flex-column justify-content-start align-items-center">
					<h1 className="pb-4"
						sx={{
							color: theme.colors.yellow
						}}>
						Projects
					</h1>
					<div className={`rounded-pill ${styles.searchbar}`}
						sx={{
							backgroundColor: theme.colors.black,
							color: theme.colors.text
						}}
					>
						<form className="d-flex flex-row align-items-center justify-content-start w-100 h-100 position-relative">
							<input
								placeholder="Search by name, job, etc"
								className="w-100 h-100 border-0 rounded-pill px-4" type="text"
								sx={{
									backgroundColor: theme.colors.black,
									color: theme.colors.white,
									"::placeholder": {
										color: theme.colors.white
									}
								}}
							/>

							<button className={`${styles.searchBtn} border-0 rounded-pill`} sx={{
								backgroundColor: theme.colors.lightPurple
							}}>
								<img src="/search.svg" className={`${styles.logo} `} />
							</button>

						</form>
					</div>
				</div>
				<div className={`w-100 px-5 py-4 d-flex flex-column align-items-center justify-content-around`}>
					<div className="d-flex flex-row align-items-center justify-content-center" sx={{
						paddingY: "1rem"
					}}>
						<h3
							className="px-5 mx-5"
							sx={{
								color: theme.colors.yellow
							}}
						>
							Filter by category
						</h3>
						<Category name={"Room 14"} />
						<Category name={"Design"} />
						<Category name={"AR/VR"} />
						<Category name={"More"} />

					</div>
					<ul className="d-flex flex-row align-items-center justify-content-center list-unstyled w-100 flex-wrap">
						{
							teams && teams.map(element => {
								return <Team team={element} />
							})
						}
					</ul>
				</div>
			</section>
			<section>

			</section>
		</div>
	);
}