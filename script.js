const cardPair = {
    pair: [],

    add(card) {
        if (!this.pair.includes(card)) {
            this.pair.push(card);
        }
    },

    clear() {
        this.pair.length = 0;
    },

    unflip(fn) {
        this.pair.forEach(card => card.classList.remove("-flipped"));
    },
    
    reset() {
        let tmpPair = {};
        Object.assign(tmpPair, this);
        tmpPair.pair = [...this.pair];
        setTimeout(() => tmpPair.unflip(), 1000);
        this.clear();
    },

    removeOnclick() {
        this.pair.forEach(card => card.removeAttribute("onclick"));
    },

    hasTwo() {
        return this.pair.length === 2;
    },

    matchImage() {
        const img_a = this.pair[0].querySelector(".card_side").getAttribute("src");
        const img_b = this.pair[1].querySelector(".card_side").getAttribute("src");
        return img_a === img_b;
    },
};

let playCount = 0;

main();

function main() {
    const cardAmount = askCardAmount();
    populateGame(cardAmount);
}

function askCardAmount() {
    let cardAmount;

    do {
        cardAmount = prompt("Com quantas cartas você gostaria de jogar?\n(Número par entre 4 e 14)");
    } while (cardAmount < 4 || cardAmount > 14 || cardAmount % 2 !== 0)

    return cardAmount;
}

function populateGame(cardAmount) {
    const parrotImages = [
        "bobrossparrot.gif",
        "explodyparrot.gif",
        "fiestaparrot.gif",
        "metalparrot.gif",
        "revertitparrot.gif",
        "tripletsparrot.gif",
        "unicornparrot.gif"
    ].sort(() => Math.random() - 0.5); /* Pra mudar as imagens a cada jogo */

    const cardsHTML = [];

    for (let i = 0; i < cardAmount / 2; i++) {
        const card = generateCard(parrotImages[i]);
        cardsHTML.push(card);
        cardsHTML.push(card);
    }

    cardsHTML.sort(() => Math.random() - 0.5);
    document.querySelector(".game").innerHTML = cardsHTML.join("");
}

function generateCard(imgName) {
    return `
        <div class="card" onclick="stepGame(this)">
            <img class="card_side -flipped -unmatched -pixelated" src="assets/${imgName}" />
            <img class="card_side" src="assets/back.png" />
        </div>
    `;
}

function stepGame(card) {
    playCount++;
    card.classList.add("-flipped");
    cardPair.add(card);

    if (!cardPair.hasTwo()) {
        return;
    }

    if (!cardPair.matchImage()) {
        cardPair.reset();
        return;
    }

    cardPair.removeOnclick();
    cardPair.clear();

    if (document.querySelectorAll(".card:not(.-flipped)").length === 0) {
        setTimeout(() => alert(`Você ganhou em ${playCount} jogadas!`), 1000);
    }
}
