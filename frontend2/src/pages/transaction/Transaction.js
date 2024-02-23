import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';

import './style.scss';
import { getTransactionAsync, transactionActions, transactionSelector } from '../../redux/reducer/transactionReducer';


const Transaction = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const searchOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'Nobember' },
    { value: 12, label: 'December' },
  ];
  const { data, month } = useSelector(transactionSelector);

  useEffect(() => {
    dispatch(getTransactionAsync({ searchQuery: search, month, page }))
  }, [dispatch, page, search, month])

  const highlightMatch = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, (match, p1) => `<span style="background-color: red;">${p1}</span>`);
  };


  return (
    <div className='transaction-container'>
      <div className="search-and-select-month">
        <div className="input">
          <input type="text" placeholder='Search transaction' onChange={(e) => setSearch(e.target.value)} />

        </div>
        <div className="selector">
          <Select
            defaultValue={month}
            onChange={(option) => dispatch(transactionActions.setMonth(option))}
            options={searchOptions}
            className="search-select"
            classNamePrefix="search-select-prefix"
            placeholder="Select an option"
            isMulti={false}
            isClearable
            isSearchable={false}
          />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data?.transactions?.map((transaction, i) => (
            <tr key={i}>
              <td>{(page - 1) * 10 + i + 1}</td>
              <td dangerouslySetInnerHTML={{ __html: highlightMatch(transaction.title, search) }} />
              <td dangerouslySetInnerHTML={{ __html: highlightMatch(transaction.description, search) }} />
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Sold' : 'Not Sold'}</td>
              <td><div className="product-image"><img src={transaction.image} alt="" /></div></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />

        {data?.totalPages &&
          Array.from({ length: data?.totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index === data?.currentPage - 1} onClick={() => setPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}

        <Pagination.Next disabled={page === data?.totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </div>
  )
}

export default Transaction