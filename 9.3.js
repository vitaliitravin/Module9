function useRequest (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if(callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
}

const resultNode = document.querySelector('.j-result');
// const btnNode = document.querySelector('.j-btn-request');


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


document.addEventListener('DOMContentLoaded', (event) => {
  const btnNode = document.querySelector('.j-btn-request');
  btnNode.addEventListener('click', function(e) {
  e.preventDefault()
  const itemValue = document.querySelector('input').value;

  if (isNaN(itemValue)) {
    console.log ('Не число');
  } else if (itemValue < 1 || itemValue > 10) {
    console.log ('Введите число от 1 до 10');
  } else {
    useRequest('https://picsum.photos/v2/list?limit=' + itemValue, displayResults);
};
  });
 
});


