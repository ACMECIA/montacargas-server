import React from "react";
import {
  HiOutlineChatAlt,
  HiOutlineSearch,
  HiOutlineBell,
} from "react-icons/hi";
import { Popover, Menu } from "@headlessui/react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Clock from "../utils/Clock";
import { BiSolidUser } from "react-icons/bi";
import { GoAlert } from "react-icons/go";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-komatsu-gray h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div>
        <Clock />
      </div>

      <div className="flex items-center gap-2 mr-2">
        {/* <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 rounded-sm inline-flex item-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 rounded-sm inline-flex item-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is Notifications panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover> */}

        <div className="flex items-center gap-2 mr-10 myBlink">
          <GoAlert fontSize={50} className="text-red-600" />
          <span className="text-red-600">Mantenimiento</span>
        </div>

        {/* <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <BiSolidUser fontSize={30} />
                <span className="sr-only"> User </span>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="ring-black ring-opacity-5 origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-100",
                        "cursor-pointer text-gray-700 focus:bg-gray-200 rounded-sm px-4 py-2"
                      )}
                      onClick={() => navigate("/profile")}
                    >
                      Your profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-100",
                        "cursor-pointer text-gray-700 focus:bg-gray-200 rounded-sm px-4 py-2"
                      )}
                      onClick={() => navigate("/settings")}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-100",
                        "cursor-pointer text-gray-700 focus:bg-gray-200 rounded-sm px-4 py-2"
                      )}
                      onClick={() => navigate("/logout")}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}
      </div>
    </div>
  );
}
