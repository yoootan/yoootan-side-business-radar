<template>
  <fieldset>
    <select :name="name" @change="updateBarValue" v-model="selected">
        <option disabled value="">選択して下さい</option>
      <template v-for="(option, index) in options">
        <option :value="index" :key="index">
          {{ option }}
        </option>
      </template>
    </select>
    
     

  </fieldset>
</template>

<script>
export default {
  name: "BarSelect",
  props: {
    value: "",
    options: { type: Array, required: true },
    name: { type: String, required: true },
  },
  data(){
    return{
      selected: ""
    }
  },
  methods: {
    updateBarValue: function(e) {
      this.$store.dispatch('getSampleBarForm',e.target.value);
      console.log(e.target.value)
      this.$emit('barselected');

    }
  },
  mounted() {
    //this.$emit("input", e.target.value);
    
  },
  created(){
   // console.log(this.value)

  }
};
</script>