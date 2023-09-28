const burgerButton = document.getElementById("burger-icon");
const sideDrawer = document.getElementById("side-drawer");

function toggleSideDrawer (){
     if(sideDrawer.style.display === "none" || !sideDrawer.style.display){
        sideDrawer.style.display = "block";
     } else {
        sideDrawer.style.display = "none";
     }
}

burgerButton.addEventListener("click", toggleSideDrawer);