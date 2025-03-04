import { useEffect, useState } from "react";

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

interface CharacterModelProps {
	isOpen: boolean;
	onClose: () => void;
	mode: "add" | "update";
	OnSubmit: (data: Character) => void;
	onDelete: (data: number) => void;
	characterData?: Character; // Deixar opcional para evitar erro
}

export default function CharacterModel({
	isOpen,
	onClose,
	mode,
	OnSubmit,
	onDelete, 
	characterData,
}: CharacterModelProps) {
	const [id, setId] = useState<number>(0);
	const [name, setName] = useState<string>("");
	const [height, setHeight] = useState<number>(170);
	const [sex, setSex] = useState<"M" | "F" | "H">("M");
	const [bra, setBust] = useState<number | null>(null);
	const [gender, setGender] = useState<"Hetero" | "Homosexual" | "Bissexual">(
		"Hetero"
	);
	const [species, setSpecies] = useState<number>(0);
	const [family, setFamily] = useState<number>(1);
	const [birth, setBirth] = useState<number>(0);
	const [extra, setExtra] = useState<number>(0);

	const [error, setError] = useState<string | null>(null);

	// Carregar dados quando estiver no modo "update"
	useEffect(() => {
		if (mode === "update" && characterData) {
			if (characterData.id) {
				setId(characterData.id);
			}
			setName(characterData.name);
			setHeight(characterData.height);
			setSex(characterData.sex);
			setBust(characterData.bra);
			setGender(characterData.gender);
			setSpecies(characterData.species);
			setFamily(characterData.family);
			setBirth(characterData.birth_year);
			setExtra(characterData.extra);
		} else {
			setName("");
			setHeight(170);
			setSex("H");
			setBust(null);
			setGender("Hetero");
			setSpecies(0);
			setFamily(1);
			setBirth(0);
			setExtra(0);
		}
	}, [mode, characterData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const newCharacterData: Character = {
				id,
				name,
				height,
				sex,
				bra: sex === "M" ? null : bra, // bra só se não for "M"
				gender,
				species,
				family,
				birth_year: birth,
				extra,
			};
			await OnSubmit(newCharacterData);
			onClose();
		} catch (err) {
			setError((err as Error).message);
		}
	};

	const handleDelete = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await onDelete(id);
			onClose();
		} catch (err) {
			setError((err as Error).message);
		}
	};

	return (
		<dialog id="modal_form" className="modal" open={isOpen}>
			{error && <div className="alert alert-error">{error}</div>}
			<div className="modal-box">
				<h3 className="font-bold text-lg py-2">
					{mode === "update" ? "Update Character" : "Create Character"}
				</h3>
				<form className="space-y-4" onSubmit={handleSubmit} method="dialog">
					<label className="block">
						Nome:
						<input
							type="text"
							className="input input-bordered w-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>

					<label className="block">
						Altura (cm):
						<input
							type="number"
							className="input input-bordered w-full"
							value={height}
							onChange={(e) => setHeight(Number(e.target.value) || 0)}
							min="1"
						/>
					</label>

					<label className="block">
						Sexo:
						<select
							className="select select-bordered w-full"
							value={sex}
							onChange={(e) => setSex(e.target.value as "M" | "F" | "H")}
						>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="H">Herma</option>
						</select>
					</label>

					{(sex === "F" || sex === "H") && (
						<label className="block">
							Busto:
							<select
								className="select select-bordered w-full"
								value={bra ?? ""}
								onChange={(e) => setBust(Number(e.target.value) || 0)}
							>
								<option value={0}>Sem Busto</option>
								<option value={1}>A</option>
								<option value={2}>B</option>
								<option value={3}>C</option>
								<option value={4}>D</option>
								<option value={5}>DD</option>
								<option value={6}>E</option>
							</select>
						</label>
					)}

					<label className="block">
						Gênero:
						<select
							className="select select-bordered w-full"
							value={gender}
							onChange={(e) =>
								setGender(
									e.target.value as "Hetero" | "Homosexual" | "Bissexual"
								)
							}
						>
							<option>Hetero</option>
							<option>Homosexual</option>
							<option>Bissexual</option>
						</select>
					</label>

					<label className="block">
						Espécie:
						<select
							className="select select-bordered w-full"
							value={species}
							onChange={(e) => setSpecies(Number(e.target.value) || 0)}
						>
							<option value={0}>Daeminus</option>
							<option value={1}>Servust</option>
							<option value={2}>Extender</option>
							<option value={3}>Lauberean</option>
						</select>
					</label>

					<label className="block">
						Família:
						<select
							className="select select-bordered w-full"
							value={family}
							onChange={(e) => setFamily(Number(e.target.value) || 1)}
						>
							<option value={1}>Teste 1</option>
							<option value={2}>Teste 2</option>
							<option value={3}>Teste 3</option>
							<option value={4}>Teste 4</option>
							<option value={5}>Teste 5</option>
						</select>
					</label>

					<label className="block">
						Nascimento:
						<input
							type="number"
							className="input input-bordered w-full"
							value={birth}
							onChange={(e) => setBirth(Number(e.target.value) || 0)}
						/>
					</label>

					<label className="block">
						Extra (0-100):
						<input
							type="number"
							className="input input-bordered w-full"
							min="0"
							max="100"
							value={extra}
							onChange={(e) => setExtra(Number(e.target.value) || 0)}
						/>
					</label>

					<div className="modal-action">
						<button type="button" className="btn" onClick={onClose}>
							Close
						</button>
						{mode === "update" && (
							<button type="button" className="btn" onClick={handleDelete}>
								Delete
							</button>
						)}
						<button type="submit" className="btn btn-success">
							{mode === "update" ? "Save" : "Create"}
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}
