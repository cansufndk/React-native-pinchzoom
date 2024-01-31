# React-native-pinch-zoom

<button id="copyButton">Panoya Kopyala</button>
document.getElementById('copyButton').addEventListener('click', function() {
    copyToClipboard(document.getElementById('readmeContent').innerText);
});

function copyToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
