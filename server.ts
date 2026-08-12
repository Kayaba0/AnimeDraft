// Entry point esplicito per il runtime Node di Vercel.
// Avvia lo stesso server HTTP usato da Socket.IO.
const { startRealtimeServer } = require('./server.js');

startRealtimeServer(Number(process.env.PORT || 3000));
