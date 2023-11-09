import Pusher from 'pusher-js';

// const pusher = new Pusher('2b7208e6523a6e855f6b', {
const pusher = new Pusher('f0f69c0d22ba85c93f21', {
  cluster: 'ap1',
  // Add other configurations if needed
});

export default pusher;
