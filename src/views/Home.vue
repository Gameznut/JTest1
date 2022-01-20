<template>
  <div class="relative">
    <div v-if="off" :class="{ backdrop: !showModal }">
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
          <div class="grids mx-64">
            <div id="card-template" v-for="newimage in results" :key="newimage">
              <div class="mb-22 contain">
                <div>
                  <img
                    @click="test(newimage)"
                    class="boxs"
                    :src="newimage.urls.small"
                    alt=""
                  />
                </div>

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
          <transition name="appear">
            <div class="simple-modal" v-if="!showModal">
              <div @click="showModal = !showModal">
                <svg
                  style="
                    width: 25px;
                    color: red;
                    position: absolute;
                    z-index: 10;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    font-weight: 100;
                  "
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
              <div class="contain_unique">
                <div>
                  <img class="boxs_unique" :src="unique" alt="" />
                </div>
                <div class="text">
                  <h1 class="">{{ name }}</h1>
                  <h3 class="">{{ location }}</h3>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div v-else :class="{ backdrop: !showModal }">
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
        <div class="grids mx-64">
          <div id="card-template" v-for="index in 8" :key="index">
            <div v-if="isLoading" class="contain">
              <div class="boxs">
                <img src="2.png" alt="" />
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
                <img
                  @click="test(pred)"
                  class="boxs"
                  :src="pred.urls.small"
                  alt=""
                />
              </div>
              <div class="text">
                <h1 class="">{{ pred.user.name }}</h1>
                <h3 class="">{{ pred.user.location }}</h3>
              </div>
            </div>
          </div>
        </div>
        <!--  modal -->
        <transition name="appear">
          <div class="simple-modal" v-if="!showModal">
            <div>
              <svg
                style="
                  width: 25px;
                  color: red;
                  position: absolute;
                  z-index: 10;
                  top: 10px;
                  right: 10px;
                  cursor: pointer;
                "
                @click="showModal = !showModal"
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
            <div class="contain_unique">
              <div>
                <img class="boxs_unique" :src="unique" alt="" />
              </div>
              <div class="text">
                <h1 class="">{{ name }}</h1>
                <h3 class="">{{ location }}</h3>
              </div>
            </div>
          </div>
        </transition>
      </div>
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
      showModal: true,
      unique: "",
      name: "",
      location: "",
    };
  },
  created() {
    setTimeout(() => this.showInfo(), 1000);
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
    },
    showInfo: async function () {
      this.isLoading = !this.isLoading;
      // this.isLoading = false;
      const url =
        "https://api.unsplash.com/search/photos?query=africa/300x300&client_id=WK1deDueE4CqISx62oA732H6X09oUokqoq9psv3W1rw&per_page=8";
      const preload = await axios.get(url);
      this.preloads = this.isLoading ? "" : preload.data.results;
      console.log(preload.data.results);
    },

    test(data) {
      this.showModal = !this.showModal;
      this.unique = data.urls.full;
      this.name = data.user.name;
      this.location = data.user.location;
      console.log(data.user.name);
    },
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}

.skeleton {
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
  width: 70%;
  margin-bottom: 3px;
  height: 20px;
}

.grids {
  display: grid;
  grid-template-rows: 1fr 0.07fr;
}

.contain {
  margin: 20px;
  width: 300px;
  height: 300px;
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
}

.contain img {
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

.grids #card-template:nth-child(1) {
  grid-column: 1 / 3;
}

.grids #card-template:nth-child(1) .contain,
.grids #card-template:nth-child(1) .contain .boxs,
.grids #card-template:nth-child(1) .contain {
  width: 650px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
}
.grids #card-template:nth-child(2) {
  grid-column: 3;
  grid-row: 1 / span 2;
}

.grids #card-template:nth-child(2) .contain,
.grids #card-template:nth-child(2) .contain .boxs,
.grids #card-template:nth-child(2) .contain {
  width: 300px;
  height: 650px;
  object-fit: cover;
  border-radius: 20px;
}
.grids #card-template:nth-child(3) {
  grid-column: 4;
  grid-row: 1 / span 2;
}

.grids #card-template:nth-child(3) .contain,
.grids #card-template:nth-child(3) .contain .boxs,
.grids #card-template:nth-child(3) .contain {
  width: 300px;
  height: 650px;
  object-fit: cover;
  border-radius: 20px;
}

.grids #card-template:nth-child(6) {
  grid-column: 2/ 4;
  grid-row: 3;
}

.grids #card-template:nth-child(6) .contain,
.grids #card-template:nth-child(6) .contain .boxs,
.grids #card-template:nth-child(6) .contain {
  width: 650px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
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
  width: 100%;
  position: absolute;
  top: 10px;
}
.boxs {
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
  border-radius: 20px;
  cursor: pointer;
}
.skeleton1 {
  animation: ske 1s linear infinite alternate;
  animation-duration: 2s;
  margin-bottom: 54px;
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
@keyframes anmBg {
  to {
    background-position: -170% 0;
  }
}

.simple-modal {
  width: 55vw;
  height: 80vh;
  box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.19);
  position: fixed;
  right: 25%;
  left: 20%;
  top: 10%;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  background: white;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;
}

.backdrop:after {
  content: "";
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  top: 0%;
  left: 0%;
  animation: backdrop 600ms ease forwards;
}
@keyframes backdrop {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}

/* // dynamically added classes by vue */
.appear-enter-active {
  animation: appear 700ms ease;
}

.appear-leave-active {
  animation: appear 300ms ease reverse;
}

/* // keyframes? */
@keyframes appear {
  0% {
    top: -100%;
  }

  2% {
    height: 102;
  }

  5% {
    height: 115%;
  }

  10% {
    height: 120%;
  }

  20% {
    height: 125%;
  }

  100% {
    top: 10%;
  }
}
.boxs_unique {
  background-image: linear-gradient(
    to right,
    rgb(170, 168, 168),
    rgb(211, 211, 211)
  );
  animation: anmBg 1s linear infinite both;
  background-size: 200% 100%;
  width: 55vw;
  height: 80vh;
  opacity: 0.6;
  /* border-radius: 20px; */
  /* cursor: pointer; */
  /* background-color: black; */
}
.contain_unique {
  width: 55vw;
  height: 80vh;
  background-color: black;
}
.contain_unique img {
  width: 55vw;
  height: 80vh;
  object-fit: cover;
}
.contain_unique .text {
  margin-top: -124px;
  margin-left: 10px;
  text-align: left;
  position: relative;
}

.contain_unique .text h1 {
  font-size: 28px;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.contain_unique .text h3 {
  font-size: 20px;
  color: rgb(255, 255, 255);
}
</style>
