import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)
import getters from './stores/getters'


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
              callback: function(label,index,labels){
                return label + ' 人';
              }
            }
          }]
        },
        tooltips: {
          bodyFontSize: 18,
          callbacks: {
             label: function (tooltipItem, data) {
                return tooltipItem.xLabel + ' 人';
            }
          }
        },
        legend :{
          display: false,
        }
      },
    },
    getters: {
      getSelectedData: state => state.selectedData,
      getPieDatas: state => state.PieDatas,
      getBarDatas: state => state.BarDatas,
      getBarOptions: state => state.BarOptions,
      getSampleForm: state => state.sampleForm,
      getSampleBarForm: state => state.sampleBarForm,
      getSelectOptions: state => state.select_options,
      getSelectBarOptions: state => state.select_bar_options, 
  },
 
  mutations: {
    isDisabled(state){
      state.isPush = false;
    },
    isDisabled2(state,bool){
      state.isPush2 = bool;
    },
    isDisabled3(state,bool){
      state.isPush3 = bool;
    },
    isPushReset(state){
      state.isPush = true;
      state.isPush2 = true;
      state.isPush3 = true;
    },
    getBarData(state){
         //console.log(  barContents)
         state.getBarContents.forEach(function (content){
         state.barCount.push(content.fields)
        });
        console.log(state.barCount);
      var barCounted = [];
      for(let i = 0 ; i < 7 ;i ++){
        barCounted.push(state.barCount[state.sampleForm][i].integerValue);
      }
      console.log(barCounted);
       state.BarDatas.datasets[0].data = barCounted;
       state.selectedData = state.beforeName;
       state.barCount = [];
    },
    getCategoryData(state){
      state.PieDatas.datasets[0].data = state.dataCount;
      console.log(state.dataCount);
      //Pie用のデータ取得(axios rest api)
      state.labelContents.forEach(function (content){
        state.dataCount.push(content.fields.count.integerValue)
      });
      Vue.set(state.BarDatas);
      state.dataCount = [];
    },
    barDataReset(state){
      state.beforeBarCount.splice(0, state.beforeBarCount.length);
    },
    barDataUpdate(state){
      for(let i = 0 ;i < 7 ;i ++){
        state.beforeBarCount.push(state.barResData.data.fields[i].integerValue);
        }
        state.barBeforeUpdateCount = state.beforeBarCount[state.sampleBarForm]
        state.barBeforeUpdateCount ++;
        state.beforeBarCount.splice(state.sampleBarForm,1,state.barBeforeUpdateCount)
        console.log(state.beforeBarCount);//bar配列
  
    },
    update(state,data){
      state.selectedData = data
    },
    reflectIndex(state,value){
      state.updateIndex = value;
    },
    categoryBeforeDataSet(state){
      state.beforeCount = state.categoryResData.data.fields.count.integerValue;
      state.beforeId = state.categoryResData.data.fields.id.integerValue;
      state.beforeName = state.categoryResData.data.fields.name.stringValue;
      state.beforeCount ++;
      console.log(state.beforeCount);
    },
    createPieData(state){
        //Pie用のデータ取得(axios rest api)
      state.pieLabelContents.forEach(function (content){
         state.pieDataCount.push(content.fields.count.integerValue)
       });
      state.PieDatas.datasets[0].data = state.pieDataCount;
      state.pieDataCount = [];
      console.log(state.pieDataCount)
    },
    createPieLabelData(state){
        //label用データ取得後、配列へ代入
        state.pieLabelContents.forEach(function (content){
          state.pieLabelData.push(content.fields.name.stringValue)
        });
        state.PieDatas.labels = state.pieLabelData;
        state.pieLabelData = [];
    },
    createSelectData(state){
      //selectcomponent用の表示データ取得
      state.pieLabelContents.forEach(function (content){
        state.pieSelectData.push(content)
      });
      state.select_options = state.pieSelectData;
      console.log(state.select_options)
      state.pieSelectData = [];
    },
    createBarData(state){
      state.barContents.forEach(function (content){
        state.barNumber.push(content.fields)
      });
     for(let i = 0 ; i < 7 ;i ++){
       state.barCounted.push(state.barNumber[0][i].integerValue);
     }
       state.BarDatas.datasets[0].data = state.barCounted;
    },
    changeBarData(state){
      const barCountOnClick = [];
      for(let i = 0;i < 7 ; i ++){
      barCountOnClick.push(state.changeBarContents[i].integerValue)
      };
      state.BarDatas.datasets[0].data = barCountOnClick;
      console.log(state.BarDatas.datasets[0].data)
    },
  },
  actions: {
    update ({commit}) {
      commit('update')
    },
    reflectIndex({commit}){
      commit('reflectIndex')  
    },
    isPushReset({commit}){
      commit('isPushReset')
    },
    setSelected({commit,state},num){
      if(num === 1){
      commit('isDisabled2',false)
      if(state.isPush3 == false)
      commit('isDisabled',false)
      }else if(num === 2){
        commit('isDisabled3',false)
        if(state.isPush2 == false)
        commit('isDisabled',false)  
      }
    },
    async categoryUpdate({commit,state}){
      await axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category/"+state.sampleForm+"",)
      .then(res=>{
        state.categoryResData = res
        commit('categoryBeforeDataSet')
     })
       await axios.patch(
        "https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category/"+state.sampleForm+"",
        {  
           fields:{
             count:{
               integerValue: state.beforeCount
             },
             name:{
               stringValue: state.beforeName
             },
             id: {
               integerValue: state.beforeId
             } 
           }      
         }
       ) 
    },
    async distributionUpdate({commit,state}){
    
      await axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+state.beforeName+"",)
      .then(res=>{
          state.barResData = res
          commit('barDataReset')
          commit('barDataUpdate')
      })
     await axios.patch(
        "https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+state.beforeName+"",
        {  
           fields:{
             0:{
               integerValue: state.beforeBarCount[0]
             },
             1:{
               integerValue: state.beforeBarCount[1]
             },
             2: {
               integerValue: state.beforeBarCount[2]
             }, 
             3: {
               integerValue: state.beforeBarCount[3]
             }, 
             4: {
               integerValue: state.beforeBarCount[4]
             }, 
             5: {
               integerValue: state.beforeBarCount[5]
             }, 
             6: {
               integerValue: state.beforeBarCount[6]
             } 
           }      
          }
         ) 
    },
    getCategoryData({commit,state}){
       axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category")
      .then(res=>{
        state.labelContents = res.data.documents;
        commit('getCategoryData')
      })
    },
    getBarData({commit,state}){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution")
      .then(res=>{
           state.getBarContents = res.data.documents;
        commit('getBarData')       
      })
    },
    createPieData({commit,state}){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category")
      .then(res=>{
        state.pieLabelContents = res.data.documents;
        commit('createPieData')
        commit('createPieLabelData')
        commit('createSelectData')
        Vue.set(state.PieDatas);
      });
    },
    createBarData({commit,state}){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution")
      .then(res=>{
           state.barContents = res.data.documents;
           commit('createBarData')
           Vue.set(state.BarDatas);
      })
    },
    changeBarData({commit,state}){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+state.selectedData+"")
      .then(res=>{
           state.changeBarContents = res.data.fields;
           console.log(state.changeBarContents)
           commit('changeBarData')
           Vue.set(state.BarDatas);
      })
    },
  },
  modules: {
    getters,
  }
})