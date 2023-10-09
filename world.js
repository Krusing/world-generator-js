const numberOfTiles = 19;

const tileSet = [];
for (let i = 0; i < numberOfTiles; i++) {
    const image = new Image();
    image.src = `images/tiles/loz_lttp_tile_${i}.jpg`;
    tileSet.push(image);
}

const nextTilesFrom = {
    0: [1,2,15],
    1: [1,2,15],
    2: [0,3,4,7,8,11],
    3: [0,3,4,7,8,11],
    4: [5,6,12,14,16,17,18],
    5: [5,6,12,14,16,17,18],
    6: [0,3,4,7,8,11],
    7: [0,3,4,7,8,11],
    8: [9,10,13],
    9: [9,10,13],
    10: [0,3,4,7,8,11],
    11: [0,3,4,7,8,11],
    12: [9,10,13],
    13: [5,6,12,14,16,17,18],
    14: [1,2,15],
    15: [5,6,12,14,16,17,18],
    16: [5,6,12,14,16,17,18],
    17: [5,6,12,14,16,17,18],
    18: [5,6,12,14,16,17,18],
}

const previousTilesFrom = {
    0: [2,3,6,7,10,11],
    1: [0,1,14],
    2: [0,1,14],
    3: [2,3,6,7,10,11],
    4: [2,3,6,7,10,11],
    5: [4,5,13,15,16,17,18],
    6: [4,5,13,15,16,17,18],
    7: [2,3,6,7,10,11],
    8: [2,3,6,7,10,11],
    9: [8,9,12],
    10: [8,9,12],
    11: [2,3,6,7,10,11],
    12: [4,5,13,15,16,17,18],
    13: [8,9,12],
    14: [4,5,13,15,16,17,18],
    15: [0,1,14],
    16: [4,5,13,15,16,17,18],
    17: [4,5,13,15,16,17,18],
    18: [4,5,13,15,16,17,18],
}

const belowTilesFrom = {
    0: [4,8,15],
    1: [5,9,12,13,16,17,18],
    2: [6,10,14],
    3: [0,1,2,3,7,11],
    4: [4,8,15],
    5: [5,9,12,13,16,17,18],
    6: [6,10,14],
    7: [0,1,2,3,7,11],
    8: [0,1,2,3,7,11],
    9: [0,1,2,3,7,11],
    10: [0,1,2,3,7,11],
    11: [0,1,2,3,7,11],
    12: [6,10,14],
    13: [4,8,15],
    14: [5,9,12,13,16,17,18],
    15: [5,9,12,13,16,17,18],
    16: [5,9,12,13,16,17,18],
    17: [5,9,12,13,16,17,18],
    18: [5,9,12,13,16,17,18],
}

const aboveTilesFrom = {
    0: [3,7,8,9,10,11],
    1: [3,7,8,9,10,11],
    2: [3,7,8,9,10,11],
    3: [3,7,8,9,10,11],
    4: [0,4,13],
    5: [1,5,14,15,16,17,18],
    6: [2,6,12],
    7: [3,7,8,9,10,11],
    8: [0,4,13],
    9: [1,5,14,15,16,17,18],
    10: [2,6,12],
    11: [3,7,8,9,10,11],
    12: [1,5,14,15,16,17,18],
    13: [1,5,14,15,16,17,18],
    14: [2,6,12],
    15: [0,4,13],
    16: [1,5,14,15,16,17,18],
    17: [1,5,14,15,16,17,18],
    18: [1,5,14,15,16,17,18],
}

function getValidNextTiles(lastPlacedTile) {
    const nextTiles = nextTilesFrom[lastPlacedTile];
    const validNextTiles = [];
  
    for (const nextTile of nextTiles) {
        if (
            belowTilesFrom[lastPlacedTile].includes(nextTile) ||
            belowTilesFrom[nextTile].includes(lastPlacedTile) ||
            !previousTilesFrom[nextTile].includes(lastPlacedTile)
        ) {
            validNextTiles.push(nextTile);
        }
    }
  
    return validNextTiles;
}  
  
function getValidPreviousTiles(lastPlacedTile) {
    const previousTiles = previousTilesFrom[lastPlacedTile];
    const validPreviousTiles = [];
    
    for (const previousTile of previousTiles) {
        if (
            aboveTilesFrom[lastPlacedTile].includes(previousTile) ||
            aboveTilesFrom[previousTile].includes(lastPlacedTile) ||
            !nextTilesFrom[previousTile].includes(lastPlacedTile)
        ) {
            validPreviousTiles.push(previousTile);
        }
    }
    
    return validPreviousTiles;
}

function randomAboveTile(tile) {

}
function randomBelowTile(tile) {

}

