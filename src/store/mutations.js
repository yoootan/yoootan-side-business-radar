import Vue from 'vue'
export default{
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
      getSampleForm(state,newSampleForm){
        state.sampleForm = newSampleForm
      },
      getSampleBarForm(state,newSampleBarForm){
        state.sampleBarForm = newSampleBarForm
      },
}