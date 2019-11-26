<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用 " value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">
              {{scope.row.status==1?'禁用':'启用'}}
            </el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSize"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input type="textarea" :row="2" v-model="addForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* 导入接口方法 */
import { subject } from "../../../api/api.js";
export default {
  name: "subject",
  data() {
    return {
      //筛选的表格
      formInline: [],
      //表格数据
      tableData: [],
      //页码
      page: 1,
      //页容量
      limit: 10,
      //页面数组
      pageSize: [5, 10, 15, 20],
      //总条数
      total: 0,

      /* 新增表单数据 */
      addForm: {},
      //新增表单是否显示
      dialogFormVisible: false,
      //表单左边文字lable的宽度 不设置的话不能再同一行
      formLabelWidth: "100px",
      //表单验证规则
      rules: {
        rid: [{ required: true, message: "学科编号不能为空" }],
        name: [{ required: true, message: "学科名称不能为空" }]
      }
    };
  },
  //生命接口  data创建了
  created() {
    //1.axios方法使用
    subject
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        //成功回调
        window.console.log(res);
        //赋值给table
        this.tableData = res.data.data.items;
        // 保存 总条数
        this.total = res.data.data.pagination.total;
      });
  },
  methods: {
    getList() {
      //数据请求
      subject
        .list({
          page: this.page,
          limit: this.limit,
          ...this.formInline
        })
        .then(res => {
          //成功回调
          window.console.log(res);

          //赋值给table
          this.tableData = res.data.data.items;
          //保存总条数的值
          this.total = res.data.data.pagination.total;
        });
    },
    search() {
      //1.axios方法使用
      this.page = 1;
      this.getList();
    },
    //页容量改变
    handleSizeChange(size) {
      this.page = 1;
      this.limit = size;
      this.getList();
    },
    //页码改变
    handleCurrentChange(current) {
      this.page = current;
      this.getList();
    },
    //提交新增表单
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //新增成功
          //调用接口
          //1.axios方法使用
          subject.add(this.addForm).then(res => {
            //成功回调
            window.console.log(res);

            if (res.data.code == 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.data.message);
              // 重新获取一次
              this.getList();
            }
          });
        } else {
          //失败
          this.$message.warning("小老弟");
          return false;
        }
      });
    },
    //点击删除事件
    remove(data) {
      window.console.log(data);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subject
            .remove({
              id: data.id
            })
            .then(res => {
              //成功回调
              window.console.log(res);
              if(res.data.code==200){
                this.$message.success(res.data.message)
                this.getList()
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      //1.axios方法使用
    },
    //启用禁用切换
    status(data){
      //1.axios方法使用
      subject.status({
        id:data.id,
        status:data.status==1?0:1
      }).then(res=>{
        //成功回调
        // window.console.log(res)
        if(res.data.code==200){
          this.$message.success(res.data.message);
          this.getList()
        }
      });
    }
  }
};
</script>

<style lang="less">
.subject-container {
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }

  // 分页器的样式
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card {
    margin-top: 20px;
    .red {
      color: red;
    }
  }
}
/* 新增对话框 */
.el-dialog {
  height: 510px;
  .el-dialog__header {
    background: linear-gradient(360deg, blue, skyblue, yellow, pink);
    text-align: center;
    line-height: 30px;
    .el-dialog__title {
      color: white;
      font-weight: bold;
    }
  }
  .el-input__inner {
    width: 100%;
  }
}
</style>
