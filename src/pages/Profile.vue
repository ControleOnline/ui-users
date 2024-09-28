<template>
  <People :context="context" :peopleId="this.user.id" v-if="context" />
</template>

<script>
import People from "@controleonline/ui-people/src/components/People/Details.vue";

export default {
  components: {
    People,
  },

  computed: {
    user() {
      let user = this.$store.getters["auth/user"] || {};
      return user;
    },
  },
  data() {
    return {
      context: "profile",
    };
  },
  created() {


  },
};
</script>
