<template>
    <div class="split">
        <div class="split-item split-left">
            <div class="split-left__inner">
                <NekoList title="ねこリスト"/>
            </div>
        </div>
        <div class="split-item split-right">
            <div class="split-right__inner">
                <Editor title="エディタ" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NekoList from '@/components/NekoList.vue';
import Editor from '@/components/Editor.vue';

@Options({
    components: {
        NekoList,
        Editor
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">

#app {
    text-align: center;
}

.split{
    display: table;
    width: 100%;    
}
.split-item{
    display: table-cell;
    width: 50%;
}
.split-left{
    position: relative;
}
.split-left__inner{
    height: 100%;
    position: fixed;
    width: 50%;
}
.split-right__inner{
}

@media screen and (max-width:1024px) {
    .split{
        display: block;
    }
    .split-item{
        display: block;
        width: auto;
    }
    .split-left__inner{
        position: inherit;
        width: auto;
    }
}
</style>