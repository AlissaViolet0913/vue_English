<script setup>

import { ref, computed } from 'vue';
import lesson from "@/assets/json/lesson.json"
import { useRoute, useRouter } from 'vue-router';

let sentence = ref([]);;
console.log(sentence.value)

// クエリパラメータ(id)取得
let route = useRoute();
let n = ref(route.params.id - 1); 

// ref: 値そのものを監視する
// computed: 値が変わったら変更する（依存関係に基づいて自動的に計算）
let japanese = computed(() => lesson[n.value]?.japanese);
let english = computed(() => lesson[n.value]?.english);

// 配列をランダムに並び替える関数
const shuffleArray = (array) => {
  const cloneArray = [...array];

  const result = cloneArray.reduce((_,cur,idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand]
    cloneArray[rand] = cur;
    return cloneArray
  })

  return result;
}

english = shuffleArray(english.value);

// ボタンが押されたときにwordの値をsentenceに格納する
function addTosentence(word){
    sentence.value.push(word);
}

// 「できた！」ボタン
const router = useRouter();
function levelUp(){
    n.value += 1;
    english = computed(() => shuffleArray(lesson[n.value]?.english));
    sentence.value.push(english.value)
    router.push(`/practice/${n.value + 1}`);
    
    }
</script>

<template>
    <div class="practiceMain">
        <p class="japanese">問題：「{{ japanese }}」
        </p>
        <!-- join(""): 各要素を配列で区切られた文字列に連結 -->
        <p class="english">{{ sentence.join(' ') }}</p>

        <div v-for="word in english" :key="word">
            <button @click="addTosentence(word)">
                {{ word }}
            </button>
        </div>
        <button @click="levelUp()" class="btn btn--blue btn--cubic btn--shadow" >
            できた！
        </button>
    </div>
</template>

<style>
.practiceMain{
    padding: 0%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 15%;
    text-align: center;
}

.japanese{
    font-size: 30px;
}

.english{
    font-size: 25px;
    border-bottom: dotted;
    border-color: rgb(101, 142, 225);
    border-width: 4px;
}

/* button */
.btn{
    margin-top: 5%;
}
button.btn--blue {
  color: #fff;
  background-color: rgb(5, 68, 196);
  border-bottom: 5px solid rgb(5, 51, 144);
}
button.btn--blue:hover {
  margin-top: 3px;
  color: #fff;
  background: rgb(34, 88, 197);
  border-bottom: 2px solid rgb(5, 51, 144);
}
button.btn--shadow {
  -webkit-box-shadow: 0 3px 5px rgb(7, 24, 57);
  box-shadow: 0 3px 5px rgb(7, 24, 57);
}
</style>
