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
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }

    const pic = document.querySelector(".pic");
    const counter = document.querySelector(".counter");
    const addbpc = document.querySelector(".addbpc");
    const addbps = document.querySelector(".addbps"); // New button for BPS

    let brad = Number(getCookie("brad")) || 0;
    let bpc = Number(getCookie("bpc")) || 1;
    let bps = Number(getCookie("bps")) || 0;
    let bpccost = Number(getCookie("bpccost")) || 100;
    let bpscost = Number(getCookie("bpscost")) || 250; // Cost to increase BPS

    const updateCosts = () => {
        bpccost = Math.ceil(bpccost * 1.5);
        setCookie("bpccost", bpccost.toString());

        bpscost = Math.ceil(bpscost * 2);
        setCookie("bpscost", bpscost.toString());
    };

    const update = () => {
        setCookie("brad", brad.toString());
        setCookie("bpc", bpc.toString());
        setCookie("bps", bps.toString());
        setCookie("bpccost", bpccost.toString());
        setCookie("bpscost", bpscost.toString());
        
        counter.innerHTML = `${brad.toString()} brad`;
        addbpc.innerHTML = `+1 brad/click (${bpccost}) (at ${bpc})`;
        addbpc.disabled = brad < bpccost;

        addbps.innerHTML = `+1 brad/second (${bpscost}) (at ${bps})`;
        addbps.disabled = brad < bpscost;
    };

    const startBps = () => {
        setInterval(() => {
            brad += bps;
            update();
        }, 1000); // Increment `brad` every second based on `bps`
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

    addbps.addEventListener("click", () => {
        if (brad >= bpscost) {
            brad -= bpscost;
            bps += 1;
            updateCosts();
            update();
        }
    });

    startBps(); // Start the Brad Per Second system
    update(); // Initial UI update
});
