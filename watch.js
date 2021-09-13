let mickeySong = document.getElementById("mickeySong");
function Song(){
   mickeySong.play();
  
  
}

(function() {

  function x2(n, i, x1, r) {
      return x1 + r * Math.sin(2 * Math.PI * n / i);
  }

  function y2(n, i, y1, r) {
      return y1 - r * Math.cos(2 * Math.PI * n / i);
  }

  function getTime() {
      var date = new Date();
      return {
          hours: date.getHours(),
          minutes: (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes(),
          seconds: (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()
      };
  }

  function drawCircle(ctx, x, y, r, width, strokeColor, background) {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = background;
      ctx.lineWidth = width;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
  }

  function drawLine(ctx, xStart, yStart, xStop, yStop, width, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xStop, yStop);
      ctx.stroke();
      ctx.closePath();
  }

 

  function startClock(ctx) {
      var time = getTime();

      ctx.clearRect(0, 0, 500, 500); 


      drawLine(ctx, 205, 220, x2(time.hours, 12, 205, 75), y2(time.hours, 12, 220, 75), 4, "#040308"); 
      drawCircle(ctx, 205, 220, 7, 7, "black", "black");
      drawCircle(ctx, x2(time.hours, 12, 205, 75), y2(time.hours, 12, 220, 75), 7, 7, "white", "white");

     

      drawLine(ctx, 205, 220, x2(time.minutes, 60, 205, 95), y2(time.minutes, 60, 220, 95), 4, "#040308"); 
      drawCircle(ctx, x2(time.minutes, 60, 205, 95), y2(time.minutes, 60, 220, 95), 7, 7, "white", "white");
      

      drawLine(ctx, 205, 220, x2(time.seconds, 60, 205, 115), y2(time.seconds, 60, 220, 115), 4, "red"); 
      drawCircle(ctx, 205, 220, 3, 5, "#525252", "#525252");
      

  
  }

  var canvas = document.getElementById("watch-clock"),
      ctx;

  if (canvas.getContext) {
      ctx = canvas.getContext("2d");

      startClock(ctx);

      setInterval(function() {
          startClock(ctx);
      }, 1000);
  } else {
      document.getElementsByTagName("body")[0].innerHTML += "<h2>Canvas not supported.</h2>";
  }

})();

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });
// Detects if device is on iOS 
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  this.setState({ showInstallMessage: true });
}
 
