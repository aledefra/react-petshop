import { Routes, Route } from "react-router-dom";
import { Homepage } from "./modules/pages/Homepage";
import { NotFound } from "./modules/pages/NotFound";
import { AnimalNew } from "./modules/pages/AnimalNew";
import { AnimalDetail } from "./modules/pages/AnimalDetail";
import { AnimalEdit } from "./modules/pages/AnimalEdit";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="*" element={<NotFound />} />

			<Route path="/animal">
				<Route path="new" element={<AnimalNew />} />
				<Route path=":_id" element={<AnimalDetail />} />
				<Route path=":_id/edit" element={<AnimalEdit />} />
			</Route>
		</Routes>
	);
};
