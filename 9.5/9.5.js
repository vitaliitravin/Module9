document.addEventListener('DOMContentLoaded', function() {
    const btnNode = document.querySelector('.j-btn-request')
    const resultNode = document.querySelector('.j-result');
   
  
  btnNode.addEventListener('click', sendRequest); 
  
  function sendRequest() {
    const pageNum = +document.querySelector('.input-page-num').value;
    const limit = +document.querySelector('.input-lim').value;
    
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 10) {
      if (isNaN(limit) || limit < 1 || limit > 10) {
        resultNode.innerHTML = "Номер страницы и лимит вне диапозона от 1 до 10";
      } else if (isNaN(pageNum) || pageNum < 1 || pageNum > 10) {
        resultNode.innerHTML = "Номер страницы вне диапозона от 1 до 10";
      } else if (isNaN(limit) || limit < 1 || limit > 10) {
         resultNode.innerHTML = "Номер лимита вне диапозона от 1 до 10";
      } else {
        fetch (`https://picsum.photos/v2/list?page=${pageNum}&limit=${limit}`)
        .then((response) => {
          const result = response.json();
          return result;
        })
        .then ((data) => { 
          displayResult(data);
          localStorage.setItem('firstJSON', JSON.stringify(data));                   
        })
        .catch((e) => {console.log(e)});
      }  
    }
  
  function displayResults(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = `
            <div class="card">
              <img src="${item.download_url}" class="card-image"/>
                <p>${item.author}</p>
      </div>
      `;
      cards = cards + cardBlock;
    });
    
    resultNode.innerHTML = cards;
  }
  window.onload = function () {
    const firstJSON = localStorage.getItem('firstJSON');
    
    if (firstJSON) {
      displayResults(JSON.parse(firstJSON));
    }
  }  
    
  }})