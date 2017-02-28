#### To get started

```
$ npm i
$ npm start
$ open http://localhost:9100/
```

#### Explanation:

When a block is clicked, all blocks of the same colour that are connected to the target element then allow the blocks above the removed to fall down (similar to Tetris but you should click a block to have connected blocks removed). I achieved this by implementing the flood fill algorithim and a few data structures in JavaScript. 

E.g.,

Given:

![Initial state](https://raw.githubusercontent.com/robinj/blocky/master/images/initial.jpg)

After clicking one of the bottom right blue boxes it should then look
like this:

![state 2](https://raw.githubusercontent.com/robinj/blocky/master/images/stage2.jpg)
