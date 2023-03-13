<template>
  <h5 class="text-weight-bolder text-primary">Resolved Tickets</h5>
  <!-- <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart> -->
</template>
<script>
import { ref } from "vue";
import { userStore } from "src/stores/store_User";
import { tickStore } from "src/stores/store_Ticket";

export default {
  name: "my_chart",
  setup() {
    const users = userStore();
    const tick = tickStore();

    return { users, tick };
  },
  data() {
    return {
      bmoUIDs: ref([]),
      series: {
        data: ref([]),
      },
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        colors: ["#034f84"],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ref([]),
        },
      },
    };
  },
  // mounted() {
  //   this.bmoUIDs = this.users.users
  //     .filter((user) => user.office === "BMO")
  //     .map((user) => user.userID);

  //   this.series[0].data = this.bmoUIDs
  //     .map((id) => {
  //       const user = this.tick.finished.find((user) => user.userID === id);
  //       return user ? user.finishedCount : null;
  //     })
  //     .filter((count) => count !== null)
  //     .sort();

  //   this.chartOptions.xaxis.categories = this.users.users
  //     .filter((user) => this.bmoUIDs.includes(user.userID))
  //     .sort(
  //       (a, b) =>
  //         this.bmoUIDs.indexOf(a.userID) - this.bmoUIDs.indexOf(b.userID)
  //     )
  //     .map((user) => user.name);
  // },
  methods: {},
};
</script>
