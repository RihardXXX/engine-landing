import React, { useState, useEffect } from 'react';
import { getPageList, postNewPage } from '../../services';

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
    console.log(pageName);
    postNewPage(pageName)
      .then(({ statusText }) => {
        if (statusText === 'OK') {
          setPageName((pageName) => '');
          renderListPage();
        }
      })
      .catch(() => alert('Страница уже существует'));
  };

  // Life Cickles Hooks
  useEffect(() => {
    renderListPage();
    return () => {};
  }, []);

  const liRender = listPage.map((page) => <li key={page}>{page}</li>);

  return (
    <React.Fragment>
      <div>
        <input type="text" onChange={changeInput} value={pageName} />
        <button disabled={!pageName} onClick={createNewPage}>
          создать страницу
        </button>
      </div>
      <ul>{liRender}</ul>
    </React.Fragment>
  );
};

export default Editor;
