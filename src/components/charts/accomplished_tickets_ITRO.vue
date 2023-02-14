<template>
  <h5 class="text-weight-bolder text-primary">Resolved Tickets</h5>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  name: "my_chart",
  data() {
    return {
      series: [
        {
          data: [45, 55, 49, 52, 49, 47],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        colors: ["#c94c4c"],
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
          categories: [
            "Crisostomo Ibarra",
            "Maria Clara",
            "Capitan Tiago",
            "Pilosopo Tasyo",
            "Dona Victorina",
            "Sisa",
          ],
        },
      },
    };
  },
};
</script>
