<template>
  <div class="booksManager">
    <div class="booksManger-top">
      <el-row>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">修改</el-button>
      </el-row>
    </div>

    <div class="booksManger-body">
      <table class="table table-hover table-bordered table-striped" style="text-align: center">
        <tr class="first-tr">
          <th>ID</th>
          <th>ISBD</th>
          <th>书名</th>
          <th>价格</th>
          <th>作者</th>
          <th>出版社</th>
          <th>类型</th>
        </tr>
              <tr v-for="(item,i) in booksArr" :key="i">
                <td>{{ item.ID }}</td>
                <td>{{ item.ISBN }}</td>
                <td>{{ item.book_name }}</td>
                <td>{{ item.book_price }}</td>
                <td>{{ item.book_author }}</td>
                <td>{{ item.published_house }}</td>
                <td>{{ item.book_category }}</td>
              </tr>
      </table>
    </div>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=pageNum
          :page-sizes="[5, 7]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=booksArrLength>
      </el-pagination>
    </div>


    <div class="join" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID">
          <el-input v-model.trim="id" disabled></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model.trim="isbn"></el-input>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model.trim="bookName"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model.trim="bookPrice"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model.trim="bookAuthor"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model.trim="publishedHouse"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型">
          <el-input v-model.trim="bookCategory"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="addbooks">提交</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="out">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  data() {
    return {
      id: '',
      isbn: '',
      bookName: '',
      bookPrice: 0,
      bookAuthor: '',
      publishedHouse: '',
      bookCategory: 0,
      booksArrLength: 0,
      booksArr:[],
      pageSize:5,
      pageNum:1,

    }
  },
  methods: {
    add() {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";

    },
    out() {
      const join = document.querySelector('.join');
      join.style.visibility = "hidden";
    },
    reset() {
      this.isbn = ''
      this.bookName = ''
      this.bookPrice = ''
      this.bookAuthor = ''
      this.publishedHouse = ''
      this.bookCategory = ''
    },
    /*   每页多少条  */
    handleSizeChange(val) {
      this.pageSize = val
      this.getbooksManagerLimit()
    },
    /*   当前页   */
    handleCurrentChange(val) {
      this.pageNum = val
      this.getbooksManagerLimit()
    },
    /*   增加书籍  */
    addbooks() {
      axios({
        method: 'post',
        url: '/addbooks',
        data: {
          ISBN: this.isbn,
          book_name: '《' + this.bookName + '》',
          book_price: this.bookPrice,
          book_author: this.bookAuthor,
          published_house: this.publishedHouse,
          book_category: this.bookCategory
        }
      }).then((res) => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '书籍添加成功'
          })
        }else  {
          this.$message.error('书籍添加失败，请重试')
        }
      })
    },
    /*  获取书籍的信息  */
    getbooksManager() {
      axios({
        method: 'get',
        url: '/getbooksManager'
      }).then((res) => {
        this.booksArrLength = res.data.data.length

      })
    },
    getbooksManagerLimit(){
      axios({
        method:'get',
        url:'/getbooksManager/limit',
        params:{
          pageSize:this.pageSize,
          pageNum:this.pageNum,
        }
      }).then((res)=>{
        this.booksArr = res.data.data
      })
    }


  },
  created() {
    this.getbooksManager()
    this.getbooksManagerLimit()
  }
}
</script>

<style scoped lang="less">
.booksManager {


  .join {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #cccc;

    .demo-ruleForm {
      position: absolute;
      display: block;
      width: 800px;
      height: 600px;
      left: 50%;
      top: 50%;
      padding: 30px 40px 0 40px;
      background-color: white;
      text-align: center;
      transform: translate(-50%, -50%);
    }
  }

}
</style>