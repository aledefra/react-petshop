import React, { useState, useEffect } from "react";
import { IAnimal } from "./../../model/animal";
import { useForm } from "react-hook-form";
import { defaultAnimal } from "./../../utils/animal.utils";

type Props = {
	animal: IAnimal | null;
};

export const AnimalForm = (props: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { isValid, errors },
	} = useForm({
		mode: "onChange",
		defaultValues: defaultAnimal,
	});

	const animal = props.animal;
	console.log("aa", animal?.name ?? "a");

	return (
		<div className="animalForm">
			<form>
				<div className="row">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						placeholder="Name"
						{...register("name", {
							required: { value: true, message: "Field Required" },
						})}
					/>
				</div>
				<div className="row">
					<label htmlFor="description">Description:</label>
					<input
						type="textarea"
						id="description"
						placeholder="Description"
						{...register("description", {
							required: { value: true, message: "Field Required" },
						})}
					/>
				</div>
			</form>
		</div>
	);
};
