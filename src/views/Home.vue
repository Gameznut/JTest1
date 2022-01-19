<template>
  <div>
    <div v-if="off">
      <div class="h-64 bg-blue-400 flex">
        <div class="m-auto w-full">
          <h1 class="text-3xl w-2/4 font-bold" v-if="valid">
            Search Result for "{{ search }}"
          </h1>
          <h1 class="text-3xl text-red-800 w-2/4 font-bold" v-else>
            {{ error }}
          </h1>
        </div>
        <div
          @click="close"
          class="float-right cursor-pointer absolute top-10 right-20"
        >
          <svg
            style="width: 25px; color: red"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            class="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </div>
      </div>

      <div>
        <div class="-mt-28 relative">
          <div v-if="isLoading" class="grids mx-64">
            <div id="card-template" v-for="index in 8" :key="index">
              <div class="contain">
                <div class="boxs">
                  <!-- <img  src="2.png" alt="" /> -->
                </div>
                <div class="text">
                  <h1 class="skeleton skeleton-text"></h1>

                  <h3 class="skeleton skeleton-text"></h3>
                </div>
              </div>
            </div>
          </div>
          <div class="grids mx-64">
            <div
              class="mb-22 contain"
              v-for="newimage in results"
              :key="newimage"
            >
              <img class="boxs bg-black" :src="newimage.urls.small" alt="" />
              <div class="text">
                <h1 class="">
                  {{ newimage.user.name }}
                </h1>
                <h3 class="">
                  {{ newimage.user.location }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="h-64 bg-blue-400 flex">
        <div class="m-auto w-full">
          <input
            class="text-blue-900 outline-none border-none w-2/4 placeholder-gray-50 text-xl mb-16 bg-gray-400 py-4 px-2 rounded-xl"
            placeholder="Search for photo"
            type="text"
            v-model="search"
            name="photo"
            id=""
            @keyup.enter="searching"
          />
        </div>
      </div>
      <div class="-mt-32 relative">
        <div v-if="isLoading" class="grids mx-64">
          <div id="card-template" v-for="index in 8" :key="index">
            <div class="contain">
              <div class="boxs">
                <!-- <img  src="2.png" alt="" /> -->
              </div>
              <div class="text">
                <h1 class="skeleton skeleton-text"></h1>

                <h3 class="skeleton skeleton-text"></h3>
              </div>
            </div>
          </div>
        </div>
        <div class="grids mx-64">
          <div id="card-template" v-for="pred in preloads" :key="pred">
            <div class="contain">
              <div>
                <img class="boxs bg-black" :src="pred.urls.small" alt="" />
              </div>
              <div class="text">
                <h1 class="">{{ pred.user.name }}</h1>
                <h3 class="">{{ pred.user.location }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="-mt-28">
        <div class="grids mx-64">
          <div v-for="pre in preloads" :key="pre">
            <div class="contain">
              <img class="skeleton mb-10" :src="pre.urls.full" alt="" />
              <div class="text-left ml-2 -mt-28">
                <h1 class="text-2xl skeleton skeleton-text text-white">
                  {{ pre.user.name }}
                </h1>
                <h3 class="text-white skeleton skeleton-text">
                  {{ pre.user.location }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      preloads: "",
      results: "",
      off: false,
      isLoading: true,
      error: "",
      valid: "",
    };
  },
  created() {
    setTimeout(() => this.showInfo(), 5000);
    // this.showInfo();
  },
  methods: {
    async searching() {
      const url = `https://api.unsplash.com/search/photos?query=${this.search}&client_id=WK1deDueE4CqISx62oA732H6X09oUokqoq9psv3W1rw&per_page=8`;
      const res = await axios.get(url);
      this.results = this.isLoad ? "" : res.data.results;
      this.off = true;
      console.log(res.data.results);
      if (this.results.length != 0) {
        this.valid = true;
      } else {
        this.valid = false;
        this.error = `Result for ${this.search} not found`;
      }
    },
    close() {
      this.off = false;
      this.search = "";
      this.results = "";
      // this.valid = "";
    },
    showInfo: async function () {
      this.isLoading = !this.isLoading;
      // this.isLoading = false;
      const url =
        "https://api.unsplash.com/search/photos?query=seek/300x300&client_id=WK1deDueE4CqISx62oA732H6X09oUokqoq9psv3W1rw&per_page=8";
      const preload = await axios.get(url);
      this.preloads = this.isLoading ? "" : preload.data.results;
      console.log(preload.data.results);
    },
  },
};
</script>
<style>
/* .boxes img {
  border-radius: 20px;
  text-align: left;
  color: white;
  box-shadow: 1px 10px 15px -10px rgba(34, 33, 33, 0.363);
}

.boxes:empty {
  width: 300px;
  height: 300px;
  background-image: linear-gradient(#ccc, #ccc);
  background-image: linear-gradient(#f5f4f5, #ccc);
  background-size: 48px 48px, 100% 100%;
  background-position: 50% 24px, 15px 140px, 15px 200px, 0 0;
  background-repeat: no-repeat;
}

.boxes:empty::after {
  width: 300px;
  height: 300px;
  background-image: linear-gradient(to left, #ccc, rgb(180, 175, 175));
  background-size: 200% 200%;
  animation: loadings 1s infinite;
}

@keyframes loadings {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -200% 0%;
  }
} */
/* .card.-loading .card_avatar img,
.card.-loading h1,
.card.-loading h3 {
  background: #e9edf1;
  background: linear-gradient(90deg, #e9edf1 7%, #eff2f4 12%, #e9edf1 37%);
  background-size: 200% 100%;
  animation: 1.5s shimmer linear infinite;
}
.card.-loading .card_content h1,
.card.-loading h3 {
  border-radius: 6px;
}
.card.-loading .card_avatar img {
  display: none;
}
@keyframes shimmer {
  to {
    background-position-x: -200%;
  }
}

.card_content {
  margin-top: 1.8rem;
  text-align: center;
  width: 80%;
}
.card_content h1 {
  font-size: 30px;
  height: 30px;
  margin-top: -130px;
}.card_avatar {
  width: 300px;
  height: 300px;
  border-radius: 10%;
  overflow: hidden;
}
.card_avatar img {
  width: 300px;
  height: 300px;
}
.card_content h3 {
  font-size: 14px;
  letter-spacing: 0.06em;
  height: 15px;
  margin-bottom: 100px;
} */

