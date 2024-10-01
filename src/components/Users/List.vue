<template>
  <DefaultTable :configs="configsUsers" v-if="configsUsers && loaded" />
</template>

<script>
import ChangePassword from "./ChangePassword";
import CreateUser from "./CreateUser";
import ApiKey from "./ApiKey";
export default {
  components: {
    ChangePassword,
    CreateUser,
    ApiKey
  },
  props: {
    people: {
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    configsUsers() {
      return {
        externalFilters: false,
        filters: false,
        controls: false,
        "full-height": false,
        store: "users",
        add: false,
        editable: false,
        delete: true,
        selection: false,
        search: false,
        components: {
          customColumns: {
            apiKey: {
              component: ApiKey,
              props: {
                people: this.people,
              },
            },
          },
          headerActions: [{
            component: CreateUser,
            props: {
              people: this.people,
            },
          }],
          tableActions: {
            component: ChangePassword,
          },
        },
        title: {
          class: "text-primary text-h6 q-mb-md",
          icon: {
            name: "people",
            size: "24px",
            class: "q-mr-sm",
          },
        },
      };
    },
  },
  created() {
    this.$store.commit("users/SET_FILTERS", { people: this.people });
    this.loaded = true;
  },
};
</script>
