document.addEventListener("DOMContentLoaded", () => {
    const pic = document.querySelector(".pic");
    const counter = document.querySelector(".counter");
    const addbpc = document.querySelector(".addbpc");
    const macaronimode = document.querySelector(".macaronimode");
    const logoText = document.querySelector(".logo-text");
    const footerText = document.querySelector(".footer-text");
    const favicon = document.querySelector(".favicon");

    function setCookie(name, value) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 100);
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }

    let typedSequence = "";
    document.addEventListener("keydown", (event) => {
        typedSequence += event.key.toLowerCase();
        if (typedSequence.length > 8) {
            typedSequence = typedSequence.slice(-8);
        }
        if (typedSequence === "macaroni") {
            macaronimode.style = "display: block;";
            typedSequence = "";
        }
    });

    let brad = Number(getCookie("brad")) || 0;
    let bpc = Number(getCookie("bpc")) || 1;
    let bpccost = Number(getCookie("bpccost")) || 100;
    let descriptor = "brad";

    const updateCosts = () => {
        bpccost = Math.ceil(bpccost * 1.5);
        setCookie("bpccost", bpccost.toString());
    };

    const update = () => {
        setCookie("brad", brad.toString());
        setCookie("bpc", bpc.toString());
        setCookie("bpccost", bpccost.toString());
        
        counter.innerHTML = `${brad.toString()} ${descriptor}`;
        addbpc.innerHTML = `+1 ${descriptor}/click (${bpccost}) (at ${bpc})`;
        addbpc.disabled = brad < bpccost;
    };

    const enableMacaroniMode = () => {
        macaronimode.style = "display: none;";
        pic.src = "/static/macaroni.png";
        pic.width = 128;
        pic.height = 128;
        descriptor = "macaroni";
        logoText.innerHTML = "Macaroni";
        footerText.innerHTML = "macaroni 2024";
        document.documentElement.style.setProperty("--nav-color", "rgb(100, 73, 34)");
        document.title = "macaroni";
        favicon.href = "/static/macaroni.ico";
    };

    pic.addEventListener("click", () => {
        brad += bpc;
        update();
    });

    addbpc.addEventListener("click", () => {
        if (brad >= bpccost) {
            brad -= bpccost;
            bpc += 1;
            updateCosts();
            update();
        }
    });

    macaronimode.addEventListener("click", () => {
        enableMacaroniMode();
    })

    update(); // Initial UI update
});
