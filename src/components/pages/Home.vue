<script>
</script>

<template>
    <div class="main">
        <h1>Welcome <span class="blue">LRNG English!</span>
        </h1>
        <p class="explain">全部で10問！正しい順番に単語を並び替えよう。</p>
        <router-link to="/practice/1">
            <button class="btn btn-flat">
                <span>練習を開始する</span>
            </button>
        </router-link>
    </div>
</template>

<style>
.main{
    padding: 0%;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 15%;
    text-align: center;
    font-size: 2rem;
}

.blue{
    color: rgb(5, 68, 196);
    font: bold;
}

.explain{
  font-size: 2rem;
  padding-bottom: 3%;
}

/* button */
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

button.btn-flat {
  overflow: hidden;

  padding: 1.5rem 6rem;

  color: #fff;
  border-radius: 0;
  background: #000;
}

button.btn-flat span {
  position: relative;
}

button.btn-flat:before {
  position: absolute;
  top: 0;
  left: 0;

  width: 150%;
  height: 500%;

  content: "";
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);

  background:rgb(5, 68, 196);
}

button.btn-flat:hover:before {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>
