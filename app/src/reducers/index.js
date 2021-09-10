import editorState from './editorState';

const reducer = (state, action) => {
  return {
    editorState: editorState(state, action),
  };
};

export default reducer;
