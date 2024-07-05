import { getGameSession } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const LocationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const gameSession = getGameSession(1);
    const {x, y} = payload;
    
    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const user = getUserById(userId);
    //gameSession.addUser(user);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    const existUser = gameSession.getUser(user.id);
    if (!existUser) {
      gameSession.addUser(user);
    }

    user.updatePosition(x,y); 
    
    const packet = gameSession.getExceptMePlayerLocation(userId);
    socket.write(packet);
  } catch (error) {
    handleError(socket, error);
  }
};

export default LocationUpdateHandler