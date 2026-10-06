import {
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardPreview({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "full";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-blue-900/10 ring-1 ring-slate-900/5",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-slate-500">HR Command Center</span>
      </div>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Modules
          </p>
          {[
            { icon: Users, label: "Employees", active: true },
            { icon: Clock, label: "Attendance" },
            { icon: Calendar, label: "Leave" },
            { icon: DollarSign, label: "Payroll" },
            { icon: UserPlus, label: "Recruitment" },
            { icon: TrendingUp, label: "Performance" },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                active ? "bg-blue-50 font-medium text-brand" : "text-slate-600",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </div>
          ))}
        </div>
        <div className="space-y-4 lg:col-span-9">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Headcount", value: "1,248", delta: "+4.2%" },
              { label: "Present Today", value: "94%", delta: "On track" },
              { label: "Open Roles", value: "23", delta: "6 offers" },
              { label: "Payroll", value: "₹2.4Cr", delta: "Mar cycle" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-slate-50/80 p-3"
              >
                <p className="text-[11px] font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-lg font-bold text-navy">{stat.value}</p>
                <p className="text-[10px] text-accent">{stat.delta}</p>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "grid gap-3",
              variant === "full" ? "sm:grid-cols-2" : "grid-cols-1",
            )}
          >
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">Workforce analytics</p>
                <BarChart3 className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex h-24 items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand to-blue-400 opacity-90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            {variant === "full" ? (
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-navy">Recruitment pipeline</p>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  <li className="flex justify-between">
                    <span>Applied</span>
                    <span className="font-semibold text-navy">412</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Interview</span>
                    <span className="font-semibold text-navy">68</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Offer</span>
                    <span className="font-semibold text-navy">12</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-navy">Today&apos;s highlights</p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <li>• 14 leave requests pending approval</li>
                  <li>• Payroll validation 98% complete</li>
                  <li>• 5 interviews scheduled</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
