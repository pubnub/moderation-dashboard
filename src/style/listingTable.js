import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  tableRow: {
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    cursor: 'pointer',
    margin: '10px',
    // boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    border: '15px solid #fafafa',
    opacity: 1,
    '& button': {
      display: 'none',
    },
    '&:hover': {
      '& button': {
        display: 'inline-block',
      },
    },
    minHeight: '80px',
  },
  tablehead: {
    '& .MuiTableHead-root': {
      // backgroundColor:"#fafafa",
      // backgroundColor:"grey"
    },
    '& .MuiTableRow-root': {
      backgroundColor: '#fafafa',
      borderBottom: '0px solid white',
    },
    '& .MuiTableCell-head': {
      minWidth: '180px',
    },
  },

  headLabel: {
    fontSize: '11px',
    fontWeight: '600',
  },
  keyName: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-20)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-proxima-nova)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'left',
    color: '#414141',
    opacity: '1',
  },
  appName: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-proxima-nova)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'left',
    fontSize: '12px',
    // font: "normal normal normal 16px/19px Proxima Nova",
    // letterSpacing: "0px",
    color: '#C2C2C2',
    opacity: 1,
  },
  icons: {
    padding: '0px',
  },
  table: {
    scrollbarWidth: 'none',
    overflow: 'auto',
    overflowX: 'hidden',
  },
  alertMessage: {
    background: 'transparent',
  },
  tableCellIcon: {
    width: '220px',
  },
  tablePagination: {
    '& .MuiTablePagination-actions': {
      background: '#E7EDFF 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: 1,
    },
  },
});
