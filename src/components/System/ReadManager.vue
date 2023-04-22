<template>
  <div class="readManager">
    <div class="readManager-body">
      <table class="table table-hover table-bordered table-striped" style="text-align: center">
        <tr class="first-tr">
          <th>ID</th>
          <th>用户名</th>
          <th>书名</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>状态</th>
        </tr>
        <tr v-for="(item,i) in booksArrList" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.book_name }}</td>
          <td>{{ item.begin_time.split('T')[0] }}</td>
          <td>{{ item.end_time.split('T')[0] }}</td>
          <td>
            <el-button round type="success" v-if="item.stat === 1" @click.prevent>
              未归还
            </el-button>
            <el-button round type="warning" v-else-if="item.stat === 0" @click.prevent>
              已归还
            </el-button>
          </td>
        </tr>
      </table>
    </div>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=pageNum
          :page-sizes="[6, 7]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=10>
      </el-pagination>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      booksArrList: [],
    }
  },
  methods: {
    /*   每页多少条  */
    handleSizeChange(val) {
      this.pageSize = val
      this.getReadMangerLimit()
    },
    /*   当前页   */
    handleCurrentChange(val) {
      this.pageNum = val
      this.getReadMangerLimit()
    },
    getReadMangerLimit() {
      axios({
        method: 'get',
        url: '/getReadmManger/limit',
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then((res) => {
        console.log(res)
        this.booksArrList = res.data.data
        console.log(this.booksArrList)
      })
    }
  },
  created() {
    this.getReadMangerLimit()
  }
}
</script>

<style scoped>
.readManager {

}
</style>