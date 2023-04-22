<template>
  <div class="bookstype">
    <div class="bookstype-top">
      <el-row>
        <el-button type="primary" @click="add">添加</el-button>
      </el-row>
    </div>

    <div class="bookstype-body">
      <table class="table table-hover table-bordered table-striped" style="text-align: center">
        <tr class="first-tr">
          <th style="width: 300px;">ID</th>
          <th style="width: 300px;">类型</th>
          <th style="width: 300px;">数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,i) in pageArr" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.type_max_num }}</td>
          <td>
            <el-row>
              <el-button type="primary">修改</el-button>
              <el-button type="primary">删除</el-button>
            </el-row>
          </td>
        </tr>
      </table>
    </div>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=pageNum
          :page-sizes="[5, 7]"
          :page-size=pagesize
          layout="total, sizes, prev, pager, next, jumper"
          :total=arr.length>
      </el-pagination>
    </div>



    <div class="join" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型">
          <el-input v-model.trim="type"></el-input>
        </el-form-item>
        <el-form-item label="类型数量">
          <el-input v-model.trim="typeCount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="addbookstype">提交</el-button>
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
  props: {},
  data() {
    return {
      type: '',
      typeCount: '',
      arr: [],
      id: 0,
      booksType: '',
      type_max_num: '',
      pagesize:5,
      pageNum:1,
      pageArr:[]
    }
  },
  methods: {
    add() {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";

    },
    out(){
      const join = document.querySelector('.join');
      join.style.visibility = "hidden";
    },
    reset() {
      this.type = '';
      this.typeCount = ''
    },

    /*   每页多少条  */
    handleSizeChange(val) {
      this.pagesize = val
      this.getsqldataList()
    },
    /*   当前页   */
    handleCurrentChange(val) {
      this.pageNum = val
      this.getsqldataList()
    },
    /*   获取图书类型列表  */
    getsqldata() {
      axios.get('/getbookstype').then((res) => {
        this.arr = res.data.data
      })
    },
    /*   获取图书类型列表分页  */
    getsqldataList() {
      axios({
        method:'get',
        url:'/getbookstype/limit',
        params:{
          pageNum:this.pageNum,
          pageSize:this.pagesize
        }
      }).then((res)=>{
        this.pageArr = res.data.data
      })
    },
    /*  添加图书类型  */
    addbookstype() {
      if (this.type === '' || this.typeCount === ''){
        this.$message.error('信息不能为空')
        return
      }
      console.log(this.type+""+this.typeCount)
      axios({
        method:"post",
        url:'/addbookstype',
        data:{
          type:this.type,
          type_max_num:this.typeCount
        },
      }).then((res)=>{
        console.log(res.data)
        if (res.data.status === 0){
          const join = document.querySelector('.join');
          join.style.visibility = "hidden";

          this.$message({
            type:'success',
            message:'添加成功'
          })

          this.getsqldataList()
          this.getsqldata()
        }else {
          this.$message.error('添加失败，请重试')
        }
      })
    }
  },
  created() {
    this.getsqldata()
    this.getsqldataList()
  }
}
</script>

<style scoped lang="less">
.bookstype {
  .bookstype-top {
    height: 50px;

    .el-row {
      height: 100%;
    }
  }

  .bookstype-body {
    table {
      .first-tr {
        th {
          font-size: 22px;
        }
      }

      tr:nth-child(n+2) {
        line-height: 40px;
        font-size: 20px;
      }
    }
  }

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
      width: 600px;
      height: 300px;
      left: 50%;
      top: 50%;
      padding-top: 30px;
      padding-right: 20px;
      background-color: white;
      text-align: center;
      transform: translate(-50%, -50%);
    }
  }
}

</style>