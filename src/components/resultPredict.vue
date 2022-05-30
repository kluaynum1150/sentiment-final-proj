<template>
    <div>
        <b-card title="Result" :class="{'d-none':(resultPredict == null || resultPredict == {} ? true : false)}">
            <div v-if="loading" class="d-flex align-items-center justify-content-center text-primary my-2" style="height: 850px;flex-direction:column;">
                <b-spinner style="width: 6rem; height: 6rem;" class="mb-6" variant="primary"></b-spinner>
                <strong style="font-size:x-large;">Loading...</strong>
            </div>
            <b-row v-else class="mt-2 mb-2">
                <b-col cols="12">
                    <b-row v-if="resultPredict" class="m-2">
                        <b-col cols="12" class="mt-2 mb-2">
                            <b-card>
                                <div class="d-flex align-items-center">
                                    <h5 class="ml-1" style="margin-bottom: 0;">Emotions:</h5>
                                    <div class="d-flex text-center">
                                        <div class="block">
                                            <p style="margin:0.5rem !important" class="text-in-block">{{ resultPredict.purport }}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div v-if="resultPredict.pre != 'unpredict'" class="d-flex text-center mb-4 justify-content-center">
                                    <div id="first-class" :class="['block-emotion',resultPredict.pre]">
                                        <img :src="'../reaction-icon/'+resultPredict.pre+'.svg'" :alt="resultPredict.pre" style="width: 100px;height: 100px;margin: 0.5rem;">
                                        <p class="text-in-block">{{ resultPredict.pre }}</p>
                                    </div>
                                    <div id="second-class" :class="['block-emotion',resultPredict.prob]">
                                        <img :src="'../reaction-icon/'+resultPredict.prob+'.svg'" :alt="resultPredict.prob" style="width: 70px;height: 70px;margin: 0.5rem;">
                                        <p class="text-in-block">{{ resultPredict.prob }}</p>
                                    </div>
                                </div>
                                <div v-else class="d-flex text-center mb-4 justify-content-center">
                                    <div id="unpredict-class" :class="['block-emotion',resultPredict.pre]">
                                        <img :src="'../reaction-icon/'+resultPredict.pre+'.png'" :alt="resultPredict.pre" style="width: 100px;height: 100px;margin: 0.5rem;">
                                        <p class="text-in-block">{{ resultPredict.pre }}</p>
                                    </div>
                                </div>
                                <!-- <h5 class="mb-2">The meaning of the predicted mood</h5>
                                <hr> -->
                            </b-card>
                        </b-col>
                        <b-col cols="12">
                            <apexChart type="bar" :options="options" :series="[{name: 'value',data: getComputeScore}],"></apexChart>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    props: [
        'resultPredict',
        'loading'
    ],
    name: "resultPredict",
    data() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                title: {
                    text: 'Prediction results',
                    align: 'center',
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
            }
        }
    },
    computed: {
        getComputeScore() {
            if(this.resultPredict){
                return [this.computeScore(this.resultPredict.like),this.computeScore(this.resultPredict.love),this.computeScore(this.resultPredict.haha),this.computeScore(this.resultPredict.wow),this.computeScore(this.resultPredict.sad),this.computeScore(this.resultPredict.angry)]
            }
            return []
        }
    },
    methods: {
        computeScore(score){
            var totalScore = this.resultPredict.like + this.resultPredict.love + this.resultPredict.haha + this.resultPredict.wow + this.resultPredict.sad + this.resultPredict.angry
            return ((score / totalScore)*100).toFixed(2)
        }
    }
}
</script>

<style scoped>
.block{
    border: 1px solid #ccc !important;
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