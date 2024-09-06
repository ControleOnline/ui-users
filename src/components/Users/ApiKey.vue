<template>
  <q-btn
    class="q-pa-xs btn-primary"
    dense
    icon="visibility"
    @click="openModal = true"
  >
    <q-tooltip>
      {{ $tt("users", "btn", "ApiKey") }}
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="openModal">
    <q-card class="">
      <q-card-section class="row col-12 q-pa-sm">
        <q-toolbar class="">
          <q-toolbar-title class="">{{
            $tt("users", "title", "ApiKey")
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
        <q-form class="col-12">
          <q-input
            type="text"
            v-model="user.apiKey"
            :label="$tt('users', 'label', 'apiKey')"
            size="60"
            filled
            class="q-mb-md"
            disabled
          />

          <div class="row justify-end q-gutter-sm">
            <q-btn
              :title="$tt('users', 'btn', 'Refresh')"
              icon="refresh"
              @click="confirmSubmit"
              class="btn-primary"
            />
            <q-btn
              :label="$tt('users', 'btn', 'Close')"
              flat
              v-close-popup
              class="btn-secondary"
            />

            <q-btn
              :label="$tt('users', 'btn', 'Copy')"
              @click="copy"
              class="btn-primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showConfirmation">
    <q-card>
      <q-card-section class="row items-center q-pa-sm">
        <q-icon name="warning" color="warning" />
        <span class="q-ml-sm">{{
          $tt("users", "message", "changeApiKey")
        }}</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="$tt('users', 'btn', 'Cancel')"
          color="primary"
          v-close-popup
        />
        <q-btn
          flat
          :label="$tt('users', 'btn', 'Change')"
          color="primary"
          @click="handleSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showConfirmation: false,
      openModal: false,
      user: { apiKey: this.row.apiKey },
    };
  },
  props: {
    row: {},
    index: {
      type: Number,
      required: false,
    },
  },
  created() {},
  methods: {
    ...mapActions({
      changeApiKey: "users/changeApiKey",
    }),
    confirmSubmit() {
      this.showConfirmation = true;
    },
    async copy() {
      await navigator.clipboard.writeText(this.user.apiKey);
    },
    handleSubmit() {
      this.changeApiKey({ id: this.row.id }).then((data) => {
        this.$emit("saved", data, this.index);
        this.$q.notify({
          color: "positive",
          message: this.$tt("users", "message", "Api Key changed successfully"),
        });
        this.user.apiKey = data.apiKey;
        this.showConfirmation = false;
      });
    },
  },
};
</script>
