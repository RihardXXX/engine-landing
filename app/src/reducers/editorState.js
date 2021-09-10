const editorState = (state, action) => {
  if (state === undefined) {
    return {
      listPage: [],
      pageName: '',
      isLoading: false,
      error: null,
    };
  }

  // тут обязательно добавить всякие плюшки то есть при изменении одного чтобы другое не стралось
  switch (action.type) {
    case 'GET_PAGE_LIST_START':
      return {
        listPage: [],
        pageName: '',
        isLoading: true,
        error: null,
      };
    case 'GET_PAGE_LIST_SUCCESS':
      return {
        listPage: action.payload,
        pageName: '',
        isLoading: false,
        error: null,
      };
    case 'GET_PAGE_LIST_FAILURE':
      return {
        listPage: [],
        pageName: '',
        isLoading: false,
        error: action.payload,
      };
    case 'CHANGE_TEXT_INPUT':
      return {
        listPage: [],
        pageName: action.payload,
        isLoading: false,
        error: null,
      };
    default:
      return state.editorState;
  }
};

export default editorState;
