interface CharactersListProps {
	onOpen: (action: "add" | "update", character: Character) => void,
	tableData: Character[]
}

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

export default function CharactersList({onOpen, tableData}: CharactersListProps) {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Faamilia</th>
							<th>Nascimento</th>
							<th>Espécie</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((character, index) => (
							<tr key={character.id}>
								<th>{index + 1}</th>
								<td>{character.name}</td>
								<td>{character.family}</td>
								<td>{character.birth_year}</td>
								<td>{character.species}</td>
								<th>
									<button className="btn btn-ghost btn-xs" onClick={() => onOpen('update', character)}>
										Details
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
