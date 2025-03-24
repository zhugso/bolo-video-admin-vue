<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'




const dialogTableVisible = ref(false)

const tableData = [
  {
    id: '123123',
    title: 'aaaa',
    up_user: 'usaaa',
    up_date: 'aaa',
    is_check: false,
    is_delete: false,

    play_count: 1231231,
    description: 'aaaaaaafasdfasdffffffffff',
    duration: 111,
    cover_url: '',
    video_url: '',
  },
  {
    id: '123456',
    title: 'bbbbb',
    up_user: 'usbbbb',
    up_date: 'bbb',
    is_check: false,
    is_delete: false,

    play_count: 1231231,
    description: 'aaaaaaafasdfasdffffffffff',
    duration: 111,
    cover_url: '',
    video_url: '',
  },
]

const searchConditionsForm = reactive({
  id: '',
  title: '',
  date: '',
  check: false,
  delete: false,
})
const currentRowData = ref({
  id: '',
  title: '',
  up_user: '',
  up_date: '',
  is_check: false,
  is_delete: false,

  play_count: 0,
  description: '',
  duration: 0,
  cover_url: '',
  video_url: '',
})

let player
const detailsClick = (p) => {
  currentRowData.value = p
  dialogTableVisible.value = true
}
const dialogOpenHandle = () => {
  player = new Player({
    id: 'xgplayer',
    url: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4',
    width: '640px',
    height: '360px',
  });
}
const dialogClosehandle = () => {
  player.destroy() // 销毁播放器
  player = null // 将实例引用置空
}


const deleteClick = (p) => {
  ElMessageBox.confirm(
    '是否继续删除视频?',
    '警告',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    console.log(p.id);

    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // ElMessage({
    //   type: 'error',
    //   message: '删除失败',
    // })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除取消',
    })
  })
}
</script>

<template>
  <div class="video-list">

    <el-form class="video-condition">
      <el-form-item label="id">
        <el-input v-model="searchConditionsForm.id" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="searchConditionsForm.title" clearable />
      </el-form-item>
      <el-form-item label="上传时间">
        <el-date-picker v-model="searchConditionsForm.date" type="daterange" range-separator="到"
          start-placeholder="开始时间" end-placeholder="结束时间" :unlink-panels="true" />
      </el-form-item>
      <el-form-item label="已审核">
        <el-switch v-model="searchConditionsForm.check" />
      </el-form-item>
      <el-form-item label="已删除">
        <el-switch v-model="searchConditionsForm.delete" />
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="上传用户" prop="up_user" />
      <el-table-column label="上传时间" prop="up_date" />
      <el-table-column label="是否通过审核" prop="is_check" />
      <el-table-column label="是否删除" prop="is_delete" />
      <el-table-column label="操作" prop="operation">
        <template #default="props">
          <el-button type="primary" size="small" @click="detailsClick(props.row)">
            查看详情
          </el-button>
          <el-button type="danger" size="small" @click="deleteClick(props.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="dialogTableVisible" title="详细信息" width="1000" destroy-on-close @open="dialogOpenHandle"
      @close="dialogClosehandle">

      <div class="dialog-details">
        <div class="top-container">
          <div>
            <div>视频</div>
            <div id="xgplayer"></div>
          </div>
          <div style="margin-left: 20px;">
            <div>简介:</div>
            <div>{{ currentRowData.description }}</div>
          </div>
        </div>

        <div class="under-container">
          <div>
            <div>封面</div>
            <el-image style="width: 320px; height: 180px" fit="fill" />
          </div>
          <div style="margin-left: 20px;">
            <div>标题: {{ currentRowData.title }}</div>
            <div>播放数量: {{ currentRowData.play_count }}</div>
            <div>视频时间: {{ currentRowData.duration }}</div>
            <div>上传用户: {{ currentRowData.up_user }}</div>
            <div>上传时间: {{ currentRowData.up_date }}</div>
            <div>是否通过审核: {{ currentRowData.check }}</div>
            <div>是否删除: {{ currentRowData.is_delete }}</div>
          </div>

        </div>
      </div>

    </el-dialog>

  </div>
</template>

<style lang="less" scoped>
.video-list {
  .video-condition {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      margin-right: 50px;
    }
  }

  .dialog-details {
    display: flex;
    flex-direction: column;

    .top-container {
      display: flex;
    }

    .under-container {
      display: flex;

    }
  }
}
</style>
