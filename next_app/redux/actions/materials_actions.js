export function set_materials_type(material_type) {
  console.log({ material_type });
  return {
    type: "SET_MATERIALS_TYPE",
    material_type
  };
}

export function is_loading(is_loading) {
  console.log({ is_loading });
  return {
    type: "IS_LOADING",
    is_loading
  };
}
