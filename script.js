window.onload = () => {
    const button = document.querySelector("#start-button");
    const fondo =  document.querySelector("#fondo");
    const canvas =  document.querySelector("#myCanvas");
    const myFont = new FontFace("ARCADECLASSIC", "url(fonts/ARCADECLASSIC.ttf)")
    const pantallaMultijugador = document.querySelector("#pantallaMultijugador")
    const onePlayerButton = document.querySelector("#onePlayerButton")
    const twoPlayersButton = document.querySelector("#TwoPlayersButton")

    button.onclick = () => {
        fondo.style.display = "none";
        canvas.style.display = "none";
        pantallaMultijugador.style.display = "block"
    }

    onePlayerButton.onclick = () => {
        fondo.style.display = "none";
        canvas.style.display = "block";
        pantallaMultijugador.style.display = "none"
        myFont.load().then(() => {
            Game.init()
        })
    }

    twoPlayersButton.onclick = () => {
        fondo.style.display = "none";
        canvas.style.display = "block";
        pantallaMultijugador.style.display = "none"
        myFont.load().then(() => {
            Game2.init()
        })
    }
}