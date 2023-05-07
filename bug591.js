const vm = new Vue({
  el: '#app',
  data() {
    return {
      search: '',
      filterCondition: '',
      rentData: [],
      rentData_vuetify: {
        headers: [
          {
            text: '',
            align: 'start',
            sortable: false,
            value: 'index',
          },
          { text: '標題', value: 'title' },
          { text: '金額', value: 'price' },
          { text: '樓層', value: 'floor_str' },
          { text: '房型', value: 'room_str' },
          { text: '地區', value: 'section_name' },
          { text: '街道', value: 'street_name' },
          { text: '接洽', value: 'role_name' },
          { text: '標籤', value: 'rent_tag' },
          { text: '更新時間', value: 'refresh_time' },
        ],
      },
      valueItem: ['title', 'price', 'floor_str', 'room_str', 'section_name', 'street_name', 'role_name', 'rent_tag', 'refresh_time'],
    }
  },
  methods: {
    redirect(event, path) {
      if (event.target.className.indexOf('btn-del') > -1) {
        event.stopPropagation()
      } else {
        window.open(path, '_blank')
      }
    },
    removeItem(item) {
      const index = this.rentData.indexOf(item)
      this.rentData.splice(index, 1)
    },
    filterTitieOneItem(str) {
      if (str == '' || str == null) return
      this.rentData = this.rentData.filter((item) => {
        return item.title.indexOf(str) == -1
      })
    },
    filterTitieDoubleItem(opt = ['', '']) {
      this.rentData = this.rentData.filter((item) => {
        return item.title.indexOf(opt[0]) == -1 && item.title.indexOf(opt[1]) == -1
      })
    },
    formatNumber(numberStr) {
      return Number(numberStr.replace(',', ''))
    },
  },
  mounted: async function () {
    await axios('./house.json').then((response) => {
      this.rentData = [...response.data]
    })
    console.log('created', this.rentData)
    this.rentData = this.rentData.filter((item) => {
      return item.title.indexOf('限女') == -1
    })
    this.rentData.map((e, index) => {
      e.rent_tag = e.rent_tag
        .map((tag) => {
          return tag.name
        })
        .join(',\r\n')
      e.index = index
      return e
    })
  },
})
