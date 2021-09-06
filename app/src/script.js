fetch('/engine/admin/api')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((file) => {
      const h1 = document.createElement('h1');
      h1.innerHTML = file;
      document.body.append(h1);
    });
  });
