const axios = require('axios');

const instance = axios.create({
  baseURL: '/engine/admin/api',
  timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

// listPage
const getPageList = async () => {
  try {
    const response = await instance.get('');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Create new Page
const postNewPage = async (namePage) => {
  try {
    const response = await instance.post('/createNewPage.php', {
      page: namePage,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteFile = async (nameFile) => {
  try {
    const response = await instance.post('/deletePage.php', {
      page: nameFile,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getPageList, postNewPage, deleteFile };
