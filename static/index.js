window.addEventListener("DOMContentLoaded", (event) => {
    const cursorchange = document.getElementById("cursorchange");
    const insertcode = document.getElementById("insertcode");
    const catmessage = document.getElementById("catmessage");
    let catcount = 0;
    let totalcats = 2;
    let cursoridx = 6;
    let cursoreffect = new cursoreffects.trailingCursor();
    cursorchange.onclick = function() {
        cursoridx += 1;
        if (cursoridx == 8) {
            cursoridx = 1;
        }
        if (cursoridx == 1) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.rainbowCursor();
        }
        if (cursoridx == 2) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.springyEmojiCursor();
        }
        if (cursoridx == 3) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.fairyDustCursor();
        }
        if (cursoridx == 4) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.emojiCursor();
        }
        if (cursoridx == 5) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.textFlag({text: "bradisatomato™"});
        }
        if (cursoridx == 6) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.trailingCursor();
        }
        if (cursoridx == 7) {
            cursoreffect.destroy();
            cursoreffect = cursoreffects.characterCursor({characters: ["T", "O", "M", "A"]})
        }
    }
    catmessage.onclick = function() {
        document.getElementById("cats").hidden = false;
        document.getElementById("cat1").hidden = false;
        catcount += 1;
        if (catcount == totalcats) {
            alert("You found all the cats 🐱🎉");
        }
    }
    insertcode.onclick = function() {
        let code = prompt("Whats the code");
        if (code == "09ab12va10@+=") {
            document.getElementById("cats").hidden = false;
            document.getElementById("cat2").hidden = false;
            catcount += 1;
            if (catcount == totalcats) {
                alert("You found all the cats 🐱🎉");
            }
        } else {
            alert("Not a valid code");
        }
    }
})