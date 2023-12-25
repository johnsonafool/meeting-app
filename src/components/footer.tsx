"use client";

import { cn } from "@/lib/utils";
import { joinState } from "@/store/join-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Figma as UserCircleIcon } from "lucide-react";
import { Figma as Cog6ToothIcon } from "lucide-react";
import { Figma as InboxArrowDownIcon } from "lucide-react";
import { Figma as LifebuoyIcon } from "lucide-react";
import { Figma as PowerIcon } from "lucide-react";
import { StreamingStartModal } from "./modals/streaming-start-modal";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

export const Footer = () => {
  const { isJoined } = useRecoilValue(joinState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 w-full">
      <div
        className={cn(
          "mx-auto p-2 transition-all duration-300 h-[47rem] max-w-md rounded-3xl",
          isJoined && "h-14 max-w-sm rounded-full pl-6"
        )}
      >
        {isJoined ? <JoinedMenu /> : <StartedMenu />}
      </div>
    </div>
  );
};

const StartedMenu = () => {
  return (
    <div className="ga relative mx-auto flex w-full flex-col gap-4 p-4 text-blue-gray-800">
      <StreamingStartModal />
    </div>
  );
};

const JoinedMenu = () => {
  return (
    <div className="relative mx-auto flex items-center text-blue-gray-900">
      <Link
        as="a"
        href="#"
        className="ml-2 mr-4 cursor-pointer py-1.5 font-medium"
      >
        Room #0
      </Link>
      <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
        {/* <VideoDollyTray /> */}
      </div>
      {/* <ProfileMenu /> */}
    </div>
  );
};

// const ProfileMenu: FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
//       <MenuHandler>
//         <Button
//           variant="text"
//           color="blue-gray"
//           className="ml-auto flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2"
//         >
//           <Avatar
//             variant="circular"
//             size="sm"
//             alt="candice wu"
//             className="border border-blue-500 p-0.5"
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
//           />
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`h-3 w-3 transition-transform ${
//               isMenuOpen ? "rotate-180" : ""
//             }`}
//           />
//         </Button>
//       </MenuHandler>
//       <MenuList className="p-1">
//         {profileMenuItems.map(({ label, icon }, key) => {
//           const isLastItem = key === profileMenuItems.length - 1;
//           return (
//             <MenuItem
//               key={label}
//               onClick={closeMenu}
//               className={`flex items-center gap-2 rounded ${
//                 isLastItem
//                   ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
//                   : ""
//               }`}
//             >
//               {React.createElement(icon, {
//                 className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
//                 strokeWidth: 2,
//               })}
//               <Typography
//                 as="span"
//                 variant="small"
//                 className="font-normal"
//                 color={isLastItem ? "red" : "inherit"}
//               >
//                 {label}
//               </Typography>
//             </MenuItem>
//           );
//         })}
//       </MenuList>
//     </Menu>
//   );
// };
