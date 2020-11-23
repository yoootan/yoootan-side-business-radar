<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。今回はドーナツグラフなのでDoughnutとなる。
import { Pie,mixins } from 'vue-chartjs'
const {reactiveProp} = mixins


export default ({
  extends: Pie,
  mixins: [reactiveProp],
   props:[ 'chartData','options'],
   
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  methods: { 
     rerenderchart() {
      this.renderChart(this.chartData, this.options)
    },
  },
})
</script>