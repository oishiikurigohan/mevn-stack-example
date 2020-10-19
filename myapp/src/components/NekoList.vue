<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ count }} <button @click="increment">+</button></p>
    <br>

    <table align="center" cellpadding="3">
      <tr>
        <th>name</th>
        <th>age</th>
        <th>gender</th>
        <th>change</th>
      </tr>
      <tr v-for="cat in cats" v-bind:key="cat._id">
        <td>{{ cat.name }}</td>
        <td>{{ cat.age }}</td>
        <td>{{ cat.gender }}</td>
        <td><input type="radio" name="selected" :value="cat" v-model="selectedCat" /></td>
      </tr>
    </table>
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
export default class NekoList extends Vue {

  created() {
    store.dispatch('getCatsAction');
  }

  private get count(): number {
    return store.getters.getCount();
  }

  private increment(): void {
    store.dispatch('incrementAction');
  }

  private get cats(): UserData[] {
    return store.getters.getCats();
  }

  private get selectedCat(): UserData {
    return store.getters.getSelected();
  }

  private set selectedCat(val: UserData) {
    store.dispatch('setSelectedAction', val);
  }
}
</script>

<style scoped lang="scss">
</style>