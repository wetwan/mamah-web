"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/userStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  const isLoggedIn = useAuth((s) => !!s.token);
  const isLoggedOut = useAuth((s) => s.logout);
  const router = useRouter();
  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center justify-center hover:bg-transparent "
            >
              {/* Bigger icon */}
              <User
                size={54}
                strokeWidth={2.4}
                className="text-3xl scale-[1.6]"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/cart");
                }}
              >
                Cart
              </DropdownMenuItem>
              <DropdownMenuItem>Order History</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={isLoggedOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center justify-center hover:bg-transparent "
            >
              {/* Bigger icon */}
              <User
                size={54}
                strokeWidth={2.4}
                className="text-3xl scale-[1.6]"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem className="capitalize ">
                log in
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
export default ProfileDropdown;
