# We Have Jeopardy at Home
### A customizable Jeopardy-style game built the power of Web Sockets!

As entertaining as Jeopardy is to watch, actually playing it is so much more exciting! This Jeopardy-style trivia game is built using Next.js and socket.io to synchronize
the gameplay in real-time across multiple devices. Players can join from anywhere, answering questions and competing for the highest score. The game dynamically updates with each answer, 
ensuring a smooth and engaging experience for all participants. Whether you're hosting a virtual game night or testing your trivia skills with friends, this interactive platform brings the 
classic Jeopardy experience to life in a modern, digital format.

## Setting Up The Project

1. Clone the repository into your local machine.
2. `cd` into the client directory and run `npm run dev`.
3. In a separate terminal window, `cd` into the sever directory and run `npm run dev`.
4. With both the client and server running on separate local ports, serve both instances using a reverse proxy like ngrok.
5. In the `client/game/page.js`, replace the URL on line 11 with the reverse proxy URL pointing to your server.
6. Similarly, in `server/index.js`, replace one of the URLs within line 15 to the reverse proxy URL pointing to your client.
7. In `client/util/questions.json`, customize any of the categories, questions, and points to your liking.
8. Finally, send your friends the reverse proxy URL pointing to your client and have fun!

## Demonstration 

### Synchronized Player Joining
![synchronized players](https://github.com/user-attachments/assets/75bd6cbb-b83e-4103-9884-004815559bd5)

### Utilizing Buzzer and Answering Questions
![buzzer and points](https://github.com/user-attachments/assets/fdb41d90-dd1e-424f-9d5f-a027183db005)

## Tech Stack
- JavaScript
- Next.js
- TailwindCSS
- Express.js
- Socket.io
- Ngrok

