// Utility functions
function set_cookie(name, value) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function get_cookie(name) {
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

// App functions
const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })

        burger.classList.toggle("toggle");
    })
}

const theme = () => {
    const uploadButton = document.querySelector(".upload-theme");
    const fileInput = document.querySelector(".theme-upload");
    const themeInfo = document.querySelector(".theme-info");

    // Apply the saved theme on page load
    applySavedTheme();

    // Handle theme upload
    uploadButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/css") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const cssContent = e.target.result;

                // Extract metadata
                const metadata = extractThemeMetadata(cssContent);
                if (metadata) {
                    themeInfo.textContent = `Your theme is ${metadata.name} by ${metadata.author}`;
                } else {
                    themeInfo.textContent = "Your theme is unknown.";
                }

                // Save and apply the theme
                saveTheme(cssContent);
                applyTheme(cssContent);
            };
            reader.readAsText(file);
            document.location.reload();
        } else {
            alert("Please upload a valid theme.");
        }
    });

    function extractThemeMetadata(cssContent) {
        const firstLine = cssContent.split("\n")[0].trim();
        const match = firstLine.match(/^\/\*([^,]+),([^*]+)\*\//);
        if (match) {
            return { name: match[1].trim(), author: match[2].trim() };
        }
        return null;
    }

    function saveTheme(cssContent) {
        localStorage.setItem("customTheme", cssContent);
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem("customTheme");
        if (savedTheme) {
            applyTheme(savedTheme);
            const metadata = extractThemeMetadata(savedTheme);
            if (metadata) {
                themeInfo.textContent = `Your theme is ${metadata.name} by ${metadata.author}`;
            }
        }
    }

    function applyTheme(cssContent) {
        let themeStyleTag = document.querySelector(".custom-theme-style");
        if (!themeStyleTag) {
            themeStyleTag = document.createElement("style");
            themeStyleTag.class = "custom-theme-style";
            document.head.appendChild(themeStyleTag);
        }
        themeStyleTag.textContent = cssContent;
    }
}

const app = () => {
    navSlide();
    theme();
}

app();