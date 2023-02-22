<template>
  <div>
    <q-input v-model="name" label="Name" />
    <q-input v-model="email" label="Email" />
    <q-input v-model="password" label="Password" type="password" />
    <q-btn label="Register" @click="register" :disabled="isFormEmpty" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isFormEmpty() {
      return !this.name || !this.email || !this.password;
    },
  },
  methods: {
    register() {
      // perform registration logic here
    },
  },
};
</script>
