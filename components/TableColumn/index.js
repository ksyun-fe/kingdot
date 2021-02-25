import TableColumn from "../Table/TableColumn";
import Table from "../Table/table";

TableColumn.install = (Vue) => {
    Vue.component(TableColumn.name, TableColumn);
};

export default TableColumn;