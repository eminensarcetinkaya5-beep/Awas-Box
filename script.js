let currentIconSize = 85;
let isLocked = false;

const cardDisplay = document.getElementById('card-display');
const giftImg = document.getElementById('gift-img');
const stage = document.getElementById('overlay-stage');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Sürükleme Olayları (Mobilde ve Masaüstünde akıcı hareket)
stage.addEventListener("touchstart", dragStart, {passive: false});
stage.addEventListener("touchend", dragEnd, {passive: false});
stage.addEventListener("touchmove", drag, {passive: false});

stage.addEventListener("mousedown", dragStart);
stage.addEventListener("mouseup", dragEnd);
stage.addEventListener("mousemove", drag);

function dragStart(e) {
    if (isLocked) return;
    if (e.target.closest('#card-display')) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        isDragging = true;
    }
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging && !isLocked) {
        e.preventDefault();
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, cardDisplay);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Ayarları Uygula ve Görseli Güncelle
function applySettings() {
    const giftSelect = document.getElementById('gift-select');
    const giftTextInput = document.getElementById('gift-text-input');
    const giftTextDisplay = document.getElementById('gift-text-display');

    // Seçilen hediyenin resim linkini alıp img etiketine basıyoruz
    const selectedImageUrl = giftSelect.value;
    giftImg.src = selectedImageUrl;

    giftTextDisplay.innerText = giftTextInput.value.trim() !== "" ? giftTextInput.value : "GG";

    // Hafif animasyon efekti
    cardDisplay.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(1.08)`;
    setTimeout(() => {
        cardDisplay.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(1)`;
    }, 150);
}

function updateGiftImage() {
    const giftSelect = document.getElementById('gift-select');
    giftImg.src = giftSelect.value;
}

function filterGifts() {
    const searchText = document.getElementById('gift-search').value.toLowerCase();
    const select = document.getElementById('gift-select');
    const optgroups = select.getElementsByTagName('optgroup');

    for (let group of optgroups) {
        const options = group.getElementsByTagName('option');
        let groupHasVisible = false;
        
        for (let opt of options) {
            const txt = opt.text.toLowerCase();
            const dataName = (opt.getAttribute('data-name') || "").toLowerCase();
            if (txt.includes(searchText) || dataName.includes(searchText) || searchText === "") {
                opt.style.display = "";
                groupHasVisible = true;
            } else {
                opt.style.display = "none";
            }
        }
        group.style.display = groupHasVisible ? "" : "none";
    }
}

function changeSize(delta) {
    if (isLocked) return;
    const giftBox = document.getElementById('gift-box');
    currentIconSize += delta;
    if (currentIconSize < 45) currentIconSize = 45;
    if (currentIconSize > 160) currentIconSize = 160;

    giftBox.style.width = currentIconSize + "px";
    giftBox.style.height = currentIconSize + "px";
}

function toggleBackground() {
    const isChecked = document.getElementById('transparent-toggle').checked;
    document.body.className = isChecked ? "transparent-bg" : "solid-bg";
    document.getElementById('bg-label').innerText = isChecked ? "Şeffaf" : "Koyu";
}

function toggleLockState() {
    isLocked = !isLocked;
    const lockBadge = document.getElementById('lock-badge');
    const btnLockToggle = document.getElementById('btn-lock-toggle');

    if (isLocked) {
        cardDisplay.classList.add('locked');
        lockBadge.innerText = "🔒 Konum Kilitlendi";
        btnLockToggle.innerText = "🔓 Kilidi Aç";
        btnLockToggle.classList.add('locked');
    } else {
        cardDisplay.classList.remove('locked');
        lockBadge.innerText = "🔓 Taşınabilir Kutu";
        btnLockToggle.innerText = "🔒 Konumu Kilitle";
        btnLockToggle.classList.remove('locked');
    }
}

function shareApp() {
    const currentUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Awas Box Pro Overlay',
            text: 'Awas Box TikTok destek overlay ekranı!',
            url: currentUrl,
        }).catch((error) => console.log('Paylaşım iptal edildi', error));
    } else {
        navigator.clipboard.writeText(currentUrl);
        alert("Awas Box yayın linki panoya kopyalandı!");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    applySettings();
});
