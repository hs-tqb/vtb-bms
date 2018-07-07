<style lang="less">
#filter { 
  margin:20px; 
  .el-input { 
    margin-right:10px; width:300px;
  }
  .el-button {
    width:100px;
  }
}
</style>

<template>
  <div id="page-home" v-loading="!dataReady">
    <div id="filter">
      <!-- <input type="text" placeholder="手机号" v-model="tableData.mobile">
      <input type="text" placeholder="手机/邮箱" v-model="tableData.loginName">
      <input type="button" class="btn primary" value="查询"> -->
      <el-input v-model.trim="tableData.mobile"    placeholder="手机号"></el-input>
      <el-input v-model.trim="tableData.loginName" placeholder="登陆名"></el-input>
      <el-button type="primary" @click="filter">查询</el-button>
      <el-button type="danger" @click="clearFilter">清空</el-button>
      <a style="display:inline-block; margin-left:10px;" href="http://47.89.11.105:8091/vtb/customer/export" target="_blank">
        <el-button type="success">导出</el-button>
      </a>
    </div>
    <el-table
      :data="tableData.rows"
      style="width:100%"
      v-if="dataReady"
      stripe
    >
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="loginName" label="邮箱" width="180"></el-table-column>
      <el-table-column label="余额">
        <template slot-scope="scope">
          {{scope.row.balance}} VTB
        </template>
      </el-table-column>
      <el-table-column label="账号" width="200">
        <template slot-scope="scope">
          <a :href="`https://etherscan.io/address/${scope.row.account}`" target="_blank">
            {{scope.row.account}}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="inviteCode" label="邀请码"></el-table-column>
      <el-table-column prop="inviteFrom" label="邀请人"></el-table-column>
      <el-table-column prop="inviteUp" label="邀请限制"></el-table-column>
      <el-table-column prop="gmtCreate" label="注册时间"></el-table-column>
      <el-table-column prop="state" label="账号状态">
        <template slot-scope="scope">
            <!--{{scope.row.account}}-->
            <span class="text-success" v-if="scope.row.state==1">正常</span>
            <span class="text-failure" v-else>异常</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableData.currentPage"
      :page-size="tableData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataReady:false,
      tableData:{
        api:'customer',
        pageSize:100,
        currentPage:1,
        mobile:'',
        loginName:'',
        total:0,
        rows:[]
      }
    }
  },
  methods: {
    filter() {
      let { mobile, loginName } = this.tableData
      if ( !mobile && !loginName ) return;
      this.loadTableData()
    },
    clearFilter() {
      let { mobile, loginName } = this.tableData
      if ( !mobile && !loginName ) return;
      this.tableData.mobile = ''
      this.tableData.loginName = ''
      this.loadTableData()
    },
    handleSizeChange(len) {
      this.tableData.pageSize = len;
      this.loadTableData();
    },
    handleCurrentChange(idx) {
      this.tableData.currentPage = idx;
      this.loadTableData();
    },
    loadTableData() {
      this.dataReady = false
      let { pageSize,currentPage,mobile, loginName, api } = this.tableData
      this.$http.get(api, { params:{
        pageSize, currentPage, mobile:mobile||undefined, loginName:loginName||undefined
      }})
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;
        this.tableData = { ...this.tableData, ...resp.data, rows:resp.data.result };
      })
      .catch(err=>{ this.dataReady = true })
    }
  },
  mounted() {
    let token = this.$util.getToken();
    this.loadTableData();
  }
}
</script>

