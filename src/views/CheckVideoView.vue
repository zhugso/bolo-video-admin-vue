<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const resBaseUrl = 'http://localhost:9000/bolo/'

const tableData = ref([{}])

const currentRowData = ref({
  videoId: 0,
  title: '',
  description: '',
  duration: 0,
  coverUrl: '',
  videoUrl: '',
  copyright: '',
  userId: '',
  uploadTime: '',
})

const updateCheckVideoList = () => {
  api.get('/admin/getCheckVideoList').then((res) => {
    tableData.value = res.data
    console.log(res)
  })
}

onMounted(() => {
  updateCheckVideoList()
})

const dialogTableVisible = ref(false)
const checkClick = (p) => {
  // 复制数据到currentRowData
  currentRowData.value = p

  // 打开dialog审核对话框
  dialogTableVisible.value = true
}

let player
const dialogOpenHandle = () => {
  player = new Player({
    id: 'xgplayer',
    url: resBaseUrl + currentRowData.value.videoUrl,
    width: '640px',
    height: '360px',
  })
}
const dialogClosehandle = () => {
  player.destroy() // 销毁播放器
  player = null // 将实例引用置空
}

const checkedReasonInput = ref('')
//审核通过
const checkPassBtn = () => {
  api.post('/admin/checkPass/' + currentRowData.value.videoId).then((res) => {
    console.log(res)
    dialogTableVisible.value = false
    updateCheckVideoList()
  })
}
//审核不通过
const checkNotPassBtn = () => {
  const data = {
    videoId: currentRowData.value.videoId,
    reason: checkedReasonInput.value,
  }
  api.post('/admin/checkNotPass', data).then((res) => {
    console.log(res)
    dialogTableVisible.value = false
    updateCheckVideoList()
  })
}
</script>

<template>
  <div class="check-video">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="videoId" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="上传用户id" prop="userId" />
      <el-table-column label="上传时间" prop="uploadTime" />
      <el-table-column label="操作" prop="operation">
        <template #default="props">
          <el-button type="primary" size="small" @click="checkClick(props.row)"> 审核 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogTableVisible"
      title="详细信息"
      width="1000"
      :destroy-on-close="true"
      @open="dialogOpenHandle"
      @close="dialogClosehandle"
    >
      <div class="dialog-details">
        <div class="top-container">
          <div>
            <div>视频</div>
            <div id="xgplayer"></div>
          </div>
          <div style="margin-left: 20px">
            <div>简介:</div>
            <div>{{ currentRowData.description }}</div>
          </div>
        </div>

        <div class="under-container">
          <div>
            <div>封面</div>
            <el-image
              style="width: 320px; height: 180px"
              :src="resBaseUrl + currentRowData.coverUrl"
              fit="fill"
            />
          </div>
          <div class="check-info" style="margin-left: 20px; width: 350px">
            <div>id: {{ currentRowData.videoId }}</div>
            <div>标题: {{ currentRowData.title }}</div>
            <div>视频时间: {{ currentRowData.duration }}</div>
            <div>上传用户: {{ currentRowData.userId }}</div>
            <div>上传时间: {{ currentRowData.uploadTime }}</div>
          </div>
          <div class="check-op" style="margin-left: 20px">
            <el-button type="success" @click="checkPassBtn">通过</el-button>
            <el-input
              v-model="checkedReasonInput"
              style="width: 240px"
              :rows="3"
              type="textarea"
              placeholder="未通过理由"
            />
            <el-button type="danger" @click="checkNotPassBtn">不通过</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.check-video {
  .dialog-details {
    display: flex;
    flex-direction: column;

    .top-container {
      display: flex;
    }

    .under-container {
      display: flex;

      .check-op {
        display: flex;
        flex-direction: column;

        > * {
          margin: 5px;
        }
      }
    }
  }
}
</style>
