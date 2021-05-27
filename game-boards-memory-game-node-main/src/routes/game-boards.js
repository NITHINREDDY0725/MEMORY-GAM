import { Router } from 'express';

const router = Router();

const GameBoardController = require('../controllers/game-boards.controller')

router.post('/getGameSessionIdAndCardsData', GameBoardController.getGameSessionIdAndCardsData)

export default router;