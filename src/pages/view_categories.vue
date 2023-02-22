<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf">
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
      <div
        class="q-pa-md"
        style="max-width: 550px; width: 100%; margin: 0 auto"
      >
        <div class="text-h6 text-bold text-primary">BMO Categories</div>
        <q-item
          v-for="categ in categs.filterCategs"
          :key="categ.categID"
          class="rounded-borders q-my-sm q-card items-center"
          bordered
          ><div class="full-width">
            <q-item-section class="justify-between">
              <q-item-label class="text-caption text-grey">{{
                categ.categID
              }}</q-item-label>
              <q-item-label class="text-bold text-body2">{{
                categ.name
              }}</q-item-label>
              <q-item-label class="text-caption text-justify">{{
                categ.description
              }}</q-item-label>

              <div class="q-mt-md row justify-betweem" style="width: 100%" flat>
                <!-- Category deletion button -->
                <q-btn
                  flat
                  rounded
                  @click="delDialog(categ.categID)"
                  size="sm"
                  class="text-white bg-secondary"
                  style="
                    width: 50%;
                    border-bottom-right-radius: 0;
                    border-top-right-radius: 0;
                  "
                  label="delete"
                  icon="mdi-delete-outline"
                >
                </q-btn>

                <!-- Category edit button -->
                <q-btn
                  flat
                  rounded
                  @click="editDialog(categ)"
                  size="sm"
                  class="text-white bg-primary"
                  style="
                    width: 50%;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                  "
                  label="edit"
                  icon="mdi-pencil-outline"
                >
                </q-btn>
              </div>
            </q-item-section></div
        ></q-item>
        <!-- Category deletion dialog -->
        <q-dialog v-model="confirmDel" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >Are you sure you want to delete this Category? It cannot be
                reversed and may affect Tickets that have this category.
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                v-close-popup
                @click="deleteCateg()"
                color="secondary"
                label="Delete Category"
                flat
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div>
        <!-- Add category button -->
        <q-page-sticky expand position="bottom" class="q-pa-md">
          <q-btn
            @click="categAdd = true"
            class="full-width q-pa-md bg-secondary text-white"
            label="Add Category"
            size="md"
            style="max-width: 1400px; border-radius: 20px"
            elevated
            no-caps
          />
        </q-page-sticky>
        <!-- Add category dialog -->
        <q-dialog v-model="categAdd" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Add Category</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                v-model="addCategForm.name"
                @keyup.enter="categAdd = false"
                label="Category Name"
                autofocus
                dense
                outlined
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="addCategForm.description"
                @keyup.enter="categAdd = false"
                label="Category Description"
                autofocus
                autogrow
                dense
                outlined
              />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                v-close-popup
                @click="addCateg"
                label="Save Category"
                flat
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Category edit dialog -->
        <q-dialog v-model="categEdit" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Edit Category</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                v-model="editCategForm.name"
                @keyup.enter="categEdit = false"
                label="Category Name"
                autofocus
                dense
                outlined
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="editCategForm.description"
                @keyup.enter="categEdit = false"
                label="Category Description"
                autofocus
                autogrow
                dense
                outlined
              />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat @click="editCateg" label="Save" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { categStore } from "src/stores/store_Categ";
import { authStore } from "src/stores/store_Auth";

export default {
  setup() {
    const categs = categStore();
    const auth = authStore();
    return { categs, auth };
  },
  data() {
    return {
      confirmDel: false,
      categAdd: ref(false),
      categEdit: ref(false),
      address: ref(""),
      addCategForm: {
        name: ref(""),
        description: ref(""),
      },
      editCategForm: {
        categID: ref(""),
        name: ref(""),
        description: ref(""),
      },
    };
  },
  mounted() {
    this.categs.getCategs();
  },
  methods: {
    delDialog(id) {
      this.confirmDel = true;
      this.editCategForm.categID = id;
    },
    editDialog(toEdit) {
      this.editCategForm.categID = toEdit.categID;
      this.editCategForm.name = toEdit.name;
      this.editCategForm.description = toEdit.description;
      this.categEdit = true;
    },

    addCateg() {
      const payload = {
        name: this.addCategForm.name,
        description: this.addCategForm.description,
        office: this.auth.userDetails.office,
      };
      this.categs.addCateg(payload);
      this.addCategForm.name = "";
      this.addCategForm.description = "";
    },
    deleteCateg() {
      this.categs.deleteCateg(this.editCategForm.categID);
      this.confirmDel = false;
    },
    editCateg() {
      const payload = this.editCategForm;
      payload.office = this.auth.userDetails.office;
      this.categs.updateCateg(payload);
      this.categEdit = false;
    },
  },
};
</script>
