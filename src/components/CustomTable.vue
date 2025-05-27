<template>
  <div class="custom-table-wrapper" :style="{ height }">
    <table :class="tableClasses" :style="customStyles">
      <caption v-if="caption" v-html="caption"></caption>
      <thead v-if="!headerhidden">
        <tr>
          <th v-if="select"> <input type="checkbox" :aria-label="selectalllabel" @change="toggleSelectAll" /></th>
          <th v-if="expand"> </th>
          <th
            v-for="col in visibleColumns"
            :key="col.id"
            @click="handleSort(col)"
            :class="{ sortable: !sortdisabled }"
          >
            {{ col.label }}
            <span v-if="sortColumn === col.id">
              {{ sortDirection === 'ascending' ? '🔼' : '🔽' }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in paginatedData"
          :key="row[datakey]"
          @click="$emit('rowclick', row)"
          @mouseenter="$emit('rowmouseenter', row)"
          @mouseleave="$emit('rowmouseleave', row)"
          :class="{ selected: isSelected(row), hover: !disablerowhighlightonhover }"
        >
          <td v-if="select">
            <input type="checkbox" :aria-label="selectlabel" :checked="isSelected(row)" @change="toggleRowSelect(row)" />
          </td>
          <td v-if="expand">
            <button @click="toggleExpand(row)" :aria-label="expandtriggerlabel">+</button>
          </td>
          <td v-for="col in visibleColumns" :key="col.id">
            {{ row[col.field] }}
          </td>
        </tr>
        <tr v-if="expand && isExpanded(row)" v-for="row in expandedRows" :key="`expand-${row[datakey]}`">
          <td :colspan="columnSpan">
            <slot name="expanded" :row="row" />
          </td>
        </tr>
      </tbody>

      <tfoot v-if="footer">
        <tr><td :colspan="columnSpan">Footer content here</td></tr>
      </tfoot>
    </table>

    <!-- Pagination -->
    <div v-if="paginationEnabled" class="pagination">
      <button @click="prevPage" :disabled="currentpage <= 1">Previous</button>
      <span>Page {{ currentpage }}</span>
      <button @click="nextPage" :disabled="currentpage >= pageCount">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
defineProps({
  data: Array,
  columns: Array,
  datakey: { type: String, default: 'id' },
  headerhidden: Boolean,
  headersticky: Boolean,
  footer: Boolean,
  footersticky: Boolean,
  caption: String,
  fit: { type: String, default: 'medium' },
  zebrastripes: Boolean,
  outerborderstyle: { type: String, default: 'solid' },
  verticallinestyle: { type: String, default: 'none' },
  horizontallinestyle: { type: String, default: 'solid' },
  disablerowhighlightonhover: Boolean,
  nowrap: Boolean,
  verticalalign: { type: String, default: 'middle' },
  height: { type: String, default: 'auto' },
  disableoverflow: Boolean,
  stateslotheight: { type: String, default: 'auto' },
  customstyles: String,
  disableroundedcorners: Boolean,
  disableplaceholderfooters: Boolean,
  hidecolumns: Array,
  sortdefaultcolumnid: String,
  sortdefaultdirection: { type: String, default: 'ascending' },
  sortdisabled: Boolean,
  sortmanual: Boolean,
  currentpage: { type: Number, default: 1 },
  recordsperpage: { type: Number, default: 20 },
  resetscrollonpagechange: Boolean,
  select: Boolean,
  selected: Array,
  selectalllabel: String,
  selectlabel: String,
  selectrowdisabled: Array,
  selectsticky: Boolean,
  expand: Boolean,
  expandopened: Array,
  expandpadding: { type: String, default: 'default' },
  expandtriggerlabel: String,
  expandsticky: Boolean
})

// Emits
defineEmits([
  'selectchange', 'rowclick', 'rowmouseenter', 'rowmouseleave',
  'rowselected', 'rowdeselected', 'expandchange',
  'rowexpanded', 'rowcollapsed', 'sortchange', 'hidecolumnschange'
])

const selectedRows = ref(new Set())
const expandedRows = ref(new Set())
const sortColumn = ref()
const sortDirection = ref()

const visibleColumns = computed(() => {
  return props.columns.filter(col => !props.hidecolumns.includes(col.id))
})

const columnSpan = computed(() => visibleColumns.value.length + (props.select ? 1 : 0) + (props.expand ? 1 : 0))

const sortedData = computed(() => {
  if (props.sortmanual || props.sortdisabled || !sortColumn.value) return props.data
  return [...props.data].sort((a, b) => {
    const aVal = a[sortColumn.value]
    const bVal = b[sortColumn.value]
    return props.sortdefaultdirection === 'ascending'
      ? aVal > bVal ? 1 : -1
      : bVal > aVal ? 1 : -1
  })
})

const pageCount = computed(() => Math.ceil(props.data.length / props.recordsperpage))

const paginationEnabled = computed(() => props.recordsperpage > 0)

const paginatedData = computed(() => {
  if (!paginationEnabled.value) return sortedData.value
  const start = (props.currentpage - 1) * props.recordsperpage
  return sortedData.value.slice(start, start + props.recordsperpage)
})

function toggleRowSelect(row) {
  if (selectedRows.value.has(row)) {
    selectedRows.value.delete(row)
    emit('rowdeselected', row)
  } else {
    selectedRows.value.add(row)
    emit('rowselected', row)
  }
  emit('selectchange', Array.from(selectedRows.value))
}

function toggleExpand(row) {
  if (expandedRows.value.has(row)) {
    expandedRows.value.delete(row)
    emit('rowcollapsed', row)
  } else {
    expandedRows.value.add(row)
    emit('rowexpanded', row)
  }
  emit('expandchange', Array.from(expandedRows.value))
}

function handleSort(col) {
  if (props.sortdisabled) return
  sortColumn.value = col.id
  sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending'
  emit('sortchange', { column: col.id, direction: sortDirection.value })
}

function isSelected(row) {
  return selectedRows.value.has(row)
}

function isExpanded(row) {
  return expandedRows.value.has(row)
}

function toggleSelectAll() {
  if (selectedRows.value.size === paginatedData.value.length) {
    selectedRows.value.clear()
  } else {
    selectedRows.value = new Set(paginatedData.value)
  }
  emit('selectchange', Array.from(selectedRows.value))
}

function prevPage() {
  if (props.currentpage > 1) emit('update:currentpage', props.currentpage - 1)
}

function nextPage() {
  if (props.currentpage < pageCount.value) emit('update:currentpage', props.currentpage + 1)
}

</script>

<style scoped>
.custom-table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th.sortable {
  cursor: pointer;
}
tr.hover:hover {
  background-color: #f5f5f5;
}
tr.selected {
  background-color: #d0f0ff;
}
</style>
