const router = require('express').Router();
const GameRoomController = require('./../controllers/GameRoomController');

router.route('/game-rooms')
    .get(GameRoomController.getAllGameRooms);

// request body containt battleTypeId
router.route('/game-rooms')
    .post(GameRoomController.createRoom);

router.route('/game-rooms/:id')
    .delete(GameRoomController.deleteRoomById)

module.exports = router