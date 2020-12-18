<template>
  <div id="app">
    <Header/>
    <div class="chart">
      <div class="chart-left">
        <p>みんなの副業の種類と割合</p>

        <Pie 
        :chart-data="getPieDatas" 
        :options="PieOptions" 
        ref="piechild"
        @on-receive="$store.dispatch('update')"
        />    
      </div>
      <div class="chart-right">
       <p>副業ごとの月収分布図</p>
        <div>{{ getSelectedData }}</div>
          <Bar
          :chart-data="getBarDatas"
          :options="getBarOptions"
          ref="barchild" />
        <div class="select-form">
        <form action="" class="form">
       <label>あなたの副業を選択</label>
        <MySelect
          v-model="getSampleForm"
          name="sample-select"
          :options="getSelectOptions"
          @update-index="$store.dispatch('reflectIndex')"
          @valueselected="$store.dispatch('setSelected',1)"
        />
        <label class="label-buttom">副業の月収を選択</label>
        <BarSelect
          v-model="getSampleBarForm"
          name="sample-bar-select"
          :options="getSelectBarOptions"
          @barselected="$store.dispatch('setSelected',2)"
        />
        <button class="update-button" type="button" :disabled="this.$store.state.isPush" @click="countUpdate">決定</button>
      </form>
      </div>
     </div>
    </div>
    <Footer />
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
import { mapGetters } from 'vuex'

export default{
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
  computed: {
    ...mapGetters(
      [
    "getSelectedData",
    "getPieDatas",
    "getBarDatas",
    "getBarOptions",
    "getSampleBarForm",
    "getSelectOptions",
    "getSelectBarOptions"
      ]
    ),
    getSampleForm: {
      get(){
        return this.$store.getters.getSampleForm
      },
      set(value){
        this.$store.dispatch('getSampleForm',sampleForm)
      }
    },
    getSampleBarForm: {
      get(){
        return this.$store.getters.getSampleBarForm
      },
      set(value){
        this.$store.dispatch('getSampleBarForm',sampleBarForm)
      }
    },

  },
  created(){
       store.dispatch('createPieData')
       store.dispatch('createBarData')
    },
  methods: {
    async changeBarData(e,el){
      if (! el || el.length === 0) return;
          this.$store.state.selectedData = el[0]._model.label;
          await store.dispatch('changeBarData')
          
          await this.$refs.barchild.rerenderBarchart();

    },
      async countUpdate() {
         await store.dispatch('categoryUpdate');
         await store.dispatch('distributionUpdate')
         await store.dispatch('getCategoryData')
         await store.dispatch('getBarData')
         await this.$refs.piechild.rerenderchart();
         await this.$refs.barchild.rerenderBarchart();
         store.dispatch('isPushReset');
    }
  }, 
}
</script>
<style>
@import "./css/styles.css";
</style>
