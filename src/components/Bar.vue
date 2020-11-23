<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。今回はドーナツグラフなのでBarとなる。
import { HorizontalBar,mixins } from 'vue-chartjs'
const {reactiveProp} = mixins

export default ({
  extends: HorizontalBar,
  mixins: [reactiveProp],
   props:[ 'chartData','options'],
  
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    rerenderBarchart(){
    this.renderChart(this.chartData, this.options)
    },
  }
})
</script>