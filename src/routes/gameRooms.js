const router = require('express').Router();
const GameRoomController = require('./../controllers/GameRoomController');
const isAuth = require('./../middlewares/middlewares').isAuthenticated;

router.route('/game-rooms')
    .get(isAuth, GameRoomController.getAllGameRooms);

// request body containt battleTypeId
router.route('/game-rooms')
    .post(isAuth, GameRoomController.createRoom);

router.route('/game-rooms/:id')
    .delete(isAuth, GameRoomController.deleteRoomById)

module.exports = router