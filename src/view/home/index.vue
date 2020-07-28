<template>
  <div>
    <baidu-map :scroll-wheel-zoom="false" class="map" @ready="initMap" :center="center" :zoom="zoom">
      <bm-control :offset="{width:100,height:20}" anchor="BMAP_ANCHOR_TOP_RIGHT">
        <el-button style="margin-right:10px" @click="openSet" :type="type">设置温度</el-button>
        <el-select @change="changeMark" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in lists"
            :key="item.deviceNo"
            :label="item.deviceNo"
            :value="item.deviceNo">
          </el-option>
        </el-select>
      </bm-control>
      <!-- 缩放 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker v-for="(item,index) in lists" :key="index" animation="BMAP_ANIMATION_BOUNCE" :position="item.position"  :icon="{url: item.overload ==1 ? markList[1].url : markList[0].url, size:{width:35,height:80},opts:{imageSize:{width:30,height:30}}}" @click="infoWindowOpen(item,index)">
         
      </bm-marker>
      <div v-if="showInfo">
        <my-overlay
          ref="child"
          :show="infoData.show"
          :position="infoData.position"
           :key='infoData.deviceNo'
          :active="false"
          :deviceNo="infoData.deviceNo"
          @close="infoWindowClose"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay> 
      </div>
      
    </baidu-map>

    <!-- dialog -->
    <el-dialog title="设置温度" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="温度阈值" :label-width="formLabelWidth">
          <el-input v-model="form.threshold" placeholder="0-100" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSet">取 消</el-button>
        <el-button type="primary" @click="makeSet">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {getDeveiceList,setThreshold,getThreshold} from '../../network/request'
import MyOverlay from './component/MyOverlay'
export default {
  components: {
    MyOverlay
  },
  data(){
    
    return {
      infoData:{deviceNo:'',position:'',show:false},
      lists:[],
      showInfo:false,
      deviceNo:'',
      value: '',
      resizeWidth:1,
      
      markList:[{url:"/static/map1.png"},{url:"/static/map2.png"}],
      active: false,
      form:{
        threshold:''
      },
      formLabelWidth: '120px',
      dialogFormVisible:false,
      type:'',
      BMap:'',
      map:'',
      center:{lng: 116.404, lat: 39.915},
      zoom:15,
      markPosition:{lng: 116.404, lat: 39.915},
 
      
    }
  },

  methods:{
    changeMark(val){
      console.log(val)
      this.lists.forEach((item,index)=>{
        console.log(item,index)
        if(item.deviceNo == val){
          this.center = {lat:item.position.lat,lng:item.position.lng}
          this.infoWindowOpen(item,index)
        }
      })
    },
    draw ({el, BMap, map}) {
      // console.log('el',el,this.$refs)
      const pixel = map.pointToOverlayPixel(new BMap.Point(117.253836, 38.515236))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    makeSet(){
      if(this.form.threshold<1 || this.form.threshold>100){
         this.$message.error('请输入1-100的阈值')
         return false
      }
      setThreshold(this.form.threshold).then(res=>{
        this.$message.success('设置成功')
        this.dialogFormVisible =false
        this.type=""
      }).catch(()=>{
        this.$message({
          message: '请求错误',
          center: true,
          type:'error',
          duration:500
        });
      })
      
    },
    cancelSet(){
      this.dialogFormVisible =false
      this.type=""
    },
    openSet(){
      this.dialogFormVisible =true
      this.type="primary"
    },
    initMap({BMap, map}){
      this.BMap = BMap
      this.map = map
    },
    infoWindowOpen(item,index){
  
       
       
      
       this.lists.forEach(item=>{
         item.show = false
       })
       this.lists[index].show =true
       this.infoData.deviceNo = item.deviceNo
       this.infoData.position = item.position
       this.infoData.show =this.lists[index].show
       this.showInfo = true
       console.log('dasdas',this.infoData)
       setTimeout(()=>{
          this.$refs.child.reset()
      },500)
      
      //  this.$refs.child.forEach((item,index)=>{
      //    item.reset()
      //  })
       
    },
    infoWindowClose () {
     this.lists.forEach(item=>{
        item.show = false
      })
      this.showInfo = false
      this.infoData.deviceNo = ''
       this.infoData.position = ''
       this.infoData.show =false
    },
    
    getList(){
      getDeveiceList().then(res=>{
        res.data.data.forEach(item=>{
          item.show= false
        })
        this.lists = res.data.data
        setTimeout(()=>{
          this.setViewPort()
        },500)
        console.log(33333 ,this.lists )
      }).catch((err)=>{
        console.log(111,err)
        this.$message({
          message: '请求错误',
          center: true,
          type:'error',
          duration:500
        });
      })
 
     
    },
    setViewPort(){
      let points = []
      this.lists.forEach((item,index)=>{
        points.push({lng:item.position.lng,lat:item.position.lat})
      })
       this.map.setViewport(points)
    }
    
  },
  created(){
    getThreshold().then(res=>{
      this.form.threshold = res.data.data || ''
      console.log(1111,res.data.data)
    })
    this.getList()
    
  },
  mounted(){
    
  }
}
</script>

<style>
.map{
  width: 100%;
  height: 100vh;
}

</style>