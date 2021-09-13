import '../../helpers/iframeLoader.js'
import React, { useEffect } from 'react';
import { getList, changePageName, createNewPage, deletePage } from '../../actions';
import { connect } from 'react-redux';

import './editor.scss';

const Editor = ({ listPage, isLoading, error, pageName, getList, changeText, createNewPage, deleteFile }) => {
  // constant variable
  let currentPage = 'index.html'
  const iframe = document.querySelector('iframe')


  // functions
  const changeInput = (e) => changeText(e.target.value);

  const open = (page) => {
    // прописываем относительный путь
    currentPage = `../${page}`
    if (iframe) {
      iframe.load(currentPage, () => {
        // получаем тело документа из айфрейма
        const body = iframe.contentDocument.body
        let textNodes = []

        // рекурсивно находим контент текстовый которые нужно редактировать
        const recursySearch = (element) => {
          element.childNodes.forEach(node => {
            console.log(node)
            // регуляркой в условии также заменяем всё неадеватное на пустую строку
            if(node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
              // console.log(node)
              textNodes.push(node)
            } else {
              recursySearch(node)
            }
          })
        }

        recursySearch(body)

        // тут у текстовых нод создаём обёртки для редактирования
        textNodes.forEach(node => {
          // создаём свой тэг в айфрейме
          const wrapper = iframe.contentDocument.createElement('text-editor')
          // у каждой текстовой ноды в отце заменяем себя на наш тэг
          node.parentNode.replaceChild(wrapper, node)
          // а потом уже в свой тэг кладём текстовую ноду
          wrapper.appendChild(node)
          // включаем у своего тэга режим редактирования
          wrapper.contentEditable = 'true'
        })
      })
    }
  }

  // Life Cickles Hooks
  useEffect(() => {
    getList();
    return () => {};
  }, ['']);

  // const liRender = listPage.map((page) => (
  //   <li key={page}>
  //     <b>{page}</b>
  //     <span className="delete-page" onClick={deleteFile(page)}>
  //       <i className="fa fa-trash"></i>
  //     </span>
  //   </li>
  // ));

  open(currentPage)
  // renders template
  if (currentPage) {
    return <iframe src={currentPage} frameBorder="0"/>
  }
  // return (
  //     <iframe src={currentPage} frameBorder="0"/>
    // <div className="editor-component">
    //   <div>
    //     <input type="text" onChange={changeInput} value={pageName} />
    //     <button disabled={!pageName} onClick={createNewPage(pageName)}>
    //       создать страницу
    //     </button>
    //   </div>
    //   <ul>{liRender}</ul>
    // </div>
  // );
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
