<template>
  <q-page class="flex q-pa-sm">
    <q-card class="full-width" flat>
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
        <q-tab-panel name="apc" class="full-width">
          <div class="full-width">
            <q-list separator>
              <q-item
                class="rounded-borders q-pa-sm q-card items-center justify-between"
                v-for="user in users.users"
                :key="user.userID"
                bordered
                clickable
                v-ripple
                ><div>
                  <q-item-section>
                    <q-item-label class="text-bold text-grey text-caption">
                      {{ user.userID }}
                    </q-item-label>
                    <q-item-label class="text-weight-bolder text-body2 q-pr-sm">
                      {{ user.fName }} {{ user.lName }}
                    </q-item-label>
                    <q-item-label class="text-overline">
                      {{ user.email }}
                    </q-item-label>
                  </q-item-section>
                </div>
                <div>234</div>
              </q-item>
            </q-list>
          </div>
          <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
            <q-list class="">
              <q-item
                class="rounded-borders q-my-md q-card column"
                bordered
                clickable
                v-ripple
              >
                <q-item-section class="col">
                  <!-- details, category, and status -->
                  <q-item-label class="row items-center justify-between"
                    ><div>
                      <span class="text-weight-bolder text-body1 q-pr-sm"
                        >bla bla bla bal dhsdf </span
                      ><span class="text-bold text-grey">·</span
                      ><span class="text-bold text-grey text-caption q-pl-sm">
                        Building Upkeep</span
                      >
                    </div>
                    <div
                      class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                      bordered
                    >
                      In Progress
                    </div>
                  </q-item-label>
                  <!-- location -->
                  <q-item-label class="text-caption"
                    >Floor {{ 3 }} |
                    {{ Hallway }}
                  </q-item-label>
                  <!-- date and ticket id -->
                  <q-item-label class="row items-center justify-between">
                    <div class="text-caption text-grey q-pt-lg">
                      Submitted: 5 Minutes ago
                    </div>
                    <div class="text-caption text-grey q-pt-lg">ID: 123</div>
                  </q-item-label>
                  <q-item-label
                    ><q-btn
                      rounded
                      label="Assign"
                      class="bg-primary"
                      style="color: white; width: 100%"
                    ></q-btn
                    ><q-btn
                      rounded
                      label="Unsubscribe"
                      class="bg-primary"
                      style="color: white; width: 100%"
                    ></q-btn
                  ></q-item-label>
                </q-item-section>
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
import { userStore } from "src/stores/store_User";

export default {
  setup() {
    const users = userStore();
    return { users };
  },
  data() {
    return {
      tab: ref("apc"),
    };
  },
  mounted() {
    this.users.getUsers();
  },
  components: {
    //"apc-management": require("components/apc_manage.vue").default,
  },
};
</script>
