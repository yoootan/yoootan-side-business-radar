import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    count:"",
    loading: true,
    isPush: true,
    isPush2: true,
    isPush3: true,
    beforeCount: "",
    beforeBarCount: [],
    beforeId: "",
    beforeName: "",
    barBeforeUpdateCount: "",
    categoryResData: [],
    dataCount:[],
    pieDataCount: [],
    pieLabelData: [],
    pieSelectData: [],
    barCount: [],
    barCounted: [],
    barContents: [],
    changeBarContents: [],
    barNumber: [],
    barResData: [],
    getBarContents: [],
    pieLabelContents: [],
    labelContents: [],
    updateIndex: "",
    selectedData: "YouTube",
    sampleForm: "",
    sampleBarForm: {
      select: "",
     },
     select_options: [],
     select_bar_options: ['100万以上', '50-100万', '30-50万', '20-30万', '10-20万', '5-10万', '5万以下'],
     PieDatas: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825','#d87f25','#40ecf5','#7940f5'],
          borderColor: 'transparent',
        }
      ]
    },
    BarDatas: {
      labels: ['100万以上', '50-100万', '30-50万', '20-30万', '10-20万', '5-10万', '5万以下'],
      datasets: [
        {
          data: [],
          backgroundColor: ['#f87979','#f87979','#f87979','#f87979','#f87979','#f87979','#f87979',]
        }
      ]      
      },
      BarOptions: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              callback: function(label){
                return label + ' 人';
              }
            }
          }]
        },
        tooltips: {
          bodyFontSize: 18,
          callbacks: {
             label: function (tooltipItem) {
                return tooltipItem.xLabel + ' 人';
            }
          }
        },
        legend :{
          display: false,
        }
      },
    },
  getters,
  mutations,
  actions,
  modules: {
  }
});