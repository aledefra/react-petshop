import React from "react";
import { IAnimal } from "./../../model/animal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {
	animal: IAnimal;
};

export const AnimalCard = ({ animal }: Props) => {
	const navigate = useNavigate();

	console.log(animal);
	return (
		<div className="animalCard">
			<img className="animalImg" src={animal.imgUrl!} alt={animal.name!} />
			<div className="animalCardInfo">
				<h1>{animal.name}</h1>
				<p>{animal.description}</p>
			</div>

			<Link className="btnLink" to={"/animal/" + animal._id}>
				Details
			</Link>
		</div>
	);
};
