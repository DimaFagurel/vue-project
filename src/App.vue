<template>
  <div id="app">
    <div class="wrapper">

      <main class="main">
        <div class="container">
          <div class="content">
            <div class="main_content-input">
              <b-form-input v-model="text" placeholder="Search..."></b-form-input>
            </div>
            <div class="main_content-table">
              <b-table striped hover :items="displayedPackages" :fields="fields" id="packagesTable">
                <template #cell(action)="row">
                  <b-button size="sm" @click="getPackageDetail(row.item, row.index, $event.target)" class="mr-1">
                    Info modal
                  </b-button>
                </template>

              </b-table>

              <b-pagination
                      v-model="page"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      aria-controls="packagesTable"
              ></b-pagination>

              <b-modal :id="packageDetail.id" :title="packageDetail.title" ok-only @hide="resetPackageDetail">
                <pre class="package-detail">{{ packageDetail.content }}</pre>
              </b-modal>

            </div>
          </div>
        </div>
      </main>
    </div>
    <footer>
      <FooterSocial></FooterSocial>
    </footer>
  </div>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState(['packages']),
    ...mapState(['currentPackage']),
    displayedPackages () {
      return this.paginate(this.packages);
    }
  },
  created() {
    this.$store.dispatch('loadPackages');
  },
  methods: {
    setRows () {
      this.totalRows = this.packages.length;
    },
    paginate (packages) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  packages.slice(from, to);
    },
    getPackageDetail(row, index, target){
      this.$store.dispatch('loadPackageDetail', row).then(() => {
        this.packageDetail.title = `Package: ${row['type']}/${row['name']}`
        this.packageDetail.content = JSON.stringify(
                Object.keys(this.currentPackage.versions).map(version => ({
                  version,
                  downloads: this.currentPackage.versions[version].total})
                )
                , null, 2);
        this.$root.$emit('bv::show::modal', this.packageDetail.id, target)

      });
    },
    resetPackageDetail() {
      this.packageDetail.title = '';
      this.packageDetail.content = null;
    }
  },
  watch: {
    packages () {
      this.setRows();
    }
  },
  data() {
    return {
      text:'',
      fields: ['type', 'name', 'action'],
      page: 1,
      perPage: 10,
      totalRows: 0,
      packageDetail: {
        id: 'info-modal',
        title: '',
        content: null,
      },
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.main{
  flex: 1 0 auto;

  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgb(0 0 0 / 10%), inset 0 0.125em 0.5em rgb(0 0 0 / 15%);


}

.container{
  max-width: 1000px;
  min-width: 400px;
}

div.modal-body {
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
}

/*pre.package-detail {*/

/*}*/


</style>
