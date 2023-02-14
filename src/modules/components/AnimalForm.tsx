import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IAnimal } from "./../../model/animal";
import { useForm } from "react-hook-form";
import { API_URL } from "./../../constants";

type Props = {
	defaultAnimal?: IAnimal;
};

export const AnimalForm = ({ defaultAnimal }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { isValid, errors },
	} = useForm({
		mode: "onChange",
		defaultValues: defaultAnimal,
	});

	const navigate = useNavigate();

	const isModifying = defaultAnimal ? true : false;

	const [pageState, setPageState] = useState({
		saving: false,
		loading: false,
		error: false,
	});

	const save = async (data: IAnimal) => {
		console.log(data);
		try {
			setPageState({ ...pageState, saving: true });
			console.log(data);
			const res = isModifying
				? await axios.put(`${API_URL}/${defaultAnimal!._id}`, data)
				: await axios.post(`${API_URL}`, data);

			setPageState({ ...pageState, saving: false });
			navigate(`/animal/${res.data._id}`);
		} catch (error) {
			console.log(error);
			setPageState({ ...pageState, saving: false, error: true });
		}
	};

	const watchType = watch("type");

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
					{errors.name?.message}
				</div>

				<div className="row">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						placeholder="Description"
						{...register("description", {
							required: { value: true, message: "Field Required" },
						})}
					/>
					{errors.description?.message}
				</div>

				<div className="row">
					<label htmlFor="type">Type:</label>
					<select
						id="type"
						{...register("type", {
							required: { value: true, message: "Field Required" },
						})}
					>
						<option value=""></option>
						<option value="DOG">Dog</option>
						<option value="CAT">Cat</option>
					</select>
					{errors.type?.message}
				</div>

				{watchType ? (
					<div className="row">
						<label htmlFor="breed">Breed:</label>
						<select id="breed" {...register("breed")}>
							<option value="">None</option>
							{watchType === "DOG" ? (
								<>
									<option value="Pinscher">Pinscher</option>
									<option value="Pitbull">Pitbull</option>
								</>
							) : (
								<>
									<option value="Persian">Persian</option>
									<option value="Abyssinian">Abyssinian</option>
								</>
							)}
						</select>
						{errors.breed?.message}
					</div>
				) : null}

				<div className="row">
					<label htmlFor="pedigree">Pedigree:</label>
					<input
						id="pedigree"
						type="checkbox"
						{...register("pedigree", {
							required: { value: false, message: "Field required" },
						})}
					/>
					{errors.pedigree?.message}
				</div>

				<div className="row">
					<label htmlFor="birthDate">Birth Date:</label>
					<input
						type="date"
						id="birthDate"
						placeholder="Birth Date"
						{...register("birthDate", {
							required: { value: true, message: "Field Required" },
						})}
					/>
					{errors.birthDate?.message}
				</div>

				<div className="row">
					<label htmlFor="imgUrl">Image Url:</label>
					<input
						type="text"
						id="imgUrl"
						placeholder="Image Url"
						{...register("imgUrl", {
							required: { value: true, message: "Field Required" },
						})}
					/>
					{errors.imgUrl?.message}
				</div>

				<button
					disabled={!isValid || pageState.saving}
					onClick={handleSubmit(save)}
				>
					{isModifying ? "Modify" : "Add"}
				</button>
			</form>
		</div>
	);
};
