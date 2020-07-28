<template>
  <bm-overlay
    
    ref="customOverlay"
    :class="{sample1: true, active}"
    pane="labelPane"
    @draw="draw">
      <img class="close-info" @click="closeinfo"  :src="closeImg" />
      <div class="sample">
        <div :class="{'over-box1' :chartData.rows.length>20}">
          <ve-line ref="chart1" :settings="chartSettings" :data="chartData"></ve-line>
        
        </div>
      </div>
      <div class="triangle"></div>
      
  </bm-overlay>
</template>

<script>
import {getInfo} from '../../../network/request'
export default {
  props: ['show', 'position', 'active','deviceNo'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  data() {
    this.chartSettings = {
        labelMap: {
          temperature: '温度'
        }
    }
    return {
      closeImg:"/static/close.png",
      chartData: {
        columns: ['date', 'temperature'],
        rows: []
      },
    }
  },
  methods: {
    getPoints(deviceNo){
      getInfo(deviceNo).then(res=>{
        
        this.chartData.rows = res.data.data
        console.log('this.chartData.rows',this.chartData.rows)
      })
    },
    reset(){
      this.$nextTick(()=>{
         console.log(this.$refs)
         this.$refs.chart1.resize()
      })
      
    },
    closeinfo(){
      this.$emit('close')
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 220 + 'px'
      el.style.top = pixel.y - 460 + 'px'
    }
  },
  created(){
 
    this.getPoints(this.deviceNo)
    // this.chartData.rows = temperature.data
  }
}
</script>

<style>

.sample1 {
  width: 420px;

  height: 360px;
  padding: 10px;
  border-radius: 10px;
  background: #ffffff;
  /* overflow: hidden; */
  box-shadow: 0 0 5px #fff;
  position: absolute;
 
}
.sample {
  width: 100%;

  height: 100%;


  
  /* overflow-x: scroll; */
  overflow-y: hidden;

 
}

.sample::-webkit-scrollbar {
    width: 15px;    
    height: 15px;
}
.sample::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow:inset 0 0 5px rgba(25,212,174);
  background: rgba(25,212,174);
}
.sample::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.over-box{
   width: 3000px;

  
}
.over-box1{
  width: 420px;

  
}
.close-info{
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  z-index: 312222222222222222222211
}
.triangle{
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #ffffff ;
    position: absolute;
    bottom: -36px;
    left: 200px;
    transform: rotate(8deg);
    z-index: 12333333333333333333333333333333333333333333;
}
</style>