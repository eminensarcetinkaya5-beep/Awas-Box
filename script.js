let currentIconSize = 70;
let isLocked = false;

// Ayarları Uygula ve Güncelle
function applySettings() {
    if (isLocked) return;

    const giftSelect = document.getElementById('gift-select');
    const giftTextInput = document.getElementById('gift-text-input');
    
    const giftEmoji = document.getElementById('gift-emoji');
    const giftTextDisplay = document.getElementById('gift-text-display');
    const cardDisplay = document.getElementById('card-display');

    giftEmoji.innerText = giftSelect.value;
    giftTextDisplay.innerText = giftTextInput.value.trim() !== "" ? giftTextInput.value : "GG";

    cardDisplay.style.transform = "scale(1.08)";
    setTimeout(() => {
        cardDisplay.style.transform = "scale(1)";
    }, 150);
}

// İkonu Anlık Değiştir
function updateGiftIcon() {
    if (isLocked) return;
    document.getElementById('gift-emoji').innerText = document.getElementById('gift-select').value;
}

// Boyut Değiştir
function changeSize(delta) {
    if (isLocked) return;
    const giftBox = document.getElementById('gift-box');
    currentIconSize += delta;
    
    if (currentIconSize < 35) currentIconSize = 35;
    if (currentIconSize > 140) currentIconSize = 140;

    giftBox.style.fontSize = currentIconSize + "px";
}

// Arka Plan Şeffaflığı
function toggleBackground() {
    const isChecked = document.getElementById('transparent-toggle').checked;
    const bgLabel = document.getElementById('bg-label');
    
    if (isChecked) {
        document.body.className = "transparent-bg";
        bgLabel.innerText = "Şeffaf";
    } else {
        document.body.className = "solid-bg";
        bgLabel.innerText = "Koyu";
    }
}

// Konum Kilidi Açma / Kapatma (Dokunulmazlık)
function toggleLockState() {
    isLocked = !isLocked;
    const cardDisplay = document.getElementById('card-display');
    const lockBadge = document.getElementById('lock-badge');
    const btnLockToggle = document.getElementById('btn-lock-toggle');

    if (isLocked) {
        cardDisplay.classList.add('locked');
        lockBadge.innerText = "🔒 Kilitli (Dokunulmaz)";
        btnLockToggle.innerText = "🔓 Kilidi Aç";
        btnLockToggle.classList.add('locked');
        document.querySelector('.control-panel').style.opacity = "0.7";
    } else {
        cardDisplay.classList.remove('locked');
        lockBadge.innerText = "🔓 Kilidi Açık";
        btnLockToggle.innerText = "🔒 Konumu Kilitle";
        btnLockToggle.classList.remove('locked');
        document.querySelector('.control-panel').style.opacity = "1";
    }
}

// Uygulama Dışına Paylaşma
function shareApp() {
    const currentUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Awas Box Live Overlay',
            text: 'Awas Box canlı yayın destek ekranımı incele!',
            url: currentUrl,
        }).catch((error) => console.log('Paylaşım iptal edildi', error));
    } else {
        navigator.clipboard.writeText(currentUrl);
        alert("Awas Box yayın linki panoya kopyalandı!");
    }
}

// Başlangıç
window.addEventListener('DOMContentLoaded', () => {
    applySettings();
});
