import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Popover from '@material-ui/core/Popover';
import { Button } from '@material-ui/core';
import Data from './Data';

const columns = [
	{ id: 'id', label: '序号', align: 'center', minWidth: 80 },
	{ id: 'category', label: '分类', minWidth: 80 },
	{ id: 'business', label: '业务', minWidth: 100 },
	{
		id: 'explanation',
		label: '解释',
		minWidth: 170,
		align: 'left',
		format: (value) => value.toLocaleString('zh-CN'),
	},
	{
		id: 'result',
		label: '借',
		minWidth: 170,
		align: 'left',
		format: (value) => value.toLocaleString('zh-CN'),
	},
	{
		id: 'source',
		label: '贷',
		minWidth: 170,
		align: 'left',
		format: (value) => value.toLocaleString('zh-CN'),
	},
];

// function createData (id, category, business, explanation, result, source) {
// 	return { id, category, business, explanation, result, source };
// }

const rows = Data.data;
// [
// 	createData(1, '存货', '购买原材料', '小规模纳税人', '原材料', '银行存款'),
// 	createData(2, '存货', '购买原材料', '一般纳税人，增值税专用发票', '原材料\n应交税费——应交增值税（进项税额）', '银行存款'),
// 	createData(3, '存货', '预付款，未取得商品', '采购用于广告营销活动的特定商品，不作为存货成本', '预付账款', '银行存款'),
// 	createData(4, '存货', '购买原材料', '小规模纳税人', '原材料', '银行存款'),
// 	createData(5, '存货', '购买原材料', '一般纳税人，增值税专用发票', '原材料\n应交税费——应交增值税（进项税额）', '银行存款'),
// 	createData(6, '存货', '预付款，未取得商品', '采购用于广告营销活动的特定商品，不作为存货成本', '预付账款', '银行存款'),
// 	createData(7, '存货', '购买原材料', '小规模纳税人', '原材料', '银行存款'),
// 	createData(8, '存货', '购买原材料', '一般纳税人，增值税专用发票', '原材料\n应交税费——应交增值税（进项税额）', '银行存款'),
// 	createData(9, '存货', '预付款，未取得商品', '采购用于广告营销活动的特定商品，不作为存货成本', '预付账款', '银行存款'),
// ]

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 840,
	},
});

const Content = () => {
	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ searchColumn, setSearchColumn ] = React.useState(null);
	const [ dataRows, setDataRows ] = React.useState(rows);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setSearchColumn(event.currentTarget.getAttribute('columnid'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function submitSearch (event) {
		event.preventDefault();
		const searchContext = event.target.elements[0].value;
		console.log({ searchColumn, searchContext });
		if (searchColumn) {
			setDataRows(
				rows.filter((row) => row[searchColumn].toLocaleString().includes(searchContext.toLocaleString())),
			);
		}
		handleClose();
	}

	const open = Boolean(anchorEl);

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
									<Button columnid={column.id} style={{ minWidth: 15 }} onClick={handleClick}>
										🔍
									</Button>
									<Popover
										id={`${column.id}-search`}
										open={open}
										anchorEl={anchorEl}
										onClose={handleClose}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<form onSubmit={submitSearch}>
											<input />
											<button style={{ minWidth: 20 }}>√</button>
										</form>
									</Popover>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.format && typeof value === 'number' ? (
													column.format(value)
												) : (
													value
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[ 10, 25, 100 ]}
				component="div"
				count={dataRows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Content;
