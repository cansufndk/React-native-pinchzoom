# React-native-pinch-zoom
# Proje Adı

Projenin açıklaması.

## Kurulum

...

## Kullanım

...

## Katkıda Bulunma

...

## Lisans

...

<!-- Panoya Kopyala Düğmesi -->
<button id="copyButton" onclick="copyToClipboard()">npm i react-native-pinchzoom</button>

<!-- Kopyalanacak Metin -->
<div id="readmeContent">

# Proje Adı

Projenin açıklaması.

## Kurulum

...

## Kullanım

...

## Katkıda Bulunma

...

## Lisans

...

</div>

<script>
function copyToClipboard() {
    const readmeContent = document.getElementById('readmeContent');
    const textArea = document.createElement('textarea');
    
    textArea.value = readmeContent.textContent;
    document.body.appendChild(textArea);
    
    textArea.select();
    document.execCommand('copy');
    
    document.body.removeChild(textArea);
    
    alert('Metin panoya kopyalandı!');
}
</script>
