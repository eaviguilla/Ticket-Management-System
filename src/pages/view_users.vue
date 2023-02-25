<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex q-pa-sm">
        <q-card class="full-width" flat>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            align="justify"
            indicator-color="primary"
            dense
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
                  v-for="user in users.getComm"
                  :key="user.userID"
                  class="rounded-borders q-my-sm q-card items-center"
                  bordered
                  ><div class="full-width">
                    <q-item-section class="justify-between">
                      <q-item-label class="text-bold text-grey text-caption">
                        {{ user.userID }}
                      </q-item-label>
                      <q-item-label
                        class="text-weight-bolder text-body2 q-pr-sm"
                      >
                        {{ user.fName }} {{ user.lName }}
                      </q-item-label>
                      <q-item-label class="text-overline">
                        {{ user.email }}
                      </q-item-label>
                    </q-item-section>
                  </div>
                  <div v-if="auth.userDetails.admin">
                    <q-btn flat rounded @click="editUser(user.userID)"
                      ><q-icon name="mdi-square-edit-outline"></q-icon
                    ></q-btn>
                  </div> </q-item
                ><q-dialog v-model="edit" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Change Role</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        v-model="role"
                        :options="roleOptions"
                        label="Role"
                        outlined
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="Cancel" v-close-popup />
                      <q-btn
                        v-close-popup
                        @click="updateRole"
                        label="Confirm"
                        flat
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-tab-panel>

            <q-tab-panel name="staff">
              <div class="full-width">
                <q-item
                  v-for="user in users.getStaff"
                  :key="user.userID"
                  class="rounded-borders q-my-sm q-card items-center"
                  bordered
                  ><div class="full-width">
                    <q-item-section class="justify-between">
                      <q-item-label class="text-bold text-grey text-caption">
                        {{ user.userID }}
                      </q-item-label>
                      <q-item-label
                        class="text-weight-bolder text-body2 q-pr-sm"
                      >
                        {{ user.fName }} {{ user.lName }}
                      </q-item-label>
                      <q-item-label class="text-overline">
                        {{ user.email }}
                      </q-item-label>
                    </q-item-section>
                    <!-- specializations button -->
                    <q-item-section class="q-pa-xs">
                      <q-btn
                        @click="viewSpec(user)"
                        class="text-white bg-primary"
                        icon="mdi-star-cog-outline"
                        label="Specializations"
                        size="sm"
                        flat
                        rounded
                      >
                      </q-btn
                    ></q-item-section>
                  </div>
                  <!-- edit staff role button -->
                  <div v-if="auth.userDetails.admin">
                    <q-btn flat rounded @click="editUser(user.userID)"
                      ><q-icon name="mdi-square-edit-outline"></q-icon
                    ></q-btn>
                  </div>
                </q-item>

                <!-- edit staff role dialog -->
                <q-dialog v-model="edit" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Change Role</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        v-model="role"
                        :options="roleOptions"
                        label="Role"
                        outlined
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="Cancel" v-close-popup />
                      <q-btn
                        v-close-popup
                        @click="updateRole"
                        label="Confirm"
                        flat
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>

                <!-- specializations dialog -->
                <q-dialog v-model="specDial">
                  <q-card style="width: 100%; mad-width: 700px">
                    <q-card-section class="row items-center q-pb-md">
                      <div class="text-bold text-body1">
                        {{ this.userSpec.fName }}'s Specializations
                      </div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-card-section
                      v-for="specs in this.userSpec.spec"
                      :key="specs"
                      class="row justify-between q-pa-sm items-center"
                    >
                      <span class="text-overline q-px-sm">
                        {{ categs.displayCateg(specs) }}</span
                      >
                      <!-- delete spec button -->
                      <q-btn
                        v-if="auth.userDetails.admin"
                        class="bg-secondary"
                        color="white"
                        icon="mdi-trash-can-outline"
                        flat
                        @click="delSpecConfirm(specs)"
                      ></q-btn>
                    </q-card-section>
                    <!-- add spec button -->
                    <q-card-section class="text-center"
                      ><q-btn
                        v-if="auth.userDetails.admin"
                        @click="addSpecDial = true"
                        class="bg-primary text-white"
                        icon="mdi-star-plus-outline"
                        label="add a specialization"
                        size="md"
                      ></q-btn>
                    </q-card-section>
                  </q-card>
                </q-dialog>

                <!-- confirm delete specialization dialog -->
                <q-dialog v-model="delSpecDial" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <span class="q-ml-sm"
                        >Are you sure you want to delete this specialization?
                        This may affect the tickets this staff may
                        receive.</span
                      >
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        v-close-popup
                        @click="delSpecDial = false"
                        color="primary"
                        label="Cancel"
                        flat
                      />
                      <q-btn
                        flat
                        @click="delSpec()"
                        label="Delete"
                        color="secondary"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>

                <!-- add specialization dialog -->
                <q-dialog v-model="addSpecDial" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Your address</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        v-model="specSelected"
                        :options="filteredCategs"
                        option-value="categID"
                        option-label="name"
                        label="Categories"
                        outlined
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn
                        flat
                        @click="addSpecDial = false"
                        label="Cancel"
                        v-close-popup
                      />
                      <q-btn
                        flat
                        @click="addSpecConfirm()"
                        label="Add"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-tab-panel>

            <q-tab-panel name="admin">
              <div class="full-width">
                <q-item
                  v-for="user in users.getAdmin"
                  :key="user.userID"
                  class="rounded-borders q-my-sm q-card items-center"
                  bordered
                  ><div class="full-width">
                    <q-item-section class="justify-between">
                      <q-item-label class="text-bold text-grey text-caption">
                        {{ user.userID }}
                      </q-item-label>
                      <q-item-label
                        class="text-weight-bolder text-body2 q-pr-sm"
                      >
                        {{ user.fName }} {{ user.lName }}
                      </q-item-label>
                      <q-item-label class="text-overline">
                        {{ user.email }}
                      </q-item-label>
                      <q-item-label
                        class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                        style="width: 80px"
                        bordered
                        items-center
                      >
                        {{ auth.userDetails.office }} Admin
                      </q-item-label>
                    </q-item-section>
                  </div>
                  <!-- edit role button -->
                  <div v-if="auth.userDetails.admin">
                    <q-btn flat rounded @click="editUser(user.userID)"
                      ><q-icon name="mdi-square-edit-outline"></q-icon
                    ></q-btn>
                  </div>
                </q-item>
                <!-- edit role dialog -->
                <q-dialog v-model="edit" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">Change Role</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-select
                        v-model="role"
                        :options="roleOptions"
                        label="Role"
                        outlined
                      />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="Cancel" v-close-popup />
                      <q-btn
                        v-close-popup
                        @click="updateRole"
                        label="Confirm"
                        flat
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { userStore } from "src/stores/store_User";
import { authStore } from "src/stores/store_Auth";
import { categStore } from "src/stores/store_Categ";

