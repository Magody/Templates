var cards = document.querySelectorAll(".card");

for (i=0; i<cards.length; i++) {
    cards[i].addEventListener("mousemove", onHover);
    cards[i].addEventListener("mouseleave", onBlur);
}

const MAX_ROTATION_X = 3;
const MAX_ROTATION_Y = 3;

function onHover(e){


    var rect = this.getBoundingClientRect();
    
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.

    var card_width_percentage = x/rect.width;
    var card_height_percentage = y/rect.height;

    var rotation_x_direction = 1; // normal
    if(card_height_percentage >= 0.5) {
        rotation_x_direction = -1; // inverse
    }else{
        card_height_percentage = 1 - card_height_percentage
    }


    var rotation_y_direction = -1; // normal
    if(card_width_percentage >= 0.5) {
        rotation_y_direction = 1; // inverse
    }else{
        card_width_percentage = 1 - card_width_percentage
    }

    
    var property_rotateX = "rotateX("+(rotation_x_direction * card_height_percentage * MAX_ROTATION_X) + "deg)"
    
    var property_rotateY = "rotateY("+(rotation_y_direction * card_width_percentage * MAX_ROTATION_Y) + "deg)"
    

    // console.log(card_width_percentage, card_height_percentage)
    //console.log(x, y)
    
    //console.log(card_height_percentage)

    this.style.setProperty('transform', property_rotateX + " " + property_rotateY);
}


function onBlur(e){
    this.style.setProperty('transform', "rotateX(0) rotateY(0)");
}

