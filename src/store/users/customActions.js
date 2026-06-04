import { api } from "@controleonline/ui-common/src/api";
import * as types from "@controleonline/ui-default/src/store/default/mutation_types";

const RESOURCE_ENDPOINT = "/users";
export const changeApiKey = ({ commit }, params) => {
  commit(types.SET_ERROR, "");
  commit(types.SET_ISLOADING);

  return api
    .fetch(RESOURCE_ENDPOINT + "/" + params.id + "/change-api-key", {
      method: "PUT",
      body: params,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      commit(types.SET_ISLOADING, false);
    });
};

export const createUser = ({ commit }, params) => {
  commit(types.SET_ERROR, "");
  commit(types.SET_ISLOADING);

  return api
    .fetch(RESOURCE_ENDPOINT, {
      method: "POST",
      body: params,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      commit(types.SET_ISLOADING, false);
    });
};

export const changePassword = ({ commit }, params) => {
  commit(types.SET_ERROR, "");
  commit(types.SET_ISLOADING);

  return api
    .fetch(RESOURCE_ENDPOINT + "/" + params.id + "/change-password", {
      method: "PUT",
      body: params,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      commit(types.SET_ISLOADING, false);
    });
};

export const updateMyPreferences = ({ commit }, params) => {
  commit(types.SET_ERROR, "");
  commit(types.SET_ISLOADING);

  return api
    .fetch("/users/preferences", {
      method: "PUT",
      body: params,
    })
    .then((response) => {
      return response;
    })
    .finally(() => {
      commit(types.SET_ISLOADING, false);
    });
};
