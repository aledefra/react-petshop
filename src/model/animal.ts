export interface IAnimal {
	_id: string;
	name: string | null;
	type: "DOG" | "CAT" | null;
	breed: string | null;
	birthDate: string | null;
	imgUrl: string | null;
	description: string | null;
	pedigree: boolean | null;
	created_at: string;
	updated_at: string;
}
