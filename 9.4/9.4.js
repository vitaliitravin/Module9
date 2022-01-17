// document.addEventListener('DOMContentLoaded', function() {
  const btnNode = document.querySelector('.j-btn-request');
  const resultNode = document.querySelector('.j-result');
  const img = document.querySelector('.image');
   
  btnNode.addEventListener('click', function(e) {
  e.preventDefault()
  const width = document.querySelector('.input-vs1').value;
  const height = document.querySelector('.input-vs2').value;
    
    if(typeof width === "number" && typeof height === "number" && !isNaN(width) && !isNaN(height)) {
      if(width >= 100 && width <= 300 && height >= 100 && height <= 300) {
        resultNode.innerText = "";
        let fetchUrl = `https://picsum.photos/${width}/${height}`;
        
        fetch(fetchUrl)
      .then((response) => {
        const result = response.json();
        return result;
      })
      .then ((data) => { 
        img.setAttribute("src", data.url);
        // resultNode.innerHTML = `<img src='${data.url}' class='card-image'>`
      })  
      } else {
        resultNode.innerText = "Одно из чисел вне диапазона от 100 до 300";
      }
      } else {
        resultNode.innerText = "Ошибка при вводе данных"
      }
    })
    
  // })
 
   