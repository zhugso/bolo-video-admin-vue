<script setup>
import { ref } from 'vue'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
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
    url: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4',
    width: '640px',
    height: '360px',
  });
}
const dialogClosehandle = () => {
  player.destroy() // 销毁播放器
  player = null // 将实例引用置空
}

const checkedReasonInput = ref('')
//
const checkPassBtn = () => {
  console.log(currentRowData.value.id);

}
const checkNotPassBtn = () => {
  console.log(currentRowData.value.id);

}
</script>

<template>
  <div class="check-video">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="上传用户" prop="up_user" />
      <el-table-column label="上传时间" prop="up_date" />
      <el-table-column label="操作" prop="operation">
        <template #default="props">
          <el-button type="primary" size="small" @click="checkClick(props.row)">
            审核
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
          <div class="check-info" style="margin-left: 20px; width: 350px;">
            <div>id: {{ currentRowData.id }}</div>
            <div>标题: {{ currentRowData.title }}</div>
            <div>视频时间: {{ currentRowData.duration }}</div>
            <div>上传用户: {{ currentRowData.up_user }}</div>
            <div>上传时间: {{ currentRowData.up_date }}</div>
          </div>
          <div class="check-op" style="margin-left: 20px;">
            <el-button type="success" @click="checkPassBtn">通过</el-button>
            <el-input v-model="checkedReasonInput" style="width: 240px" :rows="3" type="textarea" placeholder="未通过理由" />
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

        >* {
          margin: 5px;
        }
      }
    }
  }
}
</style>
