


const MAX_ANGLE_DEG_ROTATION_Y = 30;
const MAX_ANGLE_DEG_ROTATION_X = 30;

// over the container of the card
function onMouseMove(e, element) {
  var rect = element.getBoundingClientRect();
    
  var cursor_relative_x = e.clientX - rect.left; //x position within the element.
  var cursor_relative_y = e.clientY - rect.top;  //y position within the element.
  var x_from_center = rect.width/2 - cursor_relative_x
  var y_from_center = rect.height/2 - cursor_relative_y
  var x_from_center_norm = x_from_center/(rect.width/2)
  var y_from_center_norm = y_from_center/(rect.height/2);
  var rotationY = x_from_center_norm * MAX_ANGLE_DEG_ROTATION_Y;
  var rotationX = (y_from_center_norm * MAX_ANGLE_DEG_ROTATION_X) * -1;

  
  // console.log(rotationY, rotationX)

  const card = element.children[0];
  card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

}

function onMouseEnter(e, element) {
  const card = element.children[0];
  card.style.transition = "none";

  const sneaker = card.children[0];
  const sneaker_img = sneaker.children[1];

  const info = card.children[1];
  const title = info.children[0];
  const description = info.children[1];
  const sizes = info.children[2];
  const purchase = info.children[3];

  //Popout
  title.style.transform = "translateZ(2rem)";
  sneaker_img.style.transform = "translateZ(3rem) rotateZ(-45deg)";
  description.style.transform = "translateZ(1rem)";

  for(var button of sizes.children){
    button.style.transform = "translateZ(1rem)";
  }
  
  purchase.style.transform = "translateZ(.1rem)";
}

function onMouseLeave(e, element) {

  const card = element.children[0];

  const sneaker = card.children[0];
  const sneaker_img = sneaker.children[1];

  const info = card.children[1];
  const title = info.children[0];
  const description = info.children[1];
  const sizes = info.children[2];
  const purchase = info.children[3];

  card.style.transition = "all 0.5s ease";
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  //Popback
  title.style.transform = "translateZ(0rem)";
  sneaker_img.style.transform = "translateZ(0rem) rotateZ(0deg)";
  sneaker.style.transform = "translateZ(0rem) rotateZ(0rem)";
  description.style.transform = "translateZ(0rem)";
  
  for(var button of sizes.children){
    button.style.transform = "translateZ(0rem)";
  }

  purchase.style.transform = "translateZ(0rem)";
}
