<template>
  <People
    :context="context"
    :peopleId="this.user.id"
    v-if="context"
  />
</template>

<script>
import People from "@controleonline/ui-people/src/vue/components/People/Details.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    People,
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  data() {
    return {
      context: "profile",
    };
  },
  created() {},
};
</script>
