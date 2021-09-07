const getPageList = () => {
  const listPage = document.querySelector('.list-page');
  listPage.innerHTML = '';
  // get
  fetch('/engine/admin/api')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((file) => {
        const li = document.createElement('li');
        li.innerHTML = file;
        listPage.appendChild(li);
      });
    });
};

getPageList();

//post
// Пример отправки POST запроса:
async function postData(url = '', data) {
  // Default options are marked with *

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: data, // body data type must match "Content-Type" header
  });
  if (!response.ok) {
    alert('Страница уже существует');
  }
  console.log(response);
  return await response.text(); // parses JSON response into native JavaScript objects
}

const button = document.querySelector('button');
const namePage = document.querySelector('input');

// создание страниц
button.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('page', namePage.value);
  namePage.value = '';
  postData('/engine/admin/api/createNewPage.php', formData).then((data) => {
    getPageList();
  });
});
