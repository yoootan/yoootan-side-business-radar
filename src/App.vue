<template>
  <div id="app">
    <Header/>
    <div class="chart">
      <div class="chart-left">
        <p>みんなの副業の種類と割合</p>

        <Pie 
        :chart-data="$store.state.PieDatas" 
        :options="PieOptions" 
        ref="piechild"
        @on-receive="$store.dispatch('update')"
        />    
      </div>
      <div class="chart-right">
       <p>副業ごとの月収分布図</p>
        <div>{{ $store.state.selectedData }}</div>
          <Bar
          :chart-data="$store.state.BarDatas"
          :options="$store.state.BarOptions"
          ref="barchild" />
        <div class="select-form">
        <form action="" class="form">
       <label>あなたの副業を選択</label>
        <MySelect
          v-model="$store.state.sampleForm"
          name="sample-select"
          :options="$store.state.select_options"
          @update-index="$store.dispatch('reflectIndex')"
          @valueselected="$store.dispatch('setSelected',1)"
        />
        <label class="label-buttom">副業の月収を選択</label>
        <BarSelect
          v-model="$store.state.sampleBarForm"
          name="sample-bar-select"
          :options="$store.state.select_bar_options"
          @barselected="$store.dispatch('setSelected',2)"
        />
        <button class="update-button" type="button" :disabled="this.$store.state.isPush" @click="countUpdate">決定</button>
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
import Vuex from 'vuex'
import Loading from '@/components/Loading'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pie from '@/components/Pie';
import Bar from '@/components/Bar';
import MySelect from "./components/Select";
import BarSelect from "./components/BarSelect";
import axios from "axios";
import store from './store'



export default{
 
  data(){
    return{
      PieOptions: {
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
          bodyFontSize: 18,
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
        this.$store.state.PieDatas.datasets[0].data = dataCount;
        //console.log(dataCount);

        //label用データ取得後、配列へ代入
        const labelData = [];
        this.labelContents.forEach(function (content){
          labelData.push(content.fields.name.stringValue)
        });
        this.$store.state.PieDatas.labels = labelData;
         //selectcomponent用の表示データ取得
        

        const selectData = [];
        this.labelContents.forEach(function (content){
          selectData.push(content)
        });
        this.$store.state.select_options = selectData;
        console.log(this.$store.state.select_options)

        Vue.set(this.$store.state.PieDatas);

        
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
         barCounted.push(barCount[0][i].integerValue);
       }
        this.$store.state.BarDatas.datasets[0].data = barCounted;

       /* const selectBarData = [];
        this.barContents.forEach(function (content){
          selectBarData.push(content)
        });
        this.$store.state.select_bar_options = selectBarData;
        console.log(this.$store.state.select_bar_options)
        */
                Vue.set(this.$store.state.BarDatas);
      })
    },
  methods: {
   
   
    
    
    changeBarData(e,el){
      if (! el || el.length === 0) return;
            //console.log('onClick : label ' + el[0]._model.label);
            this.$store.state.selectedData = el[0]._model.label;
          //console.log(this.$store.state.selectedData)

          axios.get("https://firestore.googleapis.com/v1/projects/side-business-radar/databases/(default)/documents/distribution/"+this.$store.state.selectedData+"")
      .then(res=>{
           this.barContents = res.data.fields;
           //console.log(this.barContents)
           const barCountOnClick = [];
           for(let i = 0;i < 7 ; i ++){
           barCountOnClick.push(this.barContents[i].integerValue)
        };
                   //console.log(barCountOnClick);
                   
                   this.$store.state.BarDatas.datasets[0].data = barCountOnClick;
                   //console.log(this.$store.state.BarDatas.datasets[0].data)
      
                Vue.set(this.$store.state.BarDatas);
                this.$refs.barchild.rerenderBarchart();
      })
    },
    
    
      async countUpdate() {
      
         await store.dispatch('categoryUpdate');
         await store.dispatch('distributionUpdate')
         await store.dispatch('getCategoryData')
         await store.dispatch('getBarData')
         await this.$refs.piechild.rerenderchart();
         await this.$refs.barchild.rerenderBarchart();

         store.commit('isPushReset');

         
         //console.log(this.$store.state.PieDatas)
        
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
