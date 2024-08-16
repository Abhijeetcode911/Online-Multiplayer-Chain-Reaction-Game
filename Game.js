import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:3001');

function Game() {
  useEffect(() => {
    socket.emit('createRoom', { room: 'exampleRoom' });

    socket.on('someGameEvent', (data) => {
      console.log('Game event received:', data);
    });

    return () => socket.off('someGameEvent');
  }, []);

  return (
    <div>
      <h1>Chain Reaction Game</h1>
    </div>
  );
}

export default Game;
