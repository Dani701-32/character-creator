import "./App.css";
import CharactersList from "./components/CharactersList";
import Navbar from "./components/Navbar";
import CharacterModel from "./components/CharacterModel";
import { useEffect, useState } from "react";
import axios from "axios";

interface Character {
	id?: number;
	name: string;
	height: number;
	sex: "M" | "F" | "H";
	gender: "Hetero" | "Homosexual" | "Bissexual";
	bra: number | null;
	species: number;
	family: number;
	birth_year: number;
	extra: number;
}


function App() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalMode, setModalMode] = useState<"add" | "update">("add");
	const [characterData , setCharacterData] = useState<Character>(); 
	const [tableData, setTableData] = useState<Character[]>([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/characters"
			);
			setTableData(response.data);
		} catch (error) {
			console.log('Error list:', error);
		}
	};


	useEffect(() => {
		fetchData();
	}, []);

	const handleOpen = (mode: "add" | "update", character?: Character) => {
		setCharacterData(character);
		setModalMode(mode);
		setIsOpen(true);
	};

	const handleSubmit = async (newCharacterData: Character) => {
		if (modalMode == "add") {
			try {
				const response = await axios.post('http://localhost:3000/api/new-character', newCharacterData);
				console.log('Character added: ', response.data);
				fetchData();
			} catch (error) {
				console.log('Error adding character:', error);
			}
			
		} else {
			try {
				const response = await axios.put('http://localhost:3000/api/update-character/'+newCharacterData.id, newCharacterData);
				console.log('Character updated: ', response.data);
				fetchData();
			} catch (error) {
				console.log('Error adding character:', error);
			}
		}
	};

	const handleDelete = async(characterId: number) =>{
		try {
			const response = await axios.delete("http://localhost:3000/api/delete-character/"+characterId);
			console.log("Character deleted: ", response);
			fetchData(); 
			
		} catch (error) {
			console.log('Error deleting character:', error);
		}
	}
	return (
		<>
			<Navbar onOpen={() => handleOpen("add")} />
			<CharactersList onOpen={handleOpen} tableData={tableData}/>
			<CharacterModel
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				OnSubmit={handleSubmit}
				mode={modalMode}
				characterData = {characterData}
				onDelete={handleDelete}
			/>
		</>
	);
}

export default App;
