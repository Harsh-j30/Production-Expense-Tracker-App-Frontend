import React from 'react'
import {Progress} from 'antd'


const Analytics = ({allTransection}) => {

    const categories =['salary','food','medical','movie','bills','fees','other']
    const totalTransection = allTransection.length;
    const totalIncomeTransection = allTransection.filter(transection => transection.type === 'income')
    const totalExpenseTransection = allTransection.filter(transection => transection.type === 'expense')
    const totalIncomePercent =( totalIncomeTransection.length/totalTransection)*100;
    const totalExpensePercent =(totalExpenseTransection.length/totalTransection)*100;

    //total turnover 
    const totalTurnover = allTransection.reduce(
        (acc,transection) => acc + transection.amount,0
    );

    const totalIncomeTurnover = allTransection.filter(
        (transection)=> transection.type === "income"
    ).reduce((acc,transection)=> acc+transection.amount,0)

    const totalExpenseTurnover = allTransection.filter(
        (transection)=> transection.type === "expense"
    ).reduce((acc,transection)=> acc+transection.amount,0)

    const totalIncomeTurnoverPercent= (totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercent =(totalExpenseTurnover/totalTurnover)*100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Total Transections : {totalTransection}
                </div>
                <div className="card-body">
                    <h5 className='text-success'>Income : {totalIncomeTransection.length}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTransection.length}</h5>
                    <div>
                        <Progress type="circle" strokeColor={'green'} className="max-2" percent={totalIncomePercent.toFixed(0)} />
                        <Progress type="circle" strokeColor={'red'} className="max-2" percent={totalExpensePercent.toFixed(0)} />
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Total Turnover : {totalTurnover}
                </div>
                <div className="card-body">
                    <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                    <div>
                        <Progress type="circle" strokeColor={'green'} className="max-2" percent={totalIncomeTurnoverPercent.toFixed(0)} />
                        <Progress type="circle" strokeColor={'red'} className="max-2" percent={totalExpenseTurnoverPercent.toFixed(0)} />
                    </div>
                </div>
            </div>
        </div>
      </div>
        <div className="row mt-3">
            <div className="col-md-4">
                <h4>CategoryWise Income</h4>
                {
                    categories.map(category=>{
                        const amount = allTransection.filter(transection => transection.type ==='income' && transection.category === category).reduce((acc,transection)=> acc+transection.amount,0)
                  
                        return(
                            amount >0 &&(
                                <div className='card'>
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/ totalIncomeTurnover)*100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
            <div className="col-md-4">
                <h4>CategoryWise Expense</h4>
                {
                    categories.map(category=>{
                        const amount = allTransection.filter(transection => transection.type ==='expense' && transection.category === category).reduce((acc,transection)=> acc+transection.amount,0)
                  
                        return(
                            amount >0 &&(
                                <div className='card'>
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/ totalExpenseTurnover)*100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
        </div>
    
        
    </>
  )
}

export default Analytics








// import React from "react";
// import { Progress, Divider } from "antd";

// const Analytics = ({ allTransection }) => {
//   const categories = ["salary", "food", "medical", "movie", "bills", "fees", "other"];

//   const totalTransection = allTransection.length;

//   const incomeTx = allTransection.filter(t => t.type === "income");
//   const expenseTx = allTransection.filter(t => t.type === "expense");

//   const totalIncome = incomeTx.reduce((acc, t) => acc + t.amount, 0);
//   const totalExpense = expenseTx.reduce((acc, t) => acc + t.amount, 0);
//   const totalTurnover = totalIncome + totalExpense;

//   const incomePercent = totalTurnover ? ((totalIncome / totalTurnover) * 100).toFixed(0) : 0;
//   const expensePercent = totalTurnover ? ((totalExpense / totalTurnover) * 100).toFixed(0) : 0;

//   return (
//     <>
//       {/* SUMMARY */}
//       <div className="row m-2">
//         {/* TRANSACTIONS */}
//         <div className="col-md-6 mb-2">
//           <div className="card shadow-sm">
//             <div className="card-header py-2 fw-bold">Total Transactions</div>
//             <div className="card-body py-2 px-3 text-center">
//               <h5 className="mb-2">{totalTransection}</h5>

//               <div className="d-flex justify-content-evenly align-items-center">
//                 <Progress
//                   type="circle"
//                   width={90}
//                   percent={((incomeTx.length / totalTransection) * 100 || 0).toFixed(0)}
//                   strokeColor="green"
//                 />
//                 <Progress
//                   type="circle"
//                   width={90}
//                   percent={((expenseTx.length / totalTransection) * 100 || 0).toFixed(0)}
//                   strokeColor="red"
//                 />
//               </div>

//               <div className="d-flex justify-content-evenly mt-1">
//                 <span className="text-success small">Income</span>
//                 <span className="text-danger small">Expense</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* TURNOVER */}
//         <div className="col-md-6 mb-2">
//           <div className="card shadow-sm">
//             <div className="card-header py-2 fw-bold">Total Turnover</div>
//             <div className="card-body py-2 px-3 text-center">
//               <h5 className="mb-2">₹ {totalTurnover}</h5>

//               <div className="d-flex justify-content-evenly align-items-center">
//                 <Progress type="circle" width={90} percent={incomePercent} strokeColor="green" />
//                 <Progress type="circle" width={90} percent={expensePercent} strokeColor="red" />
//               </div>

//               <div className="d-flex justify-content-evenly mt-1">
//                 <span className="text-success small">Income</span>
//                 <span className="text-danger small">Expense</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Divider className="my-2" />

//       {/* CATEGORY */}
//       <div className="row m-2">
//         {/* INCOME */}
//         <div className="col-md-6">
//           <h6 className="mb-2">Category Wise Income</h6>
//           {categories.map(category => {
//             const amount = incomeTx
//               .filter(t => t.category === category)
//               .reduce((acc, t) => acc + t.amount, 0);

//             return (
//               amount > 0 && (
//                 <div className="card mb-1 shadow-sm" key={category}>
//                   <div className="card-body py-2 px-3">
//                     <div className="d-flex justify-content-between small fw-bold">
//                       <span className="text-capitalize">{category}</span>
//                       <span>₹ {amount}</span>
//                     </div>
//                     <Progress
//                       percent={((amount / totalIncome) * 100).toFixed(0)}
//                       size="small"
//                     />
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>

//         {/* EXPENSE */}
//         <div className="col-md-6">
//           <h6 className="mb-2">Category Wise Expense</h6>
//           {categories.map(category => {
//             const amount = expenseTx
//               .filter(t => t.category === category)
//               .reduce((acc, t) => acc + t.amount, 0);

//             return (
//               amount > 0 && (
//                 <div className="card mb-1 shadow-sm" key={category}>
//                   <div className="card-body py-2 px-3">
//                     <div className="d-flex justify-content-between small fw-bold">
//                       <span className="text-capitalize">{category}</span>
//                       <span>₹ {amount}</span>
//                     </div>
//                     <Progress
//                       percent={((amount / totalExpense) * 100).toFixed(0)}
//                       size="small"
//                     />
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Analytics;