HTMLElement.prototype.world = function(options) {

    options = options || {};

    let rows = options.rows || 10;
    let columns = options.columns || 10;
    let map = this;

    map.style.position = 'absolute';
    map.style.top = '50%';
    map.style.left = '50%';
    map.style.transform = 'translate(-50%,-50%)';
    map.style.display = 'grid';
    map.style.gridTemplateColumns = `repeat(${columns}, 16px)`;
    map.style.gridTemplateRows = `repeat(${rows}, 16px)`;
    map.tabIndex = 0;

    for (let y = 0; y < columns; y++) {
        for (let x = 0; x < rows; x++) {

            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.x = x;
            tile.dataset.y = y;

            map.appendChild(tile);
        }
    }

    let lastPlaced = 3;
    function getNextTile(tileAbove) {    
        
        const nextTiles = nextTilesFrom[lastPlaced];
        const belowTiles = belowTilesFrom[tileAbove];
        const highChance = [];
        
        const allowedTiles = nextTiles.filter(tile => belowTiles.includes(tile));

        if (allowedTiles.includes(3)) {

            for (let i = 0; i < 25; i++) {
                highChance.push(3,7,11);
            }

        }
        if (allowedTiles.includes(5)) {
            
            for (let i = 0; i < 100; i++) {
                highChance.push(5,16,17,18);
            }
            
        }
        const tileSelection = allowedTiles.concat(highChance);
        const nextTile = tileSelection[Math.floor(Math.random() * tileSelection.length)];

        lastPlaced = nextTile;
        return nextTile;
    }

    const mapTiles = map.querySelectorAll(".tile");
    mapTiles.forEach((tile, i) => {        
        const tileY = tile.dataset.y;
        const tileX = tile.dataset.x;
        let tileAbove = 3;

        if (tileY > 0){
            const cellAbove = map.querySelector(`[data-x="${tileX}"][data-y="${tileY - 1}"]`);
            tileAbove = cellAbove.dataset.tile;
        }
        
        let nextTile = getNextTile(tileAbove);   
        
        tile.dataset.tile = nextTile;
        tile.style.backgroundImage = `url(${tileSet[nextTile].src})`;
    });

    map.addEventListener('keydown', (event) => {
        const direction = event.code;
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(direction)) {
          let [x, y, xIncrement, yIncrement, xCondition, yCondition] = [0, 0, 0, 0, 0, 0];
      
          if (direction === 'ArrowRight') {
            [x, y, xIncrement, yCondition] = [0, 0, 1, columns - 1];
          } else if (direction === 'ArrowDown') {
            [x, y, yIncrement, xCondition] = [0, 0, 1, rows - 1];
          } else if (direction === 'ArrowLeft') {
            [x, y, xIncrement, yCondition, x, y] = [columns - 1, rows - 1, -1, -1, -1, -1];
          } else if (direction === 'ArrowUp') {
            [x, y, yIncrement, xCondition, x, y] = [columns - 1, rows - 1, -1, -1, -1, -1];
          }
      
          for (let i = 0; i < columns * rows; i++) {
            const currentTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            let nextTile = null;
      
            if (direction === 'ArrowRight' || direction === 'ArrowDown') {
              if (x < xCondition && y < yCondition) {
                nextTile = map.querySelector(`[data-x="${x + xIncrement}"][data-y="${y + yIncrement}"]`);
              } else if (x === xCondition && y < yCondition) {
                x = 0;
                y += yIncrement;
                nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`);
              } else if (y === yCondition) {
                y = 0;
                x += xIncrement;
                nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`);
              }
            } else if (direction === 'ArrowLeft' || direction === 'ArrowUp') {
              if (x > xCondition && y > yCondition) {
                nextTile = map.querySelector(`[data-x="${x + xIncrement}"][data-y="${y + yIncrement}"]`);
              } else if (x === xCondition && y > yCondition) {
                x = columns - 1;
                y += yIncrement;
                nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`);
              } else if (y === yCondition) {
                y = rows - 1;
                x += xIncrement;
                nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`);
              }
            }
      
            if (nextTile) {
                map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage = nextTile;
            }
        }
    }});
      

    // map.addEventListener('keydown', (event) => {
    //     if (event.code === 'ArrowRight') {
    //         for (y = 0; y < rows; y++) {
    //             for (x = 0; x < columns; x++) {
    //                 if (x <= columns - 2) {
    //                     const nextTile = map.querySelector(`[data-x="${x + 1}"][data-y="${y}"]`).style.backgroundImage;
    //                     map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage =
    //                     map.querySelector(`[data-x="${x + 1}"][data-y="${y}"]`).style.backgroundImage;
    //                 }
    //             }
    //         }
    //     } else if (event.code === 'ArrowDown') {
    //         for (y = 0; y < rows; y++) {
    //             for (x = 0; x < columns; x++) {
    //                 if (y <= rows) {
    //                     const nextTile = map.querySelector(`[data-x="${x}"][data-y="${y + 1}"]`).style.backgroundImage;
    //                     map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage = 
    //                     map.querySelector(`[data-x="${x}"][data-y="${y + 1}"]`).style.backgroundImage;
    //                 }
    //             }
    //         }
    //     } else if (event.code === 'ArrowLeft') {
    //         for (y = rows - 1; y > -1; y--) {
    //             for (x = columns - 1; x > -1; x--) {
    //                 if (x >= 1) {
    //                     const nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage;
    //                     map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage = 
    //                     map.querySelector(`[data-x="${x - 1}"][data-y="${y}"]`).style.backgroundImage;
    //                 }
    //             }
    //         }
    //     } else if (event.code === 'ArrowUp') {
    //         for (y = rows - 1; y > -1; y--) {
    //             for (x = columns - 1; x > -1; x--) {
    //                 if (y >= 1) {
    //                     const nextTile = map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage;
    //                     map.querySelector(`[data-x="${x}"][data-y="${y}"]`).style.backgroundImage = 
    //                     map.querySelector(`[data-x="${x}"][data-y="${y - 1}"]`).style.backgroundImage;
    //                 }
    //             }
    //         }
    //     }
        
    // });
};