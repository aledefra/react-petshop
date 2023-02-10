import React, { useState, useEffect } from "react";
import axios from "axios";
import { IAnimal } from "./../../model/animal";
import { API_URL } from "./../../constants";
import { AnimalForm } from "./../components/AnimalForm";

export const AnimalNew = () => {
	return (
		<div>
			<AnimalForm animal={null} />
		</div>
	);
};
