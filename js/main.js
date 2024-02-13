let duration = 1000;
let blocks = Array.from(document.querySelectorAll(".memory-blocks .block"));
let orderRange = Array.from(Array(blocks.length).keys());
document.querySelector(".control-button span").onclick = function () {
    document.querySelector(".memory-blocks").classList.remove("no-clicking");
    document.querySelector(".timer span").textContent = 63;
    document.querySelector(".tries span").textContent = 0;
    document.querySelector(".lose span").style.display = "none";
    document.querySelector(".win span").style.display = "none";
    blocks.forEach(block => {
        block.classList.remove("match");
    });
    let yourname = prompt("Whats Your Name");
    (yourname == null || yourname == "") ? document.querySelector(".name span").textContent = "Unkown" : document.querySelector(".name span").textContent = yourname;
    this.parentElement.style.display = "none";
    document.querySelectorAll(".block").forEach(e => {
        e.style.transform = "rotateY(180deg)";
    });
    setTimeout(() => {
        document.querySelectorAll(".block").forEach(e => {
            e.style.transform = "rotateY(0)";
        });
    }, 3000);
    let inter = setInterval(() => {
        let x = 0;
        document.querySelector(".timer span").textContent = +document.querySelector(".timer span").textContent - 1;
        for (let i = 0; i < blocks.length; i++) {
            if (!blocks[i].classList.contains("match")) {
                x = 1;
                break;
            };
        };
        if (document.querySelector(".timer span").textContent == 0 || x == 0) {
            clearInterval(inter);
            for (let i = 0; i < blocks.length; i++) {
                if (!blocks[i].classList.contains("match")) {
                    document.querySelector(".lose span").style.display = "block";
                    document.querySelector(".memory-blocks").classList.add("no-clicking");
                    if (document.querySelector(".name span").textContent !== "Unkown") {
                        localStorage.setItem(`${document.querySelector(".name span").textContent}`, `${document.querySelector(".tries span").textContent} Tries And Lose`);
                    }
                    this.parentElement.style.display = "block";
                    break;
                };
            };
            if (document.querySelector(".lose span").style.display !== "block") {
                document.querySelector(".win span").style.display = "block";
                if (document.querySelector(".name span").textContent !== "Unkown") {
                    localStorage.setItem(`${document.querySelector(".name span").textContent}`, `${document.querySelector(".tries span").textContent} Tries And Win`);
                }
                this.parentElement.style.display = "block";
            };
        };
    }, duration);
    shuffle(orderRange);
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
        block.addEventListener("click", function () {
            fb(block);
        });
    });
};
function shuffle(array) {
    let cur = array.length,
        temp,
        random;
    while (cur > 0) {
        random = Math.floor(Math.random() * cur);
        cur--;
        temp = array[cur];
        array[cur] = array[random];
        array[random] = temp;
    };
};
function fb(b) {
    b.classList.add("flip");
    let afb = blocks.filter(fb => fb.classList.contains("flip"));
    if (afb.length == 2) {
        sc();
        mb(afb[0], afb[1]);
        afb.length = 0;
    };
};
function sc() {
    document.querySelector(".memory-blocks").classList.add("no-clicking");
    setTimeout(function () {
        document.querySelector(".memory-blocks").classList.remove("no-clicking");
    }, duration);
};
function mb(f, s) {
    if (f.dataset.name === s.dataset.name) {
        f.classList.remove("flip");
        s.classList.remove("flip");
        f.classList.add("match");
        s.classList.add("match");
        document.getElementById("success").play();
    } else {
        document.querySelector(".tries span").textContent = +document.querySelector(".tries span").textContent + 1;
        document.getElementById("fail").play();
        setTimeout(() => {
            f.classList.remove("flip");
            s.classList.remove("flip");
        }, duration);
    };
};
