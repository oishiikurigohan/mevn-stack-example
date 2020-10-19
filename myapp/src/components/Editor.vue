<template>
  <div>
    <h1>{{ title }}</h1>
    <label for="num">count : </label>
    <input type="number" id="num" v-model="num" />
    <button @click="update()">update</button>
    <br>
    <br>
    
    <div>
      <label for="cat-name">名前 : </label>
      <input type="text" id="cat-name" :value="cat.name" @change="selectedCat.name = $event.target.value" />
    </div>
    <div>
      <label for="cat-age">年齢 : </label>
      <input type="number" id="cat-age" :value="cat.age" @change="selectedCat.age = $event.target.value" />
    </div>
    <div>
      <label for="cat-gender">性別 : </label>
      <input type="text" id="cat-gender" :value="cat.gender" @change="selectedCat.gender = $event.target.value" />
    </div>
    <div style="padding-top:5px">
      <button @click="updateCat()">update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from "@/store";
import { UserData } from '@/types/user';

@Options({
  props: {
    title: String
  }
})
export default class Editor extends Vue {

  counter = 0;
  selectedCat: UserData = {};

  get num() {
    return store.getters.getCount();
  }

  set num(val: number) {
    this.counter = val;
  }

  private update(): void {
    store.dispatch('updateAction', this.counter);
  }


  get cat() {
    return store.getters.getSelected();
  }

  set cat(val: UserData) {
    this.selectedCat = val;
    store.dispatch('setSelectedAction', val);
  }

  private updateCat(): void {
    store.dispatch('updateCatAction', this.selectedCat);
    store.dispatch('getCatsAction');
    this.cat = {};
  }
}
</script>

<style scoped lang="scss">
</style>
