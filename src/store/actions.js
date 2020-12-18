import Vue from 'vue'
import axios from "axios"


export default{
    update ({commit}) {
        commit('update')
      },
      reflectIndex({commit}){
        commit('reflectIndex')  
      },
      isPushReset({commit}){
        commit('isPushReset')
      },
      getSampleBarForm({commit},newSampleBarForm){
        commit('getSampleBarForm',newSampleBarForm)
      },
      getSampleForm({commit},newSampleForm){
        commit('getSampleForm',newSampleForm)
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
}