export default {
  setup() {
    const users = userStore();
    const auth = authStore();
    const categs = categStore();

    return { users, auth, categs };
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
      specDial: false,
      userSpec: {
        userID: ref(""),
        fName: ref(""),
        spec: [],
      },
      addSpecDial: false,
      delSpecDial: false,

      specSelected: ref(null),
      model: ref(null),
      filteredCategs: [],
    };
  },
  mounted() {
    this.users.getUsers();
    this.categs.getCategs();
  },
  methods: {
    // editing user role dialog
    editUser(id) {
      this.edit = true;
      this.editRole.userID = id;
    },
    // viewing specialization of staff
    viewSpec(specs) {
      this.specDial = true;
      this.userSpec.userID = specs.userID;
      this.userSpec.fName = specs.fName;
      this.userSpec.spec = specs.specializations;
      this.addSpecFilter();
    },
    // deleting specialization confirmation dialog
    delSpecConfirm(id) {
      this.delSpecDial = true;
      this.specSelected = id;
    },
    delSpec() {
      this.users.deleteSpec(this.userSpec.userID, this.specSelected);
      const specIndex = this.userSpec.spec.indexOf(this.specSelected);
      if (specIndex > -1) {
        this.userSpec.spec.splice(specIndex, 1);
      }
      this.specSelected = null;
      this.addSpecFilter();
      this.delSpecDial = false;
    },
    // adding specialization confirmation click
    addSpecConfirm() {
      this.users.addSpec(this.userSpec.userID, this.specSelected.categID);
      if (this.userSpec.spec.includes(this.specSelected.categID)) {
      } else {
        this.userSpec.spec.push(this.specSelected.categID);
      }
      this.specSelected = null;
      this.addSpecFilter();
      this.addSpecDial = false;
    },
    // updating user role
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
    // filtering categories so it only shows categories that are not already in the users specializations array
    addSpecFilter() {
      this.filteredCategs = this.categs.filterCategs.filter((c) => {
        return !this.userSpec.spec.some((categID) => categID === c.categID);
      });
    },
  },
  beforeUnmount() {
    this.users.unsub();
  },
};
</script>
