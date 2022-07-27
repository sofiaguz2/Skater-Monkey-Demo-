window.onload = () => {
    const button = document.querySelector("#start-button");
    const fondo =  document.querySelector("#fondo");
    const canvas =  document.querySelector("#myCanvas");
    button.onclick = () => {
        fondo.style.display = "none";
        canvas.style.display = "block";
        Game.init()
    }
}