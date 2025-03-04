import * as characterServices from '../services/characterServices.js';


export const getCharacters = async (req, res) => {
    try {
        const characters = await characterServices.getCharacters();
        res.status(200).json(characters);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const createNewCharacter = async (req, res) => {
    try {
        const characterData = req.body;
        const newCharacter = await characterServices.createNewCharacter(characterData);
        res.status(200).json(newCharacter);
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const updateCharacter = async (req, res) => {
    try {
        const characterId = req.params.id;
        const characterData = req.body;
        const updatedCharacter = await characterServices.updateCharacter(characterData, characterId);

        if (!updatedCharacter) {
            return res.status(404).json({ message: "Character not found" });
        }
        res.status(200).json(updatedCharacter);

    } catch (error) {
        console.error('Error updating clients', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const deleteCharacter = async (req, res) => {
    try {
        const characterId = req.params.id;
        const deletedCharacter = await characterServices.deleteCharacter(characterId);

        if (!deletedCharacter) {
            return res.status(404).json({ message: "Character not found" });
        }
        res.status(200).send();

    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const searchCharacter = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const characters = await characterServices.searchCharacter(searchTerm);
        res.status(200).json(characters);

    } catch (error) {
        console.error('Error searching client:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


