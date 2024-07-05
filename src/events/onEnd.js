import { getGameSession } from '../session/game.session.js';
import { gameSessions, userSessions } from '../session/sessions.js';
import { getUserBySocket, removeUser } from '../session/user.session.js';

export const onEnd = (socket) => () => {
  console.log('클라이언트 연결이 종료되었습니다.', socket.remoteAddress, socket.remotePort);
  removeUser(socket);
  console.log(userSessions);
  console.log(getGameSession(1));
};
