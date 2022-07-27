window.onload = () => {
    const button = document.querySelector("#start-button");
    const fondo =  document.querySelector("#fondo");
    const canvas =  document.querySelector("#myCanvas");
    const myFont = new FontFace("ARCADECLASSIC", "url(fonts/ARCADECLASSIC.ttf)")

    button.onclick = () => {
        fondo.style.display = "none";
        canvas.style.display = "block";
        myFont.load().then(() => {
            Game.init()
        })
    }
}