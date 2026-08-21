import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";
import * as customActions from "./customActions";

export default {
  namespaced: true,
  state: {
    item: {},
    items: [],
    resourceEndpoint: "users",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    summary: {},
    filters: {},
    columns: [
      {
        isIdentity: true,
        sortable: true,
        editable: false,
        name: "username",
        label: "username",
        align: "left",
        format(value) {
          return value || "";
        },
      },
      {
        sortable: false,
        editable: false,
        name: "people",
        label: "people",
        align: "left",
        format(value, _column, row) {
          if (value && typeof value === "object") {
            return value.name || value.alias || value.id || "";
          }
          return value || row?.people_id || "";
        },
      },
      {
        sortable: false,
        editable: false,
        name: "apiKey",
        label: "apiKey",
        align: "left",
        format(value) {
          const key = String(value || "").trim();
          if (!key) return "";
          if (key.length <= 12) return key;
          return `${key.slice(0, 6)}…${key.slice(-4)}`;
        },
      },
    ],
  },
  actions: { ...actions, ...customActions },
  getters,
  mutations,
};
