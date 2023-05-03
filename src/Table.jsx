import React, { useState } from 'react';
import classes from './Table.module.css';

const Table = ({ data }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    // if the same column is clicked again, toggle the sort order
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // filter the data based on the search text
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.position.toLowerCase().includes(searchText.toLowerCase()) ||
      item.office.toLowerCase().includes(searchText.toLowerCase()) ||
      item.age === parseInt(searchText) ||
      item.startDate.toLowerCase().includes(searchText.toLowerCase()) ||
      item.salary.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // sort the filtered data based on the sort column and sort order
  const sortedData = sortColumn
    ? filteredData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  // slice the sorted data based on the current page and page size
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // entries data
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, data.length);
  const totalEntries = data.length;
  const showingEntriesText = `Showing ${start} to ${end} of ${totalEntries} entries`;

  const length = Math.ceil(sortedData.length / pageSize);
  const pageNumbers = Array.from({ length }, (_, i) => i + 1);

  return (
    <div>
      <div className={classes.header}>
        <div>
          <span>Show</span>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>entries</span>
        </div>
        <div className={classes.searchBox}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search"
          />
        </div>
      </div>

      <div>
        <table className={classes.table}>
          <thead>
            <tr>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('name')}
              >
                Name
                {sortColumn === 'name' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('position')}
              >
                Position
                {sortColumn === 'position' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('office')}
              >
                Office
                {sortColumn === 'office' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('age')}
              >
                Age
                {sortColumn === 'age' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('startDate')}
              >
                Start Date
                {sortColumn === 'startDate' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th
                className={classes.tableHeading}
                onClick={() => handleSort('salary')}
              >
                Salary
                {sortColumn === 'salary' && (
                  <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className={classes.tableData}>{item.name}</td>
                <td className={classes.tableData}>{item.position}</td>
                <td className={classes.tableData}>{item.office}</td>
                <td className={classes.tableData}>{item.age}</td>
                <td className={classes.tableData}>{item.startDate}</td>
                <td className={classes.tableData}>{item.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.tableFooter}>
        <p>{showingEntriesText}</p>
        <div className={classes.pagination}>
          <button
            className={classes.paginationBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <p className={classes.pageNumberContainer}>
            {pageNumbers.map((item) => (
              <span
                className={classes.pageNumberBtn}
                style={{
                  backgroundColor: item === currentPage ? '#4185F4' : '',
                }}
                key={item}
              >
                {item}
              </span>
            ))}
          </p>
          <button
            className={classes.paginationBtn}
            disabled={currentPage === Math.ceil(sortedData.length / pageSize)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Table;
