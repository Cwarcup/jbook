# About the app

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown. 

- Click any text cell (including this one) to edit it.
- The code in each code editor is all joined together into one file.
  - You can define a variable in cell #1 and refer to it in any of the following cells. 
- You can show any React component, string, number, or anything else by calling the `show()`  function. 
   - This is a function built into this environment.
   - Call `show()` multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right of each cell.
- Add new cells by hovering between each cell. 
- Can import CSS libraries.

All of your changes get saved to the files you opened jsBooks. So if you ran `npx jsbooks serve test.js `, all of the text and code you write will be saved to the `test.js` file. 

![Markdown Example](https://media0.giphy.com/media/yBeUrP0btICU81F7nL/giphy.gif?cid=790b76111f0459396067a8b11db04750fd09d257ca4be1a7&rid=giphy.gif&ct=g)

![Code Cell Example](https://media3.giphy.com/media/Ia6X4z42qD9IybWNBA/giphy.gif?cid=790b761118e5c141a97a8578727ac7bce1db45ade9901956&rid=giphy.gif&ct=g)

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

Clone the repository and cd into `jbook`. Run command `npm run start` to start up the compilers.


Change into the `cli` directory and run `node index.js serve` to start the server. Navigate to "http://localhost:4005/".

Push to lerna with `lerna publish --no-push` to publish the project on npm.