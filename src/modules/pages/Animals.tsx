import React, { useState, useEffect } from "react";
import axios from "axios";
import { IAnimal } from "./../../model/animal";
import { API_URL } from "./../../constants";
import { AnimalCard } from "./../components/AnimalCard";

type TAnimalState = {
	loading: boolean;
	error: boolean;
	animals: IAnimal[] | null;
};

export const Animals = () => {
	const [animalState, setAnimalState] = useState<TAnimalState>({
		loading: false,
		error: false,
		animals: null,
	});

	const fetchAnimal = async () => {
		setAnimalState({
			...animalState,
			loading: true,
		});

		try {
			const res = await axios.get(`${API_URL}`);
			const data: IAnimal[] = res.data;
			console.log(data);
			setAnimalState({
				...animalState,
				animals: data,
				loading: false,
			});
		} catch (e) {
			setAnimalState({
				...animalState,
				loading: false,
				error: true,
			});
		}
	};

	useEffect(() => {
		fetchAnimal();
	}, []);

	return (
		<div>
			<h1>Animals</h1>
			{animalState.loading && <p>Loading...</p>}
			{animalState.error && <p>Error</p>}
			{animalState.animals &&
				animalState.animals.map((animal) => <AnimalCard animal={animal} />)}
		</div>
	);
};
