<template>
  <fieldset>
    <select :name="name" @change="updateValue" v-model="selected">
        <option disabled value="">選択して下さい</option>
      <template v-for="(option, index) in options">
        <option :value="index" :key="index">
          {{ option.fields.name.stringValue }}
        </option>
      </template>
    </select>
    
     

  </fieldset>
</template>

<script>
export default {
  name: "MySelect",
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
    updateValue: function(e) {
      this.$store.dispatch('getSampleForm',e.target.value);
            console.log(e.target.selectedIndex)
      this.$emit('valueselected');

    },
    updateIndex: function(e) {
      this.$emit("update-index", e.target.selectedIndex);
       console.log(e.target.selectedIndex)
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