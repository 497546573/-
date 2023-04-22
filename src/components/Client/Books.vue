<template>
  <div class="books">
    <el-row class="books-cards">
      <el-col :span="8" v-for="(item,id) in booksArr" :key="id">
        <el-card :body-style="{ padding: '5px,0,0,20px' }">
          <img src="@/components/book.png" class="image">
          <div style="padding: 14px;" class="mess">
            ID：<span class="id">{{ item.ID }}</span><br>
            <span class="bookname">{{ item.book_name }}</span><br>
            作者：<span class="bookauthor">{{ item.book_author }}</span><br>
            出版社：<span class="pubilsh">{{ item.published_house }}</span><br>
          </div>
          <el-button class="borrow" type="primary" round
                     @click="borrowBook($event)">借阅
          </el-button>
        </el-card>

      </el-col>

    </el-row>


    <div class="join" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID">
          <el-input v-model.trim="bookID" disabled></el-input>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model.trim="bookName" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model.trim="bookAuthor" disabled></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model.trim="bookPublishHouse" disabled></el-input>
        </el-form-item>

        <div class="block">
          <el-date-picker
              v-model="value"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>

        <el-form-item class="borrow-btn">
          <el-button :plain="true" type="primary" @click="finishborrow">借阅</el-button>
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
      bookID: 0,
      bookName: '',
      bookAuthor:'',
      bookPublishHouse:'',
      booksArr:[],
      booksNumber:0,
      userID:0,
      value: ''
    }
  },
  methods: {
    out() {
      const join = document.querySelector('.join');
      join.style.visibility = "hidden";
    },
    getbooksNumber() {
      axios.get('/getbooksManager').then((res) => {
        this.booksArr = res.data.data
        this.booksNumber = res.data.data.length
      })
    },
    borrowBook(e) {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";
      const id = e.currentTarget.previousElementSibling
          .querySelector('.id').innerHTML
      const bookname = e.currentTarget.previousElementSibling
          .querySelector('.bookname').innerHTML
      const bookauthor = e.currentTarget.previousElementSibling
          .querySelector('.bookauthor').innerHTML
      const pubilsh = e.currentTarget.previousElementSibling
          .querySelector('.pubilsh').innerHTML
      this.bookID = id
      this.bookName = bookname
      this.bookAuthor = bookauthor
      this.bookPublishHouse = pubilsh

      axios({
        method: 'get',
        url: '/personal',
        params: {
          user: localStorage.getItem('username')
        }
      }).then((res) => {
        this.userID = res.data.data[0].id
      })


    },
    finishborrow(){
      axios.post('/books/borrowbooks',{
        user_id:this.userID,
        book_id:this.bookID,
        begin_time:this.value[1],
        end_time:this.value[0],
      }).then((res)=>{
        if (res.data.status === 0){
          this.$message({
            type:'success',
            message:'借阅成功'
          })
          this.out()
        }else {
          this.$message.error('借阅失败，请重试')
        }
      })
    }
  },
  created() {
    this.getbooksNumber()
  }
}
</script>

<style scoped lang="less">
.books {
  .books-cards {
    .el-col {
      width: 250px;
      margin: 10px 20px;
    }

    .image {
      width: 120px;
      height: 150px;
    }

    .el-card {
      height: 390px;
      text-align: center;
      position: relative;

    }

    .borrow {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translate(-50%);
    }
  }

  .join {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #cccc;

    .demo-ruleForm {
      position: absolute;
      display: block;
      width: 600px;
      height: 450px;
      left: 50%;
      top: 50%;
      padding-top: 30px;
      padding-right: 20px;
      background-color: white;
      text-align: center;
      transform: translate(-50%, -50%);
      .block .el-date-editor .el-range-separator {
      padding: 0;
    }
    }

    .borrow-btn {
      margin-top: 20px;
    }

  }

}

</style>