* {
  box-sizing: border-box;
}

.skeleton {
  /* content: ''; */
  animation: ske 2s linear infinite alternate;
  animation-duration: 2s;
  margin-bottom: 54px;
}

@keyframes ske {
  0% {
    background-color: rgb(126, 126, 126);
  }
  100% {
    background-color: rgb(182, 182, 182);
  }
}

.skeleton-text {
  width: 80%;
  margin-bottom: 8px;
  height: 20px;
}

.skeleton-text:last-child {
  width: 80%;
  margin-bottom: 3px;
  height: 20px;
}

.grids {
  display: grid;
  gap: 10px;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, minmax(0, 1fr));
  /* padding: 1rem; */
}

.contain {
  margin: 20px;
  width: 300px;
  height: 300px;
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
}

.contain img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 50px;
}

.contain .text {
  margin-top: -124px;
  margin-left: 10px;
  text-align: left;
  position: relative;
}

.contain .text h1 {
  font-size: 18px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-shadow: 1px 3px #0c0c0c;
}

.contain .text h3 {
  font-size: 16px;
  text-shadow: 2px 2px #008cff;
  color: rgb(255, 255, 255);
}

/* .grid {
  column-gap: 0.7%;
  display: grid;
  grid-template-columns: 16.42% 12.35% 12.35% 12.5% 12.5% 12.35% 8.28% 8.28%;
  grid-column-gap: 0.7%;
}

.grid-gallery img {
  border-radius: 4px;
  height: auto;
  width: 100%;
}
*/
.grids img:nth-of-type(1) {
  grid-column: 1 / span 2;
  grid-row: 1 / span 3;
}

.grids img:nth-of-type(2) {
  grid-column: 1;
  grid-row: 4 / span 2;
}

.grids img:nth-of-type(3) {
  grid-column: 2;
  grid-row: 4 / span 2;
}

.grids img:nth-of-type(4) {
  align-self: end;
  grid-column: 3;
  grid-row: 1 / span 5;
}

.box {
  background-color: rgb(235, 193, 193);
  background-image: linear-gradient(
    to right,
    rgb(214, 212, 212),
    rgb(173, 173, 187)
  );
  margin-bottom: 54px;
  animation: anmBg 2s infinite;
  background-size: 200% 100%;
}
.contains {
  margin: 20px;
  width: 300px;
  position: absolute;
  top: 10px;
}
.boxs {
  /* background-color: rgb(207, 34, 34); */
  background-image: linear-gradient(
    to right,
    rgb(170, 168, 168),
    rgb(211, 211, 211)
  );
  margin-bottom: 54px;
  animation: anmBg 1s linear infinite both;
  background-size: 200% 100%;
  width: 300px;
  height: 300px;
  opacity: 0.6;
  /* background-color: rgb(223, 32, 32); */
}
.skeleton1 {
  /* content: ''; */
  animation: ske 1s linear infinite alternate;
  animation-duration: 2s;
  margin-bottom: 54px;
  /* height: 90px; */
}
.skeleton-text1 {
  width: 92%;
  height: 25px;
  top: 226px;
  left: 10px;
  position: absolute;
  margin-bottom: 8px;
}

.skeleton-text1:last-child {
  width: 50%;
  height: 20px;
  top: 253px;
  left: 10px;
  position: absolute;
  margin-bottom: 3px;
}
@keyframes ske {
  0% {
    background-color: rgb(219, 216, 216);
  }
  100% {
    background-color: rgb(182, 182, 182);
  }
}
/* .h1txt {
  background-image: linear-gradient(
    to right,
    rgb(138, 136, 136),
    rgb(192, 192, 196)
  );
  animation: anmBg 2s infinite;
  background-size: 200% 100%;
  background-color: rgb(235, 193, 193);
  width: 89%;
}
.smalltxt {
  background-image: linear-gradient(
    to right,
    rgb(124, 124, 124),
    rgb(135, 135, 148)
  );
  display: block;
  background-size: 200% 100%;
  background-color: rgb(235, 193, 193);
  animation: anmBg 2s infinite;

  width: 89%;
}
 */
@keyframes anmBg {
  to {
    background-position: -170% 0;
  }
}
</style>
