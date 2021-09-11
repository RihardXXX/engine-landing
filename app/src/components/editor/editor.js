import React, { useEffect } from 'react';
import { getPageList } from '../../services';
import { getList, changePageName, createNewPage } from '../../actions';
import { connect } from 'react-redux';

import './editor.scss';

const Editor = ({ listPage, isLoading, error, pageName, getList, changeText, createNewPage }) => {
  // const [pageName, setPageName] = useState('');

  // const changeInput = (e) => setPageName((pageName) => e.target.value);
  const changeInput = (e) => changeText(e.target.value);

  // const createNewPage = () => {
  //   postNewPage(pageName)
  //     .then(({ statusText }) => {
  //       if (statusText === 'OK') {
  //         setPageName((pageName) => '');
  //           getList()
  //       }
  //     })
  //     .catch(() => alert('Страница уже существует'));
  // };
  //
  // const deletePage = (page) => {
  //   deleteFile(page)
  //     .then(({ statusText }) => {
  //       if (statusText === 'OK') console.log('delete page');
  //         getList()
  //     })
  //     .catch((err) => console.log(err));
  // };

  // Life Cickles Hooks
  useEffect(() => {
    getList();
    return () => {};
  }, ['']);

  const liRender = listPage.map((page) => (
    <li key={page}>
      <b>{page}</b>
      <span className="delete-page" onClick={() => deletePage(page)}>
        <i className="fa fa-trash"></i>
      </span>
    </li>
  ));

  return (
    <div className="editor-component">
      <div>
        <input type="text" onChange={changeInput} value={pageName} />
        <button disabled={!pageName} onClick={() => createNewPage(pageName)}>
          создать страницу
        </button>
      </div>
      <ul>{liRender}</ul>
    </div>
  );
};

const mapStateToProps = ({ editorState: { listPage, isLoading, error, pageName } }) => ({
  listPage,
  isLoading,
  error,
  pageName
});

const mapDispatchToProps = (dispatch) => {
  return {
    getList: getList(getPageList, dispatch),
    changeText: (text) => dispatch(changePageName(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
