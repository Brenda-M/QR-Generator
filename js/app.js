const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const submitForm = (e) => {
  e.preventDefault()

  clearUI()

  const url = document.getElementById('url').value
  const selector = document.getElementById('selector').value
  
  if (url === ''){
    alert('Please enter a URL')
  } else {
    showSpinner()

    setTimeout(() => {
      hideSpinner()

      generateQRCode(url, selector)

      setTimeout(() => {
        const saveURL = qr.querySelector('img').src
        createSaveBtn(saveURL)
      }, 50)

    }, 1000)
  }
}

const generateQRCode = (url, selector) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: selector,
    height: selector,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  }); 
  form.reset()
}

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block'
}

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none'
}

const clearUI = () => {
  qr.innerHTML = ''
  const saveBTN = document.getElementById('save-link')
  if (saveBTN){
    saveBTN.remove()
  }
}

const createSaveBtn = (saveURL) => {
  const link = document.createElement('a')
  link.id = 'save-link'
  link.classList = 'bg-emerald-400 hover:bg-emerald-500 text-white text-center font-bold py-2 rounded w-1/3 m-auto my-5'
  link.href = saveURL
  link.download = 'qrcode'
  link.innerHTML = 'Save QR Code'
  document.getElementById('generated').appendChild(link)
}

hideSpinner()


form.addEventListener("submit", submitForm);

