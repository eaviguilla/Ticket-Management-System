<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="apc" label="APC Community" />
        <q-tab name="staff" label="Staffs" />
        <q-tab name="admin" label="Admins" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="apc">
          <div style="max-width">
            <q-list bordered separator>
              <q-item clickable v-ripple>
                <q-item-section>Emilio Aguinaldo</q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'BMO Staff',
                    'BMO Admin',
                    'ITRO Staff',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Manuel Quezon</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'BMO Staff',
                    'BMO Admin',
                    'ITRO Staff',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Sergio Osmeña</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'BMO Staff',
                    'BMO Admin',
                    'ITRO Staff',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="staff">
          <div style="max-width">
            <q-list bordered separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Antonio Luna</q-item-label>
                  <q-item-label caption>BMO Staff</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'APC Community',
                    'BMO Admin',
                    'ITRO Staff',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Gregorio del Pilar</q-item-label>
                  <q-item-label caption>ITRO Staff</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'BMO Staff',
                    'BMO Admin',
                    'APC Community',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="admin">
          <div style="max-width">
            <q-list bordered separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Jose Rizal</q-item-label>
                  <q-item-label caption>BMO Admin</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'APC Community',
                    'BMO staff',
                    'ITRO Staff',
                    'ITRO Admin',
                  ]"
                  label="Role"
                />
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Andres Bonifacio</q-item-label>
                  <q-item-label caption>ITRO Admin</q-item-label>
                </q-item-section>
                <q-select
                  v-model="role"
                  :options="[
                    'BMO Staff',
                    'BMO Admin',
                    'APC Community',
                    'ITRO staff',
                  ]"
                  label="Role"
                />
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("apc"),
    };
  },
  components: {
    //"apc-management": require("components/apc_manage.vue").default,
  },
};
</script>
