import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Meja() {
    const [meja, setMeja] = useState([])

    useEffect(() => {
        const fecthAllMeja = async () => {
            try {
                const res = await axios.get("http://localhost:8080/meja/")
                console.log(res)
                setMeja(res.data.meja)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllMeja()
    }, [])

    return (
        <div>
            <div className="flex justify-center h-full">
                <div className="relative overflow-x-auto">
                    <table className="w-auto mt-6  text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nomor Meja
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {meja.map((meja, index) => (
                                <tr className="bg-white border-b " data-index={index}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{meja.nomor_meja}</td>
                                    <td className="px-6 py-4 ">{meja.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}