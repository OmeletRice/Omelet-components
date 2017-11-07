<template>
  <div class="om-layout-demo">
    <om-row>
      <om-col :span="24">
        <div class="gird-content">
          col-24
        </div>
      </om-col>
    </om-row>

    <om-row :gutter="10">
      <om-col :span="12">
        <div class="gird-content">
          col-12
        </div>
      </om-col>
      <om-col :span="12">
        <div class="gird-content">
          col-12
        </div>
      </om-col>
    </om-row>

    <om-row :gutter="20">
      <om-col :span="6">
        <div class="gird-content">
          col-6
        </div>
      </om-col>
      <om-col :span="6">
        <div class="gird-content">
          col-6
        </div>
      </om-col>
      <om-col :span="6">
        <div class="gird-content">
          col-6
        </div>
      </om-col>
      <om-col :span="6">
        <div class="gird-content">
          col-6
        </div>
      </om-col>
    </om-row>
  </div>  
</template>

<script>
export default {
  name: 'OmLayout'
}
</script>

<style scoped>
.om-layout-demo .om-row {
  margin-bottom: 10px;
}

.gird-content {
  background-color: #e9ecef;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  height: 20px;
}
</style>
