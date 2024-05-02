<script setup>

import { ref, computed } from 'vue';
import lesson from "@/assets/json/lesson.json"
import { useRoute, useRouter } from 'vue-router';

let isErrMsg = ref(false);
let errMsg = ref("");
let answer = ref("");
let sentence = ref([]);;
let nextBtn = ref(false);
let finish = ref(false);

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

// ボタンが押されたときにwordの値をsentenceに格納し、画面に表示されないようにする
// .filter(): wordと一致しない要素だけをフィルタリングして新しい配列作成
function addTosentence(word){
    sentence.value.push(word);
    // console.log(english)
    english = english.filter(item => item !== word);
}

// englishとsentenceの配列要素が一致することを確認
// 不一致が見つからなかったときのみtrueを返す
function compareArrays(arr1, arr2) {
    isErrMsg.value = false;

    if (arr1.length !== arr2.length) {
        isErrMsg.value = true;
        errMsg.value = "すべての単語を使用してください";
        answer.value = "";
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                isErrMsg.value = true;
                errMsg.value = "不正解✖";
                answer.value = "正解： " + lesson[n.value]?.english.join(" ") ;
                nextBtn.value = true;
                return false; // 不一致が見つかったらここで関数を終了してエラーメッセージを設定する
            }
        }
        // 不一致が見つからなかった場合はエラーメッセージを設定せずにtrueを返す
        return true;
    }
}

// 「取り消し」ボタン
function undoRemove() {
    const lastWord = sentence.value.pop();
    sentence.value = sentence.value.filter(item => item !== lastWord);
    english.push(lastWord);
}

// 「できた！」ボタン
const router = useRouter();
function levelUp(){
    if(compareArrays(sentence.value, lesson[n.value]?.english)){
        nextBtn.value = true;
        isErrMsg.value = true;
        errMsg.value = "正解◎";
    };
    
    }
console.log(english)
// 「次の問題へ進む」ボタン
function nextPage(){
    if(n.value < 10){
        n.value += 1;
            english = shuffleArray(lesson[n.value]?.english);
            // english = computed(() => shuffleArray(lesson[n.value]?.english));
            console.log(english)
            sentence.value.push(english.value)
            sentence.value = [];
            isErrMsg.value = false;
            nextBtn.value = false;
            router.push(`/practice/${n.value + 1}`);
            }else{
                finish.value = true;
            }
    }
</script>

<template>
    <div class="practiceMain">
        <div v-if="!finish">
            <p class="japanese">問題：<span class="japaneseSpn">「{{ japanese }}」</span>
            </p>
            <!-- join(""): 各要素を配列で区切られた文字列に連結 -->
            <p class="english">{{ sentence.join(' ') }}</p>
            
            <div>
                <p v-if="isErrMsg" class="errMsg1">{{ errMsg }}</p>
                <p v-if="isErrMsg" class="errMsg2">{{ answer }}</p>
            </div>
            
            <div class="word-container">
                <div v-for="word in english" :key="word" class="word-item">
                    <button @click="addTosentence(word)" class="word">
                        {{ word }}
                    </button>
                </div>
                
                <button v-if="sentence.length > 0 && !nextBtn" @click="undoRemove()" class="undo-btn">
                    取り消し✖
                </button>
            </div>
            
            
            <button v-if="!nextBtn" @click="levelUp()" class="btn btn--blue btn--cubic btn--shadow" >
                できた！
            </button>

        <button v-if="nextBtn" @click="nextPage()" class="btn btn--blue btn--cubic btn--shadow">
            次の問題へ進む
        </button>
    </div>

    <div v-if="finish">
        <p class="finish">全問終了。お疲れ様でした！</p>
        <router-link to="/" class="link">⇒再度チャンレンジする場合はこちら</router-link>
    </div>
    </div>
</template>

<style>

.finish{
font-size: 5rem;
}

.link{
    font-size: 3rem;
}

.undo-btn{
    background-color: rgb(255, 220, 253);
    border: solid  rgb(246, 132, 240);
    border-radius: 4px;
}

.errMsg1{
    color: red;
    font-size: 4rem;
    font-weight: bold;
}

.errMsg2{
    color: red;
    font-size: 5rem;
    font-weight: bold;
}

.practiceMain{
    padding: 0%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10%;
    text-align: center;
}

.japanese{
    font-size: 5rem;
}

.japaneseSpn{
    color: rgb(112, 112, 112);
}

.english{
    font-size: 4rem;
    border-bottom: dotted;
    border-color: rgb(101, 142, 225);
    border-width: 4px;
}

.word{
    background-color: rgb(219, 235, 249);
    border: solid #aacffa;
    border-radius: 4px;
    font-size: 3rem;
}

.word:hover{
    background-color: aliceblue;
    border: solid #bbd8f9
}

.word-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 5%;
}

.word-item {
    margin-right: 2%; 
    margin-bottom: 1px; 
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
  color: #fff;
  background: rgb(34, 88, 197);
  border-bottom: 2px solid rgb(5, 51, 144);
}
button.btn--shadow {
  -webkit-box-shadow: 0 3px 5px rgb(7, 24, 57);
  box-shadow: 0 3px 5px rgb(7, 24, 57);
}
</style>
