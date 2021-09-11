// экшены с запросами
import { postNewPage, getPageList } from '../services'

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
const getList = (getPageList, dispatch) => () => {
  dispatch(getPageListStart());
  getPageList()
    .then((data) => dispatch(getPageListSuccess(data)))
    .catch((error) => dispatch(getPageListFailure(error)));
};

// создаём новый файл
const createNewPage = (pageName,dispatch) => () => {
  postNewPage(pageName)
      .then(({ statusText }) => {
        if (statusText === 'OK') {
          dispatch(clearPageNameInput())
          dispatch(getList(getPageList, dispatch))
        }
      })
      .catch(() => alert('Страница уже существует'));
};

export { getList, changePageName, createNewPage };
