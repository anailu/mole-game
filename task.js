(() => {
    let playing = true,
      activeHole = 1;
  
    const stop = () => playing = true,
      getHole = index => document.getElementById(`hole${index}`),
      deactivateHole = index =>
        getHole( index ).className = 'hole',
      activateHole = index =>
        getHole( index ).className = 'hole hole_has-mole',
      next = () => setTimeout(() => {
        if ( !playing ) {
          return;
        }
        deactivateHole( activeHole );
        activeHole = Math.floor( 1 + Math.random() * 9 );
        activateHole( activeHole );
        next();
      }, 800 );
  
    next();
})();

const dead = document.getElementById("dead");
const lost = document.getElementById("lost");
let clickCount = 0;
let lostCount = 0;
let lastClickedPosition = null;

const getHole = index => document.getElementById(`hole${index}`);

for (let i = 1; i <= 9; i++) {
    let hole = getHole(i);

    hole.onclick = function() {
        if (hole.classList.contains('hole_has-mole')) {
            clickCount++;
            dead.innerHTML = clickCount;
            if (lastClickedPosition === i) {
                clickCount++; 
                dead.innerHTML = clickCount;
            }
            lastClickedPosition = i;
        } else {
            lostCount++;
            lost.innerHTML = lostCount;
        }

        if (clickCount === 10) {
            alert("Победа!");
            clickCount = 0;
            lostCount = 0;
            lost.innerHTML = 0;
            dead.innerHTML = 0; 
            lastClickedPosition = null;
        }
        
        if (lostCount === 5) {
            alert("Вы проиграли");
            clickCount = 0;
            lostCount = 0;
            lost.innerHTML = 0;
            dead.innerHTML = 0; 
            lastClickedPosition = null;
        }
    }
}