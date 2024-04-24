const stateProvinces = {
  provinces: [],
};

const stateRegencies = {
  regencies: [],
};

const stateDistricts = {
  districts: [],
};

const stateVillages = {
  villages: [],
};

const provinces = (state = stateProvinces, action) => {
  if (action.type === "GET_PROVINCES") {
    return {
      ...state,
      provinces: action.payload,
    };
  }

  return state;
};

const regencies = (state = stateRegencies, action) => {
  if (action.type === "GET_REGENCIES") {
    return {
      ...state,
      regencies: action.payload,
    };
  }

  return state;
};

const districts = (state = stateDistricts, action) => {
  if (action.type === "GET_DISTRICTS") {
    return {
      ...state,
      districts: action.payload,
    };
  }

  return state;
};

const villages = (state = stateVillages, action) => {
  if (action.type === "GET_VILLAGES") {
    return {
      ...state,
      villages: action.payload,
    };
  }

  return state;
};

export { provinces, regencies, districts, villages };
