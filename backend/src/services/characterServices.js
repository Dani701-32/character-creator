import { query } from "../db.js";

export const getCharacters = async () => {
    const { rows } = await query('SELECT * FROM characters');
    return rows;
}

export const createNewCharacter = async (characterData) => {
    const { name, height, sex, bra, gender, species, family, birth_year, extra } = characterData;
    const { rows } = await query(
        `
        INSERT INTO characters  (name, height, sex, bra, gender, species, family, birth_year, extra)
        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `,
        [name, height, sex, bra, gender, species, family, birth_year, extra]
    );
    return rows[0];
}
export const updateCharacter = async (characterData, characterId) => {
    const { name, height, sex, bra, gender, species, family, birth_year, extra } = characterData;
    const { rows } = await query(
        `
        UPDATE characters SET name = $1, height = $2, sex = $3, bra = $4, gender = $5, species = $6, family = $7, birth_year = $8, extra = $9
        WHERE id = $10 RETURNING *;
        `,
        [name, height, sex, bra, gender, species, family, birth_year, extra, characterId]
    );
    return rows[0];
}

export const deleteCharacter = async (characterId) => {
    const { rowCount } = await query(`DELETE FROM characters WHERE id = $1`, [characterId]);
    return rowCount > 0;
}

export const searchCharacter = async (searchTerm) => {
    const { rows } = await query(
        `
        SELECT * FROM characters WHERE name ILIKE $1 
        `, [`%${searchTerm}%`]
    );
    return rows;
}