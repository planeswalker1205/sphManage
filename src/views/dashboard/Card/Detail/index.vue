<template>
  <div>

        <!-- 头部 -->
        <div class="card-header">
          <span>{{title}}</span>
          <svg class="w-6 h-6" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <!-- 内容区 -->
        <div class="card-content">{{count}}</div>
        <!-- 图表区 -->
        <div class="card-charts">
          <slot name="charts"></slot>
        </div>
        <!-- 底部 -->
        <div class="card-bottom">
          <slot name="footer">

          </slot>
        </div>

  </div>
</template>

<script>
export default {
  name: "Detail",
  props:['title','count']
};
</script>

<style scoped>

.card-header{
  display: flex;
  justify-content: space-between;
  color:#c0b9b9;
  font-size: 16px;
}

.card-content{
  font-size: 30px;
  padding: 10px 0;
}
.card-charts{
  height: 50px;
}
.card-bottom{
  border-top:1px solid rgb(214, 210, 210);
  padding-top:10px;
}
</style>

