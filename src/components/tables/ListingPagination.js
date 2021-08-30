import React from "react";
import { TablePagination } from "@material-ui/core";
import { useStyles } from "../../style/listingTable";

export default function ListingPagination(props) {
  const classes = useStyles();
  const tableCount =
    props.tableCount > props.rowsPerPage ? props.tableCount : props.tableData.length;

  return props.tableData.length ? (
    <TablePagination
      className={classes.tablePagination}
      rowsPerPageOptions={[props.rowsPerPage]}
      component="div"
      count={tableCount}
      page={props.page}
      rowsPerPage={props.rowsPerPage}
      onChangePage={props.handleChangePage}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
      backIconButtonProps={{
        color: "primary",
      }}
      nextIconButtonProps={{
        color: "primary",
      }}
    />
  ) : null;
}
