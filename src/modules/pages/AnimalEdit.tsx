import React, { useState, useEffect } from "react";
import axios from "axios";
import { IAnimal } from "./../../model/animal";
import { API_URL } from "./../../constants";
import { AnimalForm } from "./../components/AnimalForm";
import { useParams } from "react-router-dom";

type TAnimalState = {
	loading: boolean;
	error: boolean;
	animal: IAnimal | null;
};

export const AnimalEdit = () => {
	let { _id } = useParams();

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
		<div>
			{animalState.loading && <p>Loading...</p>}
			{animalState.error && <p>Error</p>}
			{animalState.animal && (
				<>
					<h1>Edit animal</h1>
					<AnimalForm defaultAnimal={animalState.animal} />
				</>
			)}
		</div>
	);
};
