const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let scale;
let path;

const button4x4 = document.getElementById("button4x4");
const button32x32 = document.getElementById("button32x32");
const buttonImage = document.getElementById("buttonImage");
const control_menu = document.querySelector(".control_menu");

// Обновленный вариант
control_menu.onclick = function(event){
	let target = event.target.closest('div');
	if(target == button4x4){
		path = "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json";
  		updateJSONCanvas(path);
	}
	if(target == button32x32){
		path = "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json";
  		updateJSONCanvas(path);
	}
	if(target ==buttonImage){
	    path = "data/image.png";
  		updateImageCanvas(path);	
	}
}

// Старый вариант

// button4x4.addEventListener("click", () => {
//   path = "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json";
//   updateJSONCanvas(path); 
// });

// button32x32.addEventListener("click", () => {
//   path = "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json";
//   updateJSONCanvas(path);
// });

// buttonImage.addEventListener("click", () => {
//   path = "data/image.png";
//   updateImageCanvas(path);
// });

function updateImageCanvas(path) {
  canvas.width = 512;
  canvas.height = 512;
  const img = new Image();
  img.src = path;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

 function updateJSONCanvas(path) {
  fetch(path)
    .then(result => result.json())
    .then(data => {
      const width = data[0].length;
      const height = data.length;

      const newData = formatData(data);
      canvas.width = width * scale;
      canvas.height = height * scale;

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          ctx.fillStyle = newData[row][col];
          ctx.fillRect(row * scale, col * scale, 512, 512);
        }
      }
    });
}

function formatData(data) {
  if (data.length === 4) {
      scale = 128;
    return data.map(inner => inner.map(elem => "#" + elem)) ;
  } else if (data.length === 32) {
      scale = 16;
    return data.map(inner => inner.map(elem => "rgba(" + elem + ")"));
  } else {
    return data;
  }
}













  

