import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import Logo from "../image/images.jpeg"
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaSitemap  } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import { BsTable } from "react-icons/bs";
import { HiDocumentReport } from 'react-icons/hi'
import { IoMdTrain } from 'react-icons/io';
import { MdManageAccounts,MdAltRoute  } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TfiAnnouncement } from "react-icons/tfi";
import { FaListUl } from "react-icons/fa";

const MaterialSideBar = () => {
    const [open, setOpen] = useState(0);
    // const [show, setShow] = useState(false);

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
            'title': 'Station Account',
            'icon': MdManageAccounts,
            'link': '/station-account',
            accordion: [
            ]
        },
        {
            'title': 'Station',
            'icon': ImOffice,
            'link': '/station',
            accordion: [
            ]
        },
        {
            'title': 'Lane',
            'icon': MdAltRoute ,
            'link': '/lane',
            accordion: []
        },
        {
            'title': 'Train',
            'icon': IoMdTrain,
            'link': '/train',
            accordion: []
        },
        {
            'title': 'Station Time',
            'icon': BsTable ,
            'link': '/time-duration',
            accordion: []
        },
        {
            'title': 'Station Time List',
            'icon': FaListUl ,
            'link': '/time-duration-all',
            accordion: []
        },
        {
            'title': 'Express Time Table',
            'icon': BsTable ,
            'link': '/time-table',
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
            'title': 'Announcement',
            'icon': HiDocumentReport,
            'link': '/marquee',
            accordion: []
        },
        {
            'title': 'Manage Announcement',
            'icon': HiDocumentReport,
            'link': '/actionMarquee',
            accordion: []
        },
        {
            'title': 'Advertising',
            'icon': TfiAnnouncement,
            'link': '/ads-manager',
            accordion: []
        },
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
            'title': 'Logout',
            'icon': PowerIcon,
            'link': '/logout',
            accordion: []
        }
    ];

    return (
        <div className="w-12 md:w-[250px] md:block h-full font-poppins z-30">
            <Card className="w-full h-full max-w-[20rem] shadow-xl shadow-white-900/5 bg-[#1b2c3e]">
                <List className="text-white">
                    <ListItem className="p-3 group">
                        <ListItemPrefix>
                           <img src={Logo} alt={"logo"} className="w-10 h-10 rounded-full"/>
                        </ListItemPrefix>
                        <Typography color="white" className='mr-auto font-poppins font-normal text-xl group-hover:text-[#1b2c3e]'>
                            PIS Admin
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