"use client";

import { useState } from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";

const NavWithHoverMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex gap-6 p-4 bg-white shadow-md">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    className="text-lg font-medium hover:text-blue-600 transition"
                >
                    الملابس
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="w-64 p-4 bg-white shadow-lg rounded-lg"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className="hover:text-blue-600">تيشيرتات</a>
                        <a href="#" className="hover:text-blue-600">فساتين</a>
                        <a href="#" className="hover:text-blue-600">جينز</a>
                        <a href="#" className="hover:text-blue-600">أحذية</a>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};

export default NavWithHoverMenu;
