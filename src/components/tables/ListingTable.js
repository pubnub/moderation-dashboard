import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Grid,
  TableRow,
  Box,
  Avatar,
  TableSortLabel,
} from "@material-ui/core";
import { useStyles } from "../../style/listingTable";
import Alert from "@material-ui/lab/Alert";
import { capitalizeNameInitials, sliceTableArray, truncateString } from "../../utils/helpers";
import TableIcons from "./TableIcons";
import ListingPagination from "./ListingPagination";
import Markers from "./Markers";

function compare(a, b) {
  if ((!!a && !b) || a > b) {
    return -1;
  }
  if ((!!b && !a) || b > a) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => compare(a[orderBy], b[orderBy])
    : (a, b) => -compare(a[orderBy], b[orderBy]);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ListingTable(props) {
  const headCells = props.headCells;
  const tableData = props.data;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(25);
  const [over, setOver] = React.useState(false);

  React.useEffect(() => {
    setPage(props.number);
  }, [props.number]);

  const handleChangePage = (event, newPage) => {
    if (tableData.length <= rowsPerPage) {
      props.getNewPage(newPage);
    }
    setPage(newPage);
  };

  let tableSlice = sliceTableArray(tableData, page, rowsPerPage);

  function EnhancedTableHead(prop) {
    const { headOrder, headOrderBy, onRequestSort } = prop;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={classes.tablehead}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignment}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={headOrderBy === headCell.id ? headOrder : false}
            >
              <TableSortLabel
                className={classes.headLabel}
                active={headOrderBy === headCell.id}
                direction={headOrderBy === headCell.id ? headOrder : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const avatarStyle = (index) => {
    if (index % 5 === 0) {
      return {
        backgroundColor: "#FFFABB",
        color: "#FFD502",
        borderRadius: "8px",
      };
    } else if (index % 3 === 0) {
      return {
        backgroundColor: "#FCF0EF",
        color: "#E66E68",
        borderRadius: "8px",
      };
    } else if (index % 2 === 0) {
      return {
        backgroundColor: "#CAFFE6",
        color: "#34F89C",
        borderRadius: "8px",
      };
    } else {
      return {
        backgroundColor: "#CAF0FF",
        color: "#3BC8FF",
        borderRadius: "8px",
      };
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <ListingPagination
        tableCount={props.tableCount}
        handleChangePage={handleChangePage}
        page={page}
        tableData={tableData}
        rowsPerPage={rowsPerPage}
      />
      <TableContainer className={classes.tableContainer}>
        <Table
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
          className={classes.table}
        >
          <EnhancedTableHead
            headOrder={order}
            headOrderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
          />
          {(() => {
            if (tableData.length) {
              return (
                <TableBody>
                  {stableSort(tableSlice, getComparator(order, orderBy)).map((row, index) => {
                    return (
                      <TableRow
                        hover={!!props.handleRowClick}
                        className={`
                          ${classes.tableRow}
                          ${!!props.handleRowClick ? classes.tableRowClickable : ""}
                        `}
                        role="checkbox"
                        tabIndex={-1}
                        key={`${row.id}-${index}`}
                        onClick={(event) =>
                          props.handleRowClick && props.handleRowClick(event, row, over)
                        }
                      >
                        {headCells.map((headcell, n) => {
                          if (headcell.avatar) {
                            return (
                              <TableCell
                                key={`${row.id}-${index}-${n}`}
                                align="left"
                                className={classes.tableCell}
                              >
                                <Grid container>
                                  <Box mr={1}>
                                    <Avatar
                                      variant="square"
                                      style={avatarStyle(index)}
                                      src={row.profileUrl}
                                    >
                                      {capitalizeNameInitials(row.name)}
                                    </Avatar>
                                  </Box>
                                  <Box>
                                    <small className={classes.keyName}>{row.name}</small>
                                    <br />
                                    <small className={classes.appName}>
                                      {row.appName || row.uuid || row.id}
                                    </small>
                                  </Box>
                                  <Box ml={1} pt={1}>
                                    <Markers isUser={headcell.user} row={row} />
                                  </Box>
                                </Grid>
                              </TableCell>
                            );
                          } else if (headcell.icons) {
                            return (
                              <TableCell
                                key={`${row.id}-${index}-${n}`}
                                align="left"
                                className={classes.tableCellIcon}
                              >
                                <TableIcons
                                  row={row}
                                  editRow={props.editRow}
                                  deleteRow={props.deleteRow}
                                  viewRow={props.viewRow}
                                  isUser={headcell.user}
                                  flagUser={props.flagUser}
                                  banUser={props.banUser}
                                  unFlagUser={props.unFlagUser}
                                  unbanUser={props.unbanUser}
                                  setOver={setOver}
                                />
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell
                              key={`${row.id}-${index}-${n}`}
                              align="left"
                              className={classes.tableCell}
                            >
                              {truncateString(row[headcell.id], headcell.id)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            } else {
              return props.message ? (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Alert severity={"info"} className={classes.alertMessage}>
                        {props.message}
                      </Alert>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : null;
            }
          })()}
        </Table>
      </TableContainer>
    </div>
  );
}
