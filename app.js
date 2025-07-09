let textToSay = "";

document.getElementById('startBtn').addEventListener('click', () => {
  const textarea = document.getElementById('textToSpeak');
  textToSay = textarea.value.trim();

  if (textToSay === "") {
    alert("Iltimos, avval matnni kiriting!");
    return;
  }

  document.getElementById('status').innerText = "Kuzatish boshlandi. Zaryadga ulanishni kuting...";

  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {

      battery.addEventListener('chargingchange', () => {
        if (battery.charging) {
          speakText(textToSay);
        }
      });

      if (battery.charging) {
        speakText(textToSay);
      }
    });
  } else {
    alert("Brauzeringiz getBattery() funksiyasini qo'llab-quvvatlamaydi.");
  }
});

function speakText(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "uz-UZ"; 
  window.speechSynthesis.speak(msg);

  document.getElementById('status').innerText = "✅ Zaryad ulandi! Gapirildi.";
}
