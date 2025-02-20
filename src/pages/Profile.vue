<template>
  <People :context="context" :peopleId="this.$auth.user.id" v-if="context" />
</template>

<script>
import People from "@controleonline/ui-people/src/components/People/Details.vue";

export default {
  components: {
    People,
  },

  computed: {},
  data() {
    return {
      context: "profile",
    };
  },
  created() {},
};
</script>
