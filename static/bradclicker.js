document.addEventListener("DOMContentLoaded", () => {
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
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }
    const pic = document.querySelector(".pic");
    const counter = document.querySelector(".counter");
    let brad = Number(getCookie("brad"));
    if (brad == null){
        brad = 0;
    }
    const update = () => {
        setCookie("brad", brad.toString());
        counter.innerHTML = brad.toString();
    }
    pic.addEventListener("click", () => {
        brad += 1;
        update();
    })
    update();
})