<template>
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
          data: [60, 40, 35, 50, 45, 20],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
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
            "James Poco",
            "Jan Lorenzo",
            "Elias Viguilla",
            "Kleine Martin",
            "Ryan Manoguid",
            "Felix Perdo",
          ],
        },
      },
    };
  },
};
</script>
