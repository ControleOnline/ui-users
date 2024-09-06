<template>
  <div class="q-pt-lg">
    <q-card class="q-mb-md q-pa-none">
      <q-card-section class="q-pa-none">
        <div class="q-pa-none">
          <DefaultTable :configs="configsUsers" v-if="configsUsers && loaded" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ChangePassword from "./ChangePassword";
import CreateUser from "./CreateUser";
export default {
  components: {
    ChangePassword,
    CreateUser,
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
          headerActions: {
            component: CreateUser,
            props: {
              people: this.people,
            },
          },
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
