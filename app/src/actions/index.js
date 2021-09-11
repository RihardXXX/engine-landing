// экшены с запросами
import { postNewPage, getPageList, deleteFile } from '../services'

// Экшены для загрузки страницы
// ===============================
const getPageListStart = () => {
  return {
    type: 'GET_PAGE_LIST_START',
  };
};

const getPageListSuccess = (pageList) => {
  return {
    type: 'GET_PAGE_LIST_SUCCESS',
    payload: pageList,
  };
};

const getPageListFailure = (error) => {
  return {
    type: 'GET_PAGE_LIST_FAILURE',
    payload: error,
  };
};
// ========================================

// меняем состояние инпута
const changePageName = (text) => {
  return {
    type: 'CHANGE_TEXT_INPUT',
    payload: text
  }
}

//очищаем инпут
const clearPageNameInput = () => {
  return {
    type: 'CLEAR_TEXT_INPUT'
  }
}

// возвращает список файлов
const getList = (dispatch) => () => {
  dispatch(getPageListStart());
  getPageList()
    .then((data) => dispatch(getPageListSuccess(data)))
    .catch((error) => dispatch(getPageListFailure(error)));
};

// создаём новый файл
const createNewPage = (pageName, dispatch) => () => {
  console.log('pageName', pageName)
  postNewPage(pageName)
      .then(({ statusText }) => {
        console.log('statusText', statusText)
        if (statusText === 'OK') {
          dispatch(clearPageNameInput())
          dispatch(getList(dispatch))
        }
      })
      .catch(() => alert('Страница уже существует'));
};

const deletePage = (page, dispatch) => () => {
  deleteFile(page)
    .then(({ statusText }) => {
      if (statusText === 'OK') dispatch(getList(dispatch))
    })
    .catch((err) => console.log(err));
};

export { getList, changePageName, createNewPage, deletePage };
