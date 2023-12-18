import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transaction }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(""); 
  const [originalTransactions, setOriginalTransactions] = useState([]); // Highlighted change
  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    setOriginalTransactions([...transaction]);
    setSortedTransactions([...transaction]);
  }, [transaction]);

  const sortBy = (header) => {
    const sorted = [...originalTransactions].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[header].localeCompare(b[header], undefined, {
          numeric: true,
        });
      } else {
        return b[header].localeCompare(a[header], undefined, {
          numeric: true,
        });
      }
    });

    setSortedTransactions(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (header) => {
    if (sortColumn === header) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(header);
      setSortOrder("asc"); 
    }

    if (header) {
      sortBy(header);
    } else {
      setSortedTransactions([...originalTransactions]); // Highlighted change
    }
  };

  const table = sortedTransactions.map((item) => {
    return (
      <Transaction
        key={item.id}
        date={item.date}
        description={item.description}
        category={item.category}
        amount={item.amount}
      />
    );
  });

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortColumn}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="">--select---</option>
        <option value="description">Description</option>
        <option value="category">Category</option>
      </select>

      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {table}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
