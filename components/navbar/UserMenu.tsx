"use client";

import Link from "next/link";
import { 
  ChevronDown, 
  LayoutDashboard, 
  Award, 
  ShieldCheck, 
  LogOut 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { localize } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  user: any;
  logout: () => void;
  scrolled: boolean;
  currentLanguage: string;
  isAdmin: boolean;
}

export const UserMenu = ({ user, logout, scrolled, currentLanguage, isAdmin }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            {localize(user?.name, currentLanguage)?.[0]}
          </div>
          <ChevronDown className={cn("w-4 h-4 transition-transform group-data-[state=open]:rotate-180", scrolled ? "text-primary" : "text-white")} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl">
        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground p-3">Account Hub</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard">
          <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
            <LayoutDashboard className="w-4 h-4 mr-3 text-primary" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/certificates">
          <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
            <Award className="w-4 h-4 mr-3 text-primary" />
            My Certificates
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {isAdmin && (
          <Link href="/admin/users">
            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer text-secondary">
              <ShieldCheck className="w-4 h-4 mr-3" />
              Admin Control
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={logout} className="rounded-xl py-3 cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
