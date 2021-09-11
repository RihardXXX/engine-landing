import React, { useEffect } from 'react';
import { getList, changePageName, createNewPage, deletePage } from '../../actions';
import { connect } from 'react-redux';

import './editor.scss';

const Editor = ({ listPage, isLoading, error, pageName, getList, changeText, createNewPage, deleteFile }) => {
  const changeInput = (e) => changeText(e.target.value);

  // Life Cickles Hooks
  useEffect(() => {
    getList();
    return () => {};
  }, ['']);

  const liRender = listPage.map((page) => (
    <li key={page}>
      <b>{page}</b>
      <span className="delete-page" onClick={deleteFile(page)}>
        <i className="fa fa-trash"></i>
      </span>
    </li>
  ));

  return (
    <div className="editor-component">
      <div>
        <input type="text" onChange={changeInput} value={pageName} />
        <button disabled={!pageName} onClick={createNewPage(pageName)}>
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

const mapDispatchToProps = dispatch => {
  return {
    getList: getList(dispatch),
    changeText: (text) => dispatch(changePageName(text)),
    createNewPage: (pageName) => createNewPage(pageName, dispatch),
    deleteFile: (page) => deletePage(page, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
