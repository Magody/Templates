const colorSwitch = document.getElementById("input-color-switch")

colorSwitch.addEventListener("click", checkMode)

function checkMode() {
    if(colorSwitch.checked){
        document.body.classList.add("dark-mode")
    }
    else{
        document.body.classList.remove("dark-mode")
    }
}