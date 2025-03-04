import express from 'express';
import * as characterController from '../controllers/characterController.js';

const router = express.Router();

router.get('/characters', characterController.getCharacters); 
router.post('/new-character', characterController.createNewCharacter); 
router.put('/update-character/:id', characterController.updateCharacter); 
router.delete('/delete-character/:id', characterController.deleteCharacter); 
//Search
router.get('/characters/search', characterController.searchCharacter); 

export default router;