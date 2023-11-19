import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaUserTie, FaUser, FaSitemap, FaUserSecret } from "react-icons/fa";
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { HiDocumentReport } from 'react-icons/hi'
import { SiUnilever } from 'react-icons/si'
import { IoIosCopy, IoLogoUsd, IoMdTrain } from 'react-icons/io';
import { Link, location } from 'react-router-dom';


const MaterialSideBar = () => {
    const [open, setOpen] = useState(0);
    const [show, setShow] = useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const menuList = [
        {
            'title': 'Dashboard',
            'icon': PresentationChartBarIcon,
            'link': '/dashboard',
            accordion: []
        },
        {
            'title': 'Train',
            'icon': IoMdTrain,
            'link': '/train',
            accordion: []
        },
        {
            'title': 'Station',
            'icon': IoIosCopy,
            'link': '/station',
            accordion: [
            ]
        },
        {
            'title': 'Category',
            'icon': BiCategoryAlt,
            'link': '/category',
            accordion: []
        },
        {
            'title': 'Message',
            'icon': FaSitemap,
            'link': '/message',
            accordion: [
            ]
        },
        {
            'title': 'Marquee',
            'icon': HiDocumentReport,
            'link': '/marquee',
            accordion: []
        },
        {
            'title': 'Action Marquee',
            'icon': HiDocumentReport,
            'link': '/actionMarquee',
            accordion: []
        },
        // {
        //     'title': 'Unit',
        //     'icon': SiUnilever,
        //     'link': '/unit',
        //     accordion: []
        // },
        // {
        //     'title': 'User',
        //     'icon': FaUserSecret,
        //     'link': '/users',
        //     accordion: [
        //         {
        //             name: "Add New User",
        //             link: "/addUser",
        //         },
        //         {
        //             name: "User List",
        //             link: "/user",
        //         }
        //     ]
        // },
        {
            'title': 'Setting',
            'icon': Cog6ToothIcon,
            'link': '/setting',
            accordion: []
        },
        {
            'title': 'Logout',
            'icon': PowerIcon,
            'link': '/logout',
            accordion: []
        }
    ];

    return (
        <div className="w-12 md:w-80 md:block hidden h-full p-4 font-poppins z-30">
            <Card className="w-full h-full max-w-[20rem] shadow-xl shadow-white-900/5 bg-[#1b2c3e]">
                <List className="text-white">
                    <ListItem className="p-3 group">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5 group-hover:text-[#1b2c3e]" color="white" />
                        </ListItemPrefix>
                        <Typography color="white" className='mr-auto font-normal text-xl group-hover:text-[#1b2c3e]'>
                            SDS Admin
                        </Typography>
                    </ListItem>
                    <hr className="my-2 border-white-50" />

                    {menuList.map((menu, i) => (
                        <div key={uuidv4()}>
                            {menu.accordion.length == 0 ?
                                <Link to={menu.link} key={uuidv4()}>
                                    <ListItem className="border-b-0 p-3 group" selected={open === i + 1} key={uuidv4()}>
                                        <ListItemPrefix key={uuidv4()}>
                                            <menu.icon className="h-5 w-5 group-hover:text-[#1b2c3e]" color="white" />
                                        </ListItemPrefix>
                                        <Typography color="white" className='mr-auto font-normal text-sm group-hover:text-[#1b2c3e]' key={uuidv4()}>
                                            {menu.title}
                                        </Typography>
                                    </ListItem>
                                </Link>
                                :
                                <Accordion
                                    key={uuidv4()}
                                    open={open === i + 1}
                                    icon={
                                        <ChevronDownIcon key={uuidv4()}
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === i + 1 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0 group" selected={open === i + 1} key={uuidv4()}>
                                        <AccordionHeader onClick={() => handleOpen(i + 1)} className="border-b-0 p-3 group" key={uuidv4()}>
                                            <ListItemPrefix key={uuidv4()}>
                                                <menu.icon className="h-5 w-5 group-hover:text-[#1b2c3e]" color="white" key={uuidv4()} />
                                            </ListItemPrefix>
                                            <Typography color="white" className='mr-auto font-normal text-sm group-hover:text-[#1b2c3e]' key={uuidv4()}>
                                                {menu.title}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className={open == i + 1 ? "block py-1 text-white" : "hidden"} key={uuidv4()}>
                                        <List className="p-0" key={uuidv4()}>
                                            {
                                                menu.accordion.map((accor, j) => (
                                                    <Link to={accor.link} key={uuidv4()}>
                                                        <ListItem className="text-white text-sm group" key={uuidv4()}>
                                                            <ListItemPrefix key={uuidv4()}>
                                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5 group-hover:text-[#1b2c3e]" key={uuidv4()} />
                                                            </ListItemPrefix>
                                                            {accor.name}
                                                        </ListItem>
                                                    </Link>
                                                ))
                                            }


                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            }
                        </div>
                    ))
                    }

                </List>
            </Card>
        </div>
    );
}

export default MaterialSideBar