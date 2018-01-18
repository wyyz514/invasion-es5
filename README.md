## Invasion

Canvas based animation for a potential game. Built using HTML5 and Canvas API.

### Install

Clone this repo 

Add the following to your .html file 

`<script src="/path/to/invasion/dist/invasion.min.js"></script>`

or 

run

`npm install` and go to `localhost:3000`


### Initialization and configuration
```js
    var invasion = new Invasion(invaderCount, invaderSize, invaderColor, gridSize, gridColor);
    invasion.draw();
```