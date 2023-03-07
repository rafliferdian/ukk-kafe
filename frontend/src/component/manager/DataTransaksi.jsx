import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DataTransaksi() {
    const [transaksi, setTransaksi] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredTransaksi, setFilteredTransaksi] = useState(null);


    useEffect(() => {
        const fecthDatas = async () => {
            try {
                const response = await axios.get("http://localhost:8080/transaksi/")
                setTransaksi(response.data.transaksi)
            } catch (err) {
                console.log(err)
            }
        }
        fecthDatas()
    }, [])

    const handleRemove = async (id_transaksi) => {
        try {
            await axios.delete("http://localhost:8080/transaksi/" + id_transaksi);
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    }

    function dateFormat(date) {
        const dateObj = new Date(date);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('id-ID', options);
        return formattedDate;
    }

    const filterByDate = (date) => {
        if (date) {
            const filteredData = transaksi.filter((t) => {
                const tgl_transaksi = new Date(t.tgl_transaksi);
                return tgl_transaksi.toDateString() === date.toDateString();
            });
            setFilteredTransaksi(filteredData);
        }
    };

    console.log(filteredTransaksi)
    return (
        <div>
            <div className="mt-5 mx-5 flex">
                <div className="flex p-2 bg-gray-100 rounded-md border shadow-sm">
                    <span className="flex-none">Tgl. Transaksi : </span>
                    <DatePicker className="pl-1 bg-gray-100" selected={selectedDate} onChange={(date) => {
                        setSelectedDate(date);
                        filterByDate(date);
                    }} />
                </div>
                {/* <div>
                    user'
                </div> */}
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nama Kasir</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tanggal Transaksi</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tanggal tes</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Total Harga</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {selectedDate === null || selectedDate === undefined ? (
                            <>
                                {transaksi.map((transaksi) => (
                                    <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                                        <td className="px-6 py-4">{dateFormat(transaksi.tgl_transaksi)}</td>
                                        <td className="px-6 py-4">a</td>
                                        <td className="px-6 py-4">{transaksi.total}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                                    Lunas
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-4">
                                                <button onClick={() => handleRemove(transaksi.id_transaksi)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <>
                            {filteredTransaksi.map((transaksi) => (
                                    <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                                        <td className="px-6 py-4">{dateFormat(transaksi.tgl_transaksi)}</td>
                                        <td className="px-6 py-4">a</td>
                                        <td className="px-6 py-4">{transaksi.total}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                                    Lunas
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-4">
                                                <button onClick={() => handleRemove(transaksi.id_transaksi)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
