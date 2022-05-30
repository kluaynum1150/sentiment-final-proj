<template>
    <div class="m-2">
        <div v-if="loadingHistory" class="d-flex align-items-center justify-content-center text-primary my-2" style="height: 550px;flex-direction:column;">
            <b-spinner style="width: 6rem; height: 6rem;" class="mb-6" variant="primary"></b-spinner>
            <strong style="font-size:x-large;">Loading...</strong>
        </div>
        <b-row v-else>
            <b-col cols="12" sm="6">
                <b-card>
                    <b-card-title class="text-center">Prediction result</b-card-title>
                    <apexChart type="bar" :options="options" :series="[{name:'value',data:getComputeScore}]" class="mb-4"></apexChart>
                    <h4 class="mb-4">This post expresses emotions</h4>
                    <div v-if="detailPrediction.pre != 'unpredict'" class="d-flex text-center mb-4">
                        <div class="block-emotion">
                            <img :src="'../reaction-icon/'+detailPrediction.pre+'.svg'" :alt="detailPrediction.pre" style="width: 80px;height: 80px;margin: 0.5rem;">
                            <p class="text-in-block">{{ detailPrediction.pre }}</p>
                        </div>
                        <div class="block-emotion">
                            <img :src="'../reaction-icon/'+detailPrediction.prob+'.svg'" :alt="detailPrediction.prob" style="width: 50px;height: 50px;margin: 0.5rem;">
                            <p class="text-in-block">{{ detailPrediction.prob }}</p>
                        </div>
                    </div>
                    <div v-else class="d-flex text-center mb-4 justify-content-center">
                        <div :class="['block-emotion',detailPrediction.pre]">
                            <img :src="'../reaction-icon/'+detailPrediction.pre+'.png'" :alt="detailPrediction.pre" style="width: 100px;height: 100px;margin: 0.5rem;">
                            <p class="text-in-block">{{ detailPrediction.pre }}</p>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col cols="12" sm="6">
                <b-card>
                    <h4>Emotion</h4>
                    <div class="d-flex text-center mb-4">
                        <div class="block">
                            <p style="margin:0.5rem !important" class="text-in-block">{{ detailPrediction.purport }}</p>
                        </div>
                    </div>
                    <b-card>
                        <p style="text-align: justify;">{{ detailPrediction.text }}</p>
                    </b-card>
                    <p class="text-muted mb-4">Predicted on: {{ detailPrediction.p_date | moment('MMMM DD, YYYY [at] h:mm:ss a') }}</p>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/types"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'detailPrediction',
    props: [
        'idPost'
    ],
    data (){
        return {
            loadingHistory: false,
            detail: {
                text: 'content of post...',
                emotion: 'Generally wholesome post',
                classPredict: ['like','love'],
                scoreClass: [45, 50, 49, 60, 70, 91],
                startPredict: Date.now(),
            },
            options: {
                chart: {
                    id: 'detail-predict'
                },
                colors: ['#0d6efd','#d63384','#ffc107','#fd7e14','#0dcaf0','#dc3545'],
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                        distributed: true,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        colors: ["#304758"]
                    }
                },
                fill: {
                    opacity: 0.9,
                    type: 'solid',
                },
                xaxis: {
                    categories: ['Like', 'Love', "Haha", "Wow", "Sad", "Angry"],
                    title: {
                        text: 'Class'
                    }
                },
                yaxis: {
                    max: 100,
                    title: {
                        text: 'Prediction (%)'
                    },
                    labels: {
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                },
            },
        }
    },
    created() {
        this.loadingHistory = true
        this.fetchDetailPrediction(this.idPost).then(()=>{
            this.loadingHistory = false
        })
    },
    computed: {
        ...mapGetters([getterTypes.DETAIL_PREDICTION]),
        getComputeScore() {
            if(this.detailPrediction){
                return [this.computeScore(this.detailPrediction.like),this.computeScore(this.detailPrediction.love),this.computeScore(this.detailPrediction.haha),this.computeScore(this.detailPrediction.wow),this.computeScore(this.detailPrediction.sad),this.computeScore(this.detailPrediction.angry)]
            }
            return []
        }
    },
    methods: {
        ...mapActions([actionTypes.FETCH_DETAIL_PREDICTION]),
        computeScore(score){
            var totalScore = this.detailPrediction.like + this.detailPrediction.love + this.detailPrediction.haha + this.detailPrediction.wow + this.detailPrediction.sad + this.detailPrediction.angry
            return ((score / totalScore)*100).toFixed(2)
        }
    },
}
</script>

<style scoped>
.block{
    border: 1px solid #ccc!important;
    border-radius: 10px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.block-emotion{
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: center;
    flex-direction: column;
}
.text-in-block{
    font-size:x-large;
    font-weight:600;
    margin-bottom: 0 !important;
}
</style>