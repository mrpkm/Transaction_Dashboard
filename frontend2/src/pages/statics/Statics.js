import React, { useEffect } from 'react'
import { getStaticsAsync, transactionSelector } from '../../redux/reducer/transactionReducer';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

const Statics = () => {
  const dispatch = useDispatch();
  const { statics, month } = useSelector(transactionSelector);
  useEffect(() => {
    dispatch(getStaticsAsync({ month }))
  }, [dispatch, month])
  // console.log(statics);
  return (
    <div className='statics-container'>
      <div className="title">
        Statics-{month?.label}
      </div>
      <div className="total-sale">
        <span>Total sale</span> {parseInt(isNaN(statics?.totalSoldPrice) ? 0 : statics?.totalSoldPrice)}
      </div>
      <div className="total-sale">
        <span>Total sold item</span> {!statics?.soldItemsCount ? 0 : statics?.soldItemsCount}
      </div>
      <div className="total-sale">
        <span>Total not sold item</span> {!statics?.notSoldItemsCount ? 0 : statics?.notSoldItemsCount}
      </div>
    </div>
  )
}

export default Statics