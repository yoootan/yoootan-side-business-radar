<template>
  <div id="app">
    <Header/>
    <div class="chart">
      <div class="chart-left">
        <p>みんなの副業の種類と割合</p>

        <Pie 
        :chart-data="PieDatas" 
        :options="options" 
        ref="piechild"
        @on-receive="update"
        />    
      </div>
      <div class="chart-right">
      　<p>副業ごとの月収分布図</p>
        <div>{{ selectedData }}</div>
          <Bar
          :chart-data="BarDatas"
          :options="BarOptions"
          ref="barchild" />
        <div class="select-form">
        <form action="" class="form">
       <label>あなたの副業を選択</label>
        <MySelect
          v-model="sampleForm"
          name="sample-select"
          :options="select_options"
          @update-index="reflectIndex"
          @valueselected="isDisabled"
        />
        <label class="label-buttom">副業の月収を選択</label>
        <BarSelect
          v-model="sampleBarForm"
          name="sample-bar-select"
          :options="select_bar_options"
          @barselected="isDisabled2"
        />
        <button class="update-button" type="button" :disabled="isPush" @click="countUpdate">決定</button>
      </form>
      </div>
     </div>
    </div>
    <Footer />

      <!-- 
        <p><router-link to="/articles/13">[no13]</router-link></p>
      <router-view/>
      <router-view name="sub" />
      -->
  </div>
</template>

<script>
import Vue from 'vue';
import Loading from '@/components/Loading'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pie from '@/components/Pie';
import Bar from '@/components/Bar';
import MySelect from "./components/Select";
import BarSelect from "./components/BarSelect";
import axios from "axios";

