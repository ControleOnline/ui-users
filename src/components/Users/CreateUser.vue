<template>
  <q-btn class="q-pa-xs btn-primary" dense icon="add" @click="openModal = true">
    <q-tooltip>
      {{ $tt("users", "btn", "CreateUser") }}
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="openModal">
    <q-card class="">
      <q-card-section class="row col-12 q-pa-sm">
        <q-toolbar class="">
          <q-toolbar-title class="">{{
            $tt("users", "title", "CreateUser")
          }}</q-toolbar-title>
          <q-btn
            class="btn-primary"
            no-caps
            flat
            v-close-popup
            round
            dense
            icon="close"
          />
        </q-toolbar>
      </q-card-section>
      <q-card-section class="row q-pa-md">
        <q-form @submit="handleSubmit" class="col-12">
          <q-input
            type="text"
            v-model="user.username"
            :label="$tt('users', 'label', 'User')"
            filled
            class="q-mb-md"
          />
          <q-input
            type="password"
            v-model="user.password"
            :label="$tt('users', 'label', 'Password')"
            :rules="[(val) => !!val || ' Password is required']"
            filled
            class="q-mb-md"
          />
          <q-input
            type="password"
            v-model="user.confirmPassword"
            :label="$tt('users', 'label', 'ConfirmPassword')"
            :rules="[
              (val) =>
                val === user.password ||
                this.$tt('users', 'message', 'Passwords must match'),
            ]"
            filled
            class="q-mb-md"
          />
          <div class="row justify-end q-gutter-sm">
            <q-btn
              :label="$tt('users', 'btn', 'Cancel')"
              flat
              v-close-popup
              class="btn-secondary"
            />
            <q-btn
              :label="$tt('users', 'btn', 'CreateUser')"
              type="submit"
              class="btn-primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      openModal: false,
      user: { people: this.componentProps.people },
    };
  },
  props: {
    componentProps: {},
  },
  created() {},
  methods: {
    ...mapActions({
      createUser: "users/createUser",
    }),
    handleSubmit() {
      if (this.user.password !== this.user.confirmPassword) {
        this.$q.notify({
          color: "negative",
          message: this.$tt("users", "message", "Passwords do not match"),
        });
        return;
      }
      this.createUser(this.user).then((data) => {
        this.$emit("saved", data);
        this.$q.notify({
          color: "positive",
          message: this.$tt("users", "message", "User created successfully"),
        });
        this.openModal = false;
      });
    },
  },
};
</script>
