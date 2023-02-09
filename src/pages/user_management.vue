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
            <q-item
              class="rounded-borders q-my-sm q-card items-center"
              v-for="user in users.getComm"
              :key="user.userID"
              bordered
              ><div class="full-width">
                <q-item-section class="justify-between">
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
              <div v-if="auth.userDetails.admin">
                <q-btn flat rounded @click="editDial(user.userID)"
                  ><q-icon name="mdi-square-edit-outline"></q-icon
                ></q-btn>
              </div>
              <q-dialog v-model="edit" persistent>
                <q-card style="min-width: 350px">
                  <q-card-section>
                    <div class="text-h6">Change Role</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-select
                      outlined
                      v-model="role"
                      :options="roleOptions"
                      label="Role"
                    />
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn
                      flat
                      label="Confirm"
                      @click="updateRole"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-item>
          </div>
        </q-tab-panel>

        <q-tab-panel name="staff">
          <div class="full-width">
            <q-list separator>
              <q-item
                class="rounded-borders q-my-sm q-card items-center"
                v-for="user in users.getStaff"
                :key="user.userID"
                bordered
                ><div class="full-width">
                  <q-item-section class="justify-between">
                    <q-item-label class="text-bold text-grey text-caption">
                      {{ user.userID }}
                    </q-item-label>
                    <q-item-label class="text-weight-bolder text-body2 q-pr-sm">
                      {{ user.fName }} {{ user.lName }}
                    </q-item-label>
                    <q-item-label class="text-overline">
                      {{ user.email }}
                    </q-item-label>
                    <q-item-label
                      class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                      bordered
                      style="width: 80px"
                      items-center
                    >
                      BMO Staff
                    </q-item-label>
                  </q-item-section>
                </div>
                <div v-if="auth.userDetails.admin">
                  <q-btn flat rounded @click="editDial(user.userID)"
                    ><q-icon name="mdi-square-edit-outline"></q-icon
                  ></q-btn>
                </div>
                <q-dialog v-model="edit" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Change Role</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        outlined
                        v-model="role"
                        :options="roleOptions"
                        label="Role"
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="Cancel" v-close-popup />
                      <q-btn
                        flat
                        label="Confirm"
                        @click="updateRole"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="admin">
          <div class="full-width">
            <q-list separator>
              <q-item
                class="rounded-borders q-my-sm q-card items-center"
                v-for="user in users.getAdmin"
                :key="user.userID"
                bordered
                ><div class="full-width">
                  <q-item-section class="justify-between">
                    <q-item-label class="text-bold text-grey text-caption">
                      {{ user.userID }}
                    </q-item-label>
                    <q-item-label class="text-weight-bolder text-body2 q-pr-sm">
                      {{ user.fName }} {{ user.lName }}
                    </q-item-label>
                    <q-item-label class="text-overline">
                      {{ user.email }}
                    </q-item-label>
                    <q-item-label
                      class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                      bordered
                      style="width: 80px"
                      items-center
                    >
                      BMO Admin
                    </q-item-label>
                  </q-item-section>
                </div>
                <div v-if="auth.userDetails.admin">
                  <q-btn flat rounded @click="editDial(user.userID)"
                    ><q-icon name="mdi-square-edit-outline"></q-icon
                  ></q-btn>
                </div>
                <q-dialog v-model="edit" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Change Role</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        outlined
                        v-model="role"
                        :options="roleOptions"
                        label="Role"
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="Cancel" v-close-popup />
                      <q-btn
                        flat
                        label="Confirm"
                        @click="updateRole"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
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
import { authStore } from "src/stores/store_Auth";

export default {
  setup() {
    const users = userStore();
    const auth = authStore();
    return { users, auth };
  },
  data() {
    return {
      editRole: {
        userID: ref(""),
        admin: false,
      },
      role: ref(""),
      roleOptions: ["None", "Staff", "Admin"],
      edit: false,
      tab: ref("apc"),
    };
  },
  mounted() {
    this.users.getUsers();
  },
  methods: {
    editDial(id) {
      this.edit = true;
      this.editRole.userID = id;
    },
    updateRole() {
      if (this.role == "") {
        this.role = "";
        this.edit = false;
        return;
      }
      if (this.role == "None") {
        this.users.deleteRole(this.editRole);
        this.role = "";
        this.edit = false;
        return;
      }
      if (this.role == "Admin") {
        this.editRole.admin = true;
        this.users.userRole(this.editRole, this.auth.userDetails.office);
        this.role = "";
        this.edit = false;
        return;
      } else this.users.userRole(this.editRole, this.auth.userDetails.office);
      this.edit = false;
    },
  },
  components: {
    //"apc-management": require("components/apc_manage.vue").default,
  },
};
</script>
