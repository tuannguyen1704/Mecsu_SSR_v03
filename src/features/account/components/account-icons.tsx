import {
  CreditCard,
  FileText,
  HeadphonesIcon,
  Heart,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  RotateCcw,
  User,
} from "lucide-react";
import type { AccountIconKey } from "../types/account";

export const accountIconMap = {
  overview: LayoutDashboard,
  orders: Package,
  quotes: FileText,
  returns: RotateCcw,
  addresses: MapPin,
  payment: CreditCard,
  user: User,
  wishlist: Heart,
  feedback: Mail,
  support: HeadphonesIcon,
} satisfies Record<AccountIconKey, typeof LayoutDashboard>;
