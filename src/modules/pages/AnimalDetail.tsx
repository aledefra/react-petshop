import React, { useEffect, useState } from "react";
import { IAnimal } from "./../../model/animal";
import { API_URL } from "./../../constants";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

type TAnimalState = {
	loading: boolean;
	error: boolean;
	animal: IAnimal | null;
};

export const AnimalDetail = () => {
	let { _id } = useParams();

	const navigate = useNavigate();

	const [animalState, setAnimalState] = useState<TAnimalState>({
		loading: false,
		error: false,
		animal: null,
	});

	const fetchData = async () => {
		setAnimalState({ ...animalState, loading: true });

		try {
			const response = await axios.get(`${API_URL}/${_id}`);
			setAnimalState({ ...animalState, loading: false, animal: response.data });
		} catch (error) {
			setAnimalState({ ...animalState, loading: false, error: true });
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="animalDetail">
			{animalState.loading && <p>Loading...</p>}
			{animalState.error && <p>Error</p>}
			{animalState.animal && (
				<>
					<img
						className="animalImg"
						src={animalState.animal.imgUrl!}
						alt={animalState.animal.name!}
					/>
					<h1>{animalState.animal.name}</h1>
					<p>{animalState.animal.description}</p>

					<hr />

					<p>Type: {animalState.animal.type}</p>
					<p>Breed: {animalState.animal.breed}</p>
					<p>
						Birth Date:{" "}
						{new Date(animalState.animal.birthDate!).toLocaleDateString()}
					</p>
					<p>
						{animalState.animal.pedigree
							? "It's pure-bred"
							: "It's not pure-bred"}
					</p>

					<hr />

					<p>
						Created at:{" "}
						{new Date(animalState.animal.created_at!).toLocaleString()}
					</p>
					<p>
						Last updated at:{" "}
						{new Date(animalState.animal.updated_at!).toLocaleString()}
					</p>

					<div className="btnGroup">
						<Link
							className="btnLink"
							to={"/animal/" + animalState.animal._id + "/edit"}
						>
							Edit
						</Link>

						<button
							className="btnLink danger"
							onClick={async () => {
								if (
									window.confirm("Are you sure you want to delete this animal?")
								) {
									await axios.delete(`${API_URL}/${animalState.animal!._id}`);
									navigate("/animal");
								}
							}}
						>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
};
