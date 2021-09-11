const editorState = (state, action) => {
  if (state === undefined) {
    return {
      listPage: [],
      isLoading: false,
      error: null,
      pageName: ''
    };
  }

  console.log('state', state)

  // тут обязательно добавить всякие плюшки то есть при изменении одного чтобы другое не стралось
  switch (action.type) {
    case 'GET_PAGE_LIST_START':
      return {
        listPage: [],
        isLoading: true,
        error: null,
        pageName: ''
      };
    case 'GET_PAGE_LIST_SUCCESS':
      return {
        listPage: action.payload,
        isLoading: false,
        error: null,
        pageName: ''
      };
    case 'GET_PAGE_LIST_FAILURE':
      return {
        listPage: [],
        isLoading: false,
        error: action.payload,
        pageName: ''
      };
    case 'CHANGE_TEXT_INPUT':
      return {
        listPage: state.editorState.listPage,
        isLoading: false,
        error: null,
        pageName: action.payload
      }
    case 'CLEAR_TEXT_INPUT':
      return {
        listPage: state.editorState.listPage,
        isLoading: false,
        error: null,
        pageName: ''
      }
    default:
      return state.editorState;
  }
};

export default editorState;
