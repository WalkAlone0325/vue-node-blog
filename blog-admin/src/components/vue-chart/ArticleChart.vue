<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'Dashbord',
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart();
  }
};
</script>
