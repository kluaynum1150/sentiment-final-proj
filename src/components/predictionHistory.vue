<template>
  <div>
      <div v-if="loadingList" class="d-flex align-items-center justify-content-center text-primary my-2" style="height: 850px;flex-direction:column;">
            <b-spinner style="width: 6rem; height: 6rem;" class="mb-6" variant="primary"></b-spinner>
            <strong style="font-size:x-large;">Loading...</strong>
      </div>
      <div v-else>
        <div class="block mt-2 mb-2" v-for="(item,index) in listShowData" :key="index">
            <div class="m-3">
                <h6 style="font-weight: bolder;">Emotion: {{ item.purport }}</h6>
                <p style="text-align: justify; height: 119px;">{{ item.text | truncateText(200, '...') }}</p>
                <div class="text-end">
                    <p class="see-more" @click="goToDetail(item.id)">See more</p>
                </div>
            </div>
        </div>
        <b-pagination 
            v-model="currentPage" 
            pills 
            :total-rows="historyPredictions.length"
            :per-page="perPage"
            class="justify-content-center mt-2 mb-1"
        ></b-pagination>
      </div>
      <b-modal id="detail-prediction" size="xl" scrollable hide-footer>
          <DetailPrediction :idPost="clickedPost"></DetailPrediction>
      </b-modal>
  </div>
</template>

<script>
import DetailPrediction from './detailPrediction.vue'
import { actionTypes, getterTypes } from "@/store/types"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "PredictionHistory",
    components: {
        DetailPrediction
    },
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            clickedPost: null,
            loadingList: false
        }
    },
    created() {
        this.loadingList = true
        this.fetchHistoryPredictions().then(()=>{
            this.loadingList = false
        })
    },
    filters: {
        truncateText: function (text, length, clamp) {
            if (text) {
                return text.length > length ? text.slice(0, length) + clamp || '...' : text;
            }
            return text
        },
    },
    computed: {
        ...mapGetters([getterTypes.HISTORY_PREDICTIONS]),
        listShowData(){
            if(this.currentPage == 1){
                return this.historyPredictions.slice(0,this.perPage)
            } else {
                let start = this.perPage * (this.currentPage - 1)
                let end = this.perPage * this.currentPage
                return this.historyPredictions.slice(start,end)
            }
        }
    },
    methods: {
        ...mapActions([actionTypes.FETCH_HISTORY_PREDICTIONS]),
        goToDetail(post) {
            this.clickedPost = post
            this.$bvModal.show('detail-prediction')
        }
    }
}
</script>

<style scoped>
.block{
    border: 1px solid #ccc!important;
    border-radius: 5px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    min-height: 222px;
}
.see-more{
    color: blue;
    cursor: pointer;
    display: inline;
}
.see-more:hover{
    color: darkblue;
    text-decoration: underline;
}
</style>