export default{
 
  data(){
    return{
      count:"",
      name:"",
      loading: true,
      id: "",
      isPush: true,
      isPush2: true,
      isPush3: true,
      beforeCount: "",
      beforeBarCount: [],
      beforeId: "",
      beforeName: "",
      barBeforeUpdateCount: "",
      updateIndex: "",
      selectedData: "YouTube",
      sampleForm: {
        id: "",
        select: "",
      },
      sampleBarForm: {
       select: "",
      },
        select_options: [],
        select_bar_options: ['100万以上', '50-100万', '30-50万', '20-30万', '10-20万', '5-10万', '5万以下'],
  
      PieDatas: {
        // 凡例とツールチップに表示するラベル
        labels: [],
        // 表示するデータ
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
      options: {
        responsive: true,
        showAllTooltips: true,
        maintainAspectRatio: false,

        //events: ['click'],
        onClick: this.changeBarData,   
        legend:{
            position: 'bottom',
        },
        animation:{
          animateScale: true,
        },
        tooltips: {
          bodyFontSize: 14,
          itemSort: function(tooltipItem,data){
             let indexItem = data.datasets[0].data[tooltipItem.index] 


          },
          callbacks: {
            label: function(tooltipItem, data) {
              let total = 0 // 合計格納
              let indexItem = data.datasets[0].data[tooltipItem.index] 
              data.datasets[0].data.forEach(item => {
                total += parseInt(item);
                //console.log(total)
              })
              // パーセント表示
              return [indexItem + ' 人',Math.round(indexItem / total * 100) + ' %']
            },
            

          }
        }
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
      
      }
    
  },
  name: 'App',
  components: {
    Header,
    Footer,
    Pie,
    Bar,
    Loading,
    MySelect,
    BarSelect,
  },
     created(){
       axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category")
      .then(res=>{

        this.labelContents = res.data.documents;
        //Pie用のデータ取得(axios rest api)
        const dataCount = [];
        this.labelContents.forEach(function (content){
          dataCount.push(content.fields.count.integerValue)
        });
        this.PieDatas.datasets[0].data = dataCount;
        //console.log(dataCount);

        //label用データ取得後、配列へ代入
        const labelData = [];
        this.labelContents.forEach(function (content){
          labelData.push(content.fields.name.stringValue)
        });
        this.PieDatas.labels = labelData;
         //selectcomponent用の表示データ取得
        

        const selectData = [];
        this.labelContents.forEach(function (content){
          selectData.push(content)
        });
        this.select_options = selectData;
        console.log(this.select_options)

        Vue.set(this.PieDatas);

        
      });
      //Bar用データ取得
     axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution")
      .then(res=>{
           this.barContents = res.data.documents;
           //console.log(this.barContents)
           const barCount = [];
           const barCounted = [];
        this.barContents.forEach(function (content){
          barCount.push(content.fields)
          
        });
       for(let i = 0 ; i < 7 ;i ++){
         barCounted.push(barCount[1][i].integerValue);
       }
        this.BarDatas.datasets[0].data = barCounted;

       /* const selectBarData = [];
        this.barContents.forEach(function (content){
          selectBarData.push(content)
        });
        this.select_bar_options = selectBarData;
        console.log(this.select_bar_options)
        */
                Vue.set(this.BarDatas);
      })
    },
  methods: {
    log(item){
      //console.log(item)
    },
    isDisabled(){
      this.isPush2 = false;
      if(this.isPush3 == false)
      this.isPush = false;
    },
    isDisabled2(){
      this.isPush3 = false;
      if(this.isPush2 == false)
      this.isPush = false;
    },
    update (data) {
    	this.selectedData = data
    },
    reflectIndex(value){
      this.updateIndex = value;
    },

    changeBarData(e,el){
      if (! el || el.length === 0) return;
            console.log('onClick : label ' + el[0]._model.label);
            this.selectedData = el[0]._model.label;
          //console.log(this.selectedData)

          axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+this.selectedData+"")
      .then(res=>{
           this.barContents = res.data.fields;
           //console.log(this.barContents)
           const barCountOnClick = [];
           for(let i = 0;i < 7 ; i ++){
           barCountOnClick.push(this.barContents[i].integerValue)
        };
                   //console.log(barCountOnClick);
                   
                   this.BarDatas.datasets[0].data = barCountOnClick;
                   //console.log(this.BarDatas.datasets[0].data)
      
                Vue.set(this.BarDatas);
                this.$refs.barchild.rerenderBarchart();

      })


    },
    getCategoryData(){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category")
      .then(res=>{
        
       
        this.labelContents = res.data.documents;
        
        console.log(this.labelContents);
        //Pie用のデータ取得(axios rest api)
        let dataCount = [];
        this.labelContents.forEach(function (content){
          dataCount.push(content.fields.count.integerValue)
        });
        this.PieDatas.datasets[0].data = dataCount;

          Vue.set(this.PieDatas);


      this.$refs.piechild.rerenderchart();
      })
      

    },
    getBarData(){
      axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution")
      .then(res=>{
           this.barContents = res.data.documents;
           //console.log(this.barContents)
           const barCount = [];
           const barCounted = [];
        this.barContents.forEach(function (content){
          barCount.push(content.fields)
          
        });
       for(let i = 0 ; i < 7 ;i ++){
         barCounted.push(barCount[this.sampleForm][i].integerValue);
       }
        this.BarDatas.datasets[0].data = barCounted;
        this.selectedData = this.beforeName;
        console.log(this.sampleBarForm);
        Vue.set(this.BarDatas);
                this.$refs.barchild.rerenderBarchart();

      })
    },
    async categoryUpdate(){
      await axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category/"+this.sampleForm+"",)
      .then(res=>{
      this.beforeCount = res.data.fields.count.integerValue;
      this.beforeId = res.data.fields.id.integerValue;
      this.beforeName = res.data.fields.name.stringValue;
      this.beforeCount ++;
      console.log(this.beforeCount);
      //console.log(this.PieDatas.datasets[0].data);
     
     })

       await axios.patch(
        "https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/category/"+this.sampleForm+"",
        {  
           fields:{
             count:{
               integerValue: this.beforeCount
             },
             name:{
               stringValue: this.beforeName
             },
             id: {
               integerValue: this.beforeId
             } 
           }      
         }
         ) 
    },
    async distributionUpdate(){
      await axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+this.beforeName+"",)
      .then(res=>{
      this.beforeBarCount.splice(0, this.beforeBarCount.length)

      for(let i = 0 ;i < 7 ;i ++){
         this.beforeBarCount.push(res.data.fields[i].integerValue);
      }
      this.barBeforeUpdateCount = this.beforeBarCount[this.sampleBarForm]
      this.barBeforeUpdateCount ++;
      this.beforeBarCount.splice(this.sampleBarForm,1,this.barBeforeUpdateCount)
      //this.beforeCount ++;
      console.log(this.beforeBarCount);//bar配列
      //console.log(this.beforeBarCount[1]);//bar配列
      //console.log(this.sampleBarForm);//index
      //console.log(this.barBeforeUpdateCount);//変更値
      //console.log(this.PieDatas.datasets[0].data);
     })
     await axios.patch(
        "https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+this.beforeName+"",
        {  
           fields:{
             0:{
               integerValue: this.beforeBarCount[0]
             },
             1:{
               integerValue: this.beforeBarCount[1]
             },
             2: {
               integerValue: this.beforeBarCount[2]
             }, 
             3: {
               integerValue: this.beforeBarCount[3]
             }, 
             4: {
               integerValue: this.beforeBarCount[4]
             }, 
             5: {
               integerValue: this.beforeBarCount[5]
             }, 
             6: {
               integerValue: this.beforeBarCount[6]
             } 
           }      
          }
         ) 
    },
      async countUpdate() {
      
         await this.categoryUpdate();
         await this.distributionUpdate();
         await this.getCategoryData();
         await this.getBarData();
         this.isPush = true;
         this.isPush2 = true;
         this.isPush3 = true;
         
         //console.log(this.PieDatas)
        
    }
  }, 
    mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:flex;
  flex-flow: column;
  min-height: 120vh;
  
}
.chart{
  margin-top:20px;
  width: 100%;
  height:500px;
}
.chart-left{
  margin-left:10px;
  margin-top:10px;
  width:50%;
  float:left;
}
.chart-right{
  width:35%;
  float:right;
  margin-top:10px;
  margin-right:20px;
}
.form{
  height:100px;
}
.select-form{
  margin-top:20px;
}
.label-buttom{
  margin-top:15px;
}
.update-button{
  margin-top:10px;
}

@media screen and (max-width: 480px) {

}

</style>
