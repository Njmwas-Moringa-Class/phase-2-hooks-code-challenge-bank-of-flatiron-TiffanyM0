import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transaction, setTransaction] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("http://localhost:8001/transactions?q=" + query)
      .then((resp) => resp.json())
      .then(transaction => setTransaction(transaction))
  }, [query])

  const searchT = (e) => setQuery(e.target.value);

  return (
    <div>
      <Search searchT={searchT} />
      <AddTransactionForm />
      <TransactionsList transaction={transaction} />
    </div>
  );
}

export default AccountContainer;
