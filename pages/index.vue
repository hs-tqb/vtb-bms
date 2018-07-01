<style lang="less">
</style>

<template>
  <div id="page-home" v-loading="!dataReady">
    <el-table
      :data="tableData.rows"
      style="width:100%"
      v-if="dataReady"
      stripe
    >
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="id" label="账户id"></el-table-column>
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
        total:0,
        rows:[]
      }
    }
  },
  methods: {
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
      let { pageSize,currentPage,api } = this.tableData
      this.$http.get(api, { params:{
        pageSize, currentPage
      }})
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;

        // console.log(  resp.data.result[0] )

        let rows = resp.data.result;


        this.tableData = { ...resp.data, rows };
      })
      .catch(err=>{ this.dataReady = true })
    }
  },
  mounted() {
    let token = this.$util.getToken();
    console.log('token ', token)
    this.loadTableData();
  }
}
</script>

