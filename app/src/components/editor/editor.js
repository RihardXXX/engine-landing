import React, { useState, useEffect } from 'react';
import { getPageList, postNewPage, deleteFile } from '../../services';

import './editor.scss';

const Editor = () => {
  // State Component
  const [listPage, setlistPage] = useState([]);
  const [pageName, setPageName] = useState('');
  const [error, setError] = useState(null);

  const changeInput = (e) => setPageName((pageName) => e.target.value);

  const renderListPage = () => {
    getPageList()
      .then((data) => setlistPage((listPage) => data))
      .catch((er) => setError((error) => er));
  };

  const createNewPage = () => {
    postNewPage(pageName)
      .then(({ statusText }) => {
        if (statusText === 'OK') {
          setPageName((pageName) => '');
        }
      })
      .catch(() => alert('Страница уже существует'));
  };

  const deletePage = (page) => {
    deleteFile(page)
      .then(({ statusText }) => {
        if (statusText === 'OK') console.log('delete page');
      })
      .catch((err) => console.log(err));
  };

  // Life Cickles Hooks
  useEffect(() => {
    renderListPage();
    return () => {};
  }, [listPage]);

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
        <button disabled={!pageName} onClick={createNewPage}>
          создать страницу
        </button>
      </div>
      <ul>{liRender}</ul>
    </div>
  );
};

export default Editor;
