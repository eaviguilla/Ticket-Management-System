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
        style="max-width: 950px; width: 100%; margin: 0 auto"
      >
        <div class="text-h6 text-bold text-primary">BMO Categories</div>
        <q-item
          class="rounded-borders q-my-sm q-card items-center"
          v-for="categ in categs.filterCategs"
          :key="categ.categID"
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

              <div flat class="q-mt-md row justify-betweem" style="width: 100%">
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
                <q-dialog v-model="confirmDel" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <span class="q-ml-sm"
                        >Are you sure you want to delete this Category? It
                        cannot be reversed and may affect Tickets that have this
                        category.
                      </span>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="primary"
                        v-close-popup
                      />
                      <q-btn
                        flat
                        label="Delete Category"
                        color="secondary"
                        @click="deleteCateg()"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <q-btn
                  flat
                  rounded
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
      </div>
      <div>
        <q-page-sticky expand position="bottom" class="q-pa-md">
          <q-btn
            elevated
            no-caps
            class="full-width q-pa-md"
            style="
              background: #ff6b6e;
              color: white;
              max-width: 1400px;
              border-radius: 20px;
            "
            size="md"
            label="Add Category"
            @click="categAdd = true"
          />
        </q-page-sticky>
        <q-dialog v-model="categAdd" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Add Category</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                outlined
                dense
                label="Category Name"
                v-model="addCategForm.name"
                autofocus
                @keyup.enter="categAdd = false"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                outlined
                dense
                autogrow
                label="Category Description"
                v-model="addCategForm.description"
                autofocus
                @keyup.enter="categAdd = false"
              />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                flat
                @click="addCateg"
                label="Add Category"
                v-close-popup
              />
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
      address: ref(""),
      addCategForm: {
        name: ref(""),
        description: ref(""),
      },
      editCategForm: {
        categID: ref(""),
        categName: ref(""),
        categDesc: ref(""),
      },
    };
  },
  mounted() {
    this.categs.getCategs();
  },
  methods: {
    delDialog(id) {
      console.log(id);
      this.confirmDel = true;
      this.editCategForm.categID = id;
    },
    addCateg() {
      const payload = this.addCategForm;
      payload.office = this.auth.userDetails.office;
      console.log(payload);
      this.categs.addCateg(payload);
    },
    editDialog() {},
    deleteCateg() {
      this.categs.deleteCateg(this.editCategForm.categID);
      this.confirmDel = false;
    },
  },
};
</script>
