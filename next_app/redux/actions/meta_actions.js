export function set_csrf(csrf) {
  return {
    type: "SET_CSRF",
    csrf
  };
}

export function is_loading(is_loading) {
  console.log({ is_loading });
  return {
    type: "IS_LOADING",
    is_loading
  };
}
