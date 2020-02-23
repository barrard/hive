// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  solar_panels: [
    {
      _id: 1,
      model: "VBHN330SA17",
      manufacturer: "Panasonic HIT",
      watt: "330",
      efficiency: "19.7%",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/Panasonic%20N330%3A335_VPENJ75.png"
    },
    {
      _id: 2,
      model: "NeON 2 LG350N1C-V5",
      manufacturer: "LG",
      watt: "350",
      efficiency: "19.6%",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/desktop_LG340N1C-V5.png"
    }
  ],
  batterys: [
    {
      _id: 1,
      model: "Smart Harbor",
      manufacturer: "PIKA",
      kwh: "20",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/Panasonic%20N330%3A335_VPENJ75.png"
    },
    {
      _id: 2,
      model: "Power Wall",
      manufacturer: "TESLA",
      kwh: "9",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/desktop_LG340N1C-V5.png"
    }
  ],
  inverters: [
    {
      _id: 1,
      model: "x7602",
      manufacturer: "PIKA",
      volt: "7600",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/Panasonic%20N330%3A335_VPENJ75.png"
    },
    {
      _id: 2,
      model: "x1102",
      manufacturer: "PIKA",
      volt: "1100",
      img:
        "https://es-media-prod.s3.amazonaws.com/media/components/panels/images/desktop/desktop_LG340N1C-V5.png"
    }
  ],
  material_types: ["SOLAR PANELS", "BATTERY STORAGE", "INVERTER", "WIRES"],
  selected_materials_type: ""
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case "SET_MATERIALS_TYPE": {
      return {
        ...state,
        selected_materials_type: action.material_type
      };
    }
    // case "SET_CSRF": {
    //   return { ...state, csrf: action.csrf };
    // }

    // case "GET_CSRF": {
    //   const { csrf } = state;
    //   return { csrf };
    // }

    default:
      return state;
  }
};
