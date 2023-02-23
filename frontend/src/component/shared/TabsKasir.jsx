import React from "react";
import { HiOutlineSearch } from 'react-icons/hi';
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { TABS_LINK } from "../../lib/constants/tabs";

const linkClass = 'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-blue-200'

export default function TabsKasir() {
    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex flex-wrap text-sm font-medium text-center ">
                {TABS_LINK.map((item) => (
                    <TabsLink key={item.key} item={item} />
                ))}
            </div>
        </div>
    )
}

function TabsLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-600' : 'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-blue-200', linkClass)}>
            {item.label}
        </Link>
    )
}