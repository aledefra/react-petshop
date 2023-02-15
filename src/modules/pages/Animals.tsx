import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IAnimal } from "./../../model/animal";
import { API_URL } from "./../../constants";
import { AnimalCard } from "./../components/AnimalCard";

type TAnimalState = {
	loading: boolean;
	error: boolean;
	animals: IAnimal[] | null;
	animalsFiltered: IAnimal[] | null;
};

export const Animals = () => {
	const { register, handleSubmit, watch, reset } = useForm({
		mode: "onChange",
	});

	const nameSearch = watch("name");

	const [animalState, setAnimalState] = useState<TAnimalState>({
		loading: false,
		error: false,
		animals: null,
		animalsFiltered: null,
	});

	const fetchAnimal = async () => {
		setAnimalState({
			...animalState,
			loading: true,
		});

		try {
			const res = await axios.get(`${API_URL}`);
			const data: IAnimal[] = res.data;
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

	const search = () => {
		if (!nameSearch) {
			reset();
			return;
		}

		const filtered = (animalState.animals ?? []).filter((animal) =>
			animal.name?.toLowerCase().includes(nameSearch.toLowerCase())
		);

		setAnimalState({
			...animalState,
			animalsFiltered: filtered,
		});
	};

	const resetSearch = () => {
		reset();
		setAnimalState({
			...animalState,
			animalsFiltered: null,
		});
	};

	useEffect(() => {
		fetchAnimal();
	}, []);

	return (
		<div>
			<h1>Animals</h1>

			<form>
				<div className="row">
					<label htmlFor="name">Search by name:</label>
					<input
						type="text"
						id="name"
						placeholder="Name"
						{...register("name")}
					/>
				</div>
				<button onClick={handleSubmit(search)}>Search</button>
				<button className="danger" onClick={resetSearch}>
					Reset
				</button>
			</form>

			{animalState.loading && <p>Loading...</p>}
			{animalState.error && <p>Error</p>}
			{animalState.animalsFiltered &&
				animalState.animalsFiltered.length === 0 && <p>No animals found</p>}

			{animalState.animalsFiltered
				? animalState.animalsFiltered.map((animal) => (
						<AnimalCard animal={animal} />
				  ))
				: animalState.animals &&
				  animalState.animals.map((animal) => <AnimalCard animal={animal} />)}
		</div>
	);
};
