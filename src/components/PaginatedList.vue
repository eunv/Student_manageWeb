<template>
  <div>
    <table class="table table-bordered">
      <tr>
        <th>NO</th>
        <th>CLASS</th>
        <th>NAME</th>
        <th>TITLE</th>
        <th>VIEW</th>
      </tr>
      <tr v-for="(post,i) in paginatedData" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ post.student.class }}</td>
        <td>{{ post.student.name }}</td>
        <td>{{ post.title }}</td>
        <td>
          <button class="btn-outline-mdb-color" @click="seePost(post.id)">view</button>
        </td>
      </tr>
    </table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="btn-outline-mdb-color">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn-outline-mdb-color">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginatedList',
  data () {
    return {
      pageNum: 0
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    seePost(value) {
      const self = this
      self.$router.push({name: 'postView', params: {id: value}})
    },
  },
  computed: {
    pageCount () {
      let listLeng = this.posts.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;

      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
      return this.posts.slice(start, end);
    }
  }
}
</script>

<style>
/*table {*/
/*  width: 100%;*/
/*  border-collapse: collapse;*/
/*}*/
/*table th {*/
/*  font-size: 1.2rem;*/
/*}*/
/*table tr {*/
/*  height: 2rem;*/
/*  text-align: center;*/
/*  border-bottom: 1px solid #505050;*/
/*}*/
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>