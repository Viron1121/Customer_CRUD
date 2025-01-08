import React from 'react';
import './table.css'; // Import the CSS file
import CreateModal from './Actions/CreateModal'; // Import the CreateModal component
import EditModal from './Actions/EditModal'; // Import the EditModal component
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../api/axios';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getPaginationRowModel, SortingState, getSortedRowModel } from '@tanstack/react-table';
import Swal from 'sweetalert2';


function Table() {
    
    const Laravel_URL = axiosClient.defaults.baseURL //It will changable on .env of client-side
    const [modalShow, setModalShow] = React.useState(false); //Modal Show/Hide of Add Customer
    const [editModalShow, setEditModalShow] = React.useState(false); //Modal Show/Hide of Edit Customer
    const [customerData, setCustomerData] = useState([]); //Customers Data
    const [rowValue, setRowValue] = useState({}); //Row Value of Edit Customer 


    console.log('test', Laravel_URL);
    useEffect(() => {
        axios.get(Laravel_URL+"/customer").then((res) => {
            console.log(res.data);
            setCustomerData(res.data);
        });
      }, []);

      //for Refetch when Customer Added
      const Added = () => {
        axios.get(Laravel_URL+"/customer").then((res) => {
            setCustomerData(res.data);
        });
      };



      //TanStack Query
      const columns = React.useMemo(() => [
        {
            accessorKey: 'FirstName',
            header: 'First Name',
        },
        {
            accessorKey: 'LastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'Email',
            header: 'Email Address',
        },
        {
            accessorKey: 'ContactNumber',
            header: 'Contact Number',
        },
        {
            accessorKey: 'id',
            header: 'ACTION',
            enableSorting: false,
            cell: (info) => (
                <div className='d-flex gap-2 justify-content-center'>
                  <button className='btn btn-sm bg-primary d-flex justify-content-center align-items-center'  >
                  <span class="material-symbols-rounded text-white">
                    visibility
                  </span>
                  </button>

                  <button   
                    className='btn btn-sm bg-primary d-flex justify-content-center align-items-center'  
                    onClick={() => {
                        setEditModalShow(true);
                        setRowValue(info.row.original);
                    }}>
                    <span className="material-symbols-rounded text-white">edit_square</span>
                </button>
                                
                <button 
                    className='btn btn-sm bg-danger d-flex justify-content-center align-items-center'
                    onClick={() => handleDelete(info.row.original.id)}>
                    <span className="material-symbols-rounded text-white">delete</span>
                </button>
                </div>
            )
        }
    ], []);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data: customerData || [],
        columns: columns || [],
        sortDescFirst: true,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            pagination,
            sorting,
        },
        sortingFns: {
            myCustomSortingFn: (rowA, rowB, columnId) => {

                return rowA.original[columnId] > rowB.original[columnId] ? 1 : rowA.original[columnId] < rowB.original[columnId] ? -1 : 0
            },
        },
    });


    //Delete Customer
    const handleDelete = (id) => {
      Swal.fire({
          title: 'Are you sure you want to delete?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Delete!',
          cancelButtonText: 'No, Cancel',
          reverseButtons: true, //Reverse the buttons position
          customClass: {
              confirmButton: "btn fw-bold btn-danger border border-2 border-danger",
              cancelButton: "btn fw-bold border border-2 border-primary text-primary bg-transparent",
          },
          allowOutsideClick: false
      }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(Laravel_URL+`/customer/${id}`)
                  .then(() => {
                      Swal.fire({
                          title: 'Success!',
                          confirmButtonText: 'Okay, got it!',
                          icon: 'success',
                          iconColor: '#0066C8',
                          customClass: {
                              confirmButton: "btn btn-primary",
                          },
                          allowOutsideClick: false
                      });
                      Added(); // To refetch the data
                  })
                  .catch((error) => {
                      console.error("Error deleting brand:", error);
                      Swal.fire(
                          'Error!',
                          'An error occurred while deleting the brand.',
                          'error'
                      );
                  });
          }
      });
  };


  return (
    <div className="table-container">
      <h1 className="table-title">Customer Table</h1>
        <button className='btn btn-primary float-end mt-2 mb-5' onClick={() => setModalShow(true)}>Add Customer</button>

        {/* Modal of Add Customer */}
        <CreateModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            Added={Added} //Passing the Added function to CreateModal props
        />

        {/* Modal of Edit Customer */}
        <EditModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            Added={Added} //Passing the Added function to EditModal props
            rowValue={rowValue} //Passing the Row Value to EditModal props
        />
       <table className="styled-table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="fw-bold fs-6 text-gray-800" style={{ backgroundColor: "#F5F8FA" }}>
            {headerGroup.headers.map((header, index) => (
              <th className={` text-center `} 
                  key={header.id}>
                <div>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span className="material-symbols-rounded cursor-pointer Sort-arrow" onClick={header.column.getToggleSortingHandler()}>
                      {header.column.getIsSorted() === 'asc' ? 'expand_less' : 'expand_more'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <td key={cell.id} className={`p-3 align-content-center fs-6 fw-semibold text-center`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Table;
