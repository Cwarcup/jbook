# Getting Started

In terminal, run the following command:

```zsh
npx jsbooks serve
```

Follow the instructions in terminal and navigate to "http://localhost:4005/".

# Possible Future Improvements
- Issue when making changes to the project, then republishing the project with Lerna. Will run into issue when you try to run the CLI with npx. 
- Currently writing cells as JSON into a file. This is not ideal. This could be written in a more user friendly format.
- Code editor height is fixed. This could be made dynamic.
- The app is empty when it first loads. Add some default notes. 

# Development

`jbook % npm run start` inside jbook to start.
Starts up both compilers and the server.


`node index.js serve` inside the dist directory of CLI package.