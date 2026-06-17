import { useStore } from "../../store";
import BaseBtn from "components/atoms/button/button";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  Icon,
  MoneyIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { User } from "../../store/slices";
import Select from "components/molecules/select";
import {
  DASHBOARD_SECTIONS,
  DATE_RANGES,
  OVERVIEW_ANALYTICS,
  PIE_CHART_DATA,
  VIEWS_CHART_DATA,
} from "../../assets/constants/home";
import Tabs from "components/molecules/tabs";
import Card from "components/organisms/card";
import clsx from "clsx";
import { formatThousands } from "../../lib/helpers/format-number";
import { useAnimatedNumber } from "../../lib/helpers/use-animated-number";
import BarChart from "components/molecules/charts/bar";
import PieChart from "components/molecules/charts/pie";
import frameImage from "../../assets/images/Frame.png";
import Badge from "components/atoms/badge";
import { useState } from "react";

interface AnalyticsOverviewCardProps {
  id: string;
  title: string;
  count: number;
  trend: "down" | "up";
  trendPct: number;
  Icon: Icon;
}

const Header = ({ user }: { user?: User }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="gap-s4 flex flex-col">
        <div className="font-bold text-surface-on-surface text-xxxl leading-normal">
          Good afternoon, {user?.firstName}👋
        </div>
        <div className="font-normal text-surface-on-surface-subtle text-lg leading-normal">
          Here's what's happening with your business
        </div>
      </div>
      <div>
        <BaseBtn
          label="Add Workshop"
          variant="solid"
          leftIcon={
            <PlusIcon
              className="text-primary-on-primary"
              size={18}
              weight="regular"
            />
          }
        />
      </div>
    </div>
  );
};

const Filters = ({
  onSelectTab,
  selectedTab,
}: {
  onSelectTab: CallableFunction;
  selectedTab?: string;
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <Tabs
        tabs={DASHBOARD_SECTIONS}
        onSelectTab={onSelectTab}
        selectedTab={selectedTab}
      />
      <Select options={DATE_RANGES} defaultOption={DATE_RANGES[1]} />
    </div>
  );
};

const AnalyticsOverviewCard = ({
  title,
  count,
  trend,
  trendPct,
  Icon,
}: AnalyticsOverviewCardProps) => {
  const animatedCount = useAnimatedNumber(count);
  return (
    <Card className="p-s16 flex flex-row items-center justify-between w-1/4">
      <div className="gap-s4">
        <div className="text-sm font-normal leading-normal text-surface-on-surface">
          {title}
        </div>
        <div className="text-xxl font-bold leading-normal text-surface-on-surface">
          {formatThousands(animatedCount)}
        </div>
        <div
          className={clsx(
            "flex flex-row items-center gap-s4 text-sm font-normal leading-normal",
            trend === "up"
              ? "text-success-on-surface"
              : "text-error-on-surface",
          )}
        >
          {trend === "up" ? (
            <ArrowUpRightIcon size={16} />
          ) : (
            <ArrowDownRightIcon size={16} />
          )}
          {trendPct}% vs last month
        </div>
      </div>
      <div className="self-stretch w-10 h-10 flex justify-center bg-secondary-muted items-center rounded-md">
        <Icon size={24} className="text-secondary-on-surface" />
      </div>
    </Card>
  );
};

const WorkshopPerformanceCard = ({
  title,
  status,
  count,
}: {
  title: string;
  status: "active" | "paused";
  count: number;
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-s12 p-s16 border border-subtle rounded-lg w-full">
      <img
        src={frameImage}
        alt="Intro to Wheel Throwing"
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="flex flex-col items-start gap-s8 flex-1">
        <div className="text-lg font-medium leading-normal text-surface-on-surface">
          {title}
        </div>
        <Badge status={status} />
      </div>
      <div className="text-xl font-bold leading-normal text-surface-on-surface">
        {count}
      </div>
    </div>
  );
};

const DashBoard = () => {
  const user = useStore((state) => state.user);
  const [selectedTab, onSelectTab] = useState();
  return (
    <div className="flex flex-col gap-s24">
      <Header user={user} />
      <div className="flex flex-col items-start gap-s16">
        <Filters onSelectTab={onSelectTab} selectedTab={selectedTab} />
        <div className="gap-s16 flex flex-row items-center w-full">
          {(OVERVIEW_ANALYTICS as AnalyticsOverviewCardProps[]).map((oa) => (
            <AnalyticsOverviewCard key={oa.id} {...oa} />
          ))}
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-s16">
          <Card
            className="w-2/3"
            title="Profile views over time"
            description="Daily · last 30 days"
          >
            <div className="h-[280px] w-full p-s16">
              <BarChart
                data={VIEWS_CHART_DATA}
                domain={[0, 5000]}
                ticks={[0, 1000, 2000, 3000, 4000, 5000]}
              />
            </div>
          </Card>
          <Card
            className="w-1/3"
            title="Discovery source"
            description="Source of audience"
          >
            <div className="h-[280px] w-full p-s16">
              <PieChart data={PIE_CHART_DATA} />
            </div>
          </Card>
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-s16">
          <Card
            className="w-full"
            title="Profile views over time"
            description="Daily · last 30 days"
          >
            <div className="h-[280px] w-full p-s16">
              <BarChart
                layout="vertical"
                radius={[8, 8, 8, 8]}
                width={10}
                barColor="--color-secondary"
                activeBarColor="--color-secondary"
                showCartesianGrid={false}
                showYValueAxis={true}
                showTrackBar={true}
                data={[
                  { label: "Save", value: 145 },
                  { label: "Share", value: 234 },
                  { label: "Website", value: 34 },
                  { label: "Phone", value: 20 },
                  { label: "Directions", value: 567 },
                  { label: "Instagram", value: 412 },
                  { label: "Facebook", value: 489 },
                  { label: "WhatsApp", value: 320 },
                  { label: "TikTok", value: 185 },
                ]}
              />
            </div>
          </Card>
          <Card
            className="w-full"
            title="Traffic by day of week"
            description="Which days drive the most views"
          >
            <div className="h-[280px] w-full p-s16">
              <BarChart
                layout="vertical"
                radius={[8, 8, 8, 8]}
                width={10}
                barColor="--color-tertiary"
                activeBarColor="--color-tertiary"
                showCartesianGrid={false}
                showYValueAxis={true}
                showTrackBar={true}
                data={[
                  { label: "Monday", value: 145 },
                  { label: "Tuesday", value: 234 },
                  { label: "Wednesday", value: 34 },
                  { label: "Thursday", value: 31 },
                  { label: "Friday", value: 567 },
                  { label: "Saturday", value: 242 },
                  { label: "Sunday", value: 132 },
                ]}
              />
            </div>
          </Card>
        </div>
        {selectedTab !== "profile_analytics" && (
          <Card
            className="w-full"
            title="Workshop performance"
            description="Views per workshop · click for details"
          >
            <div
              className={clsx(
                "p-s16 gap-s12",
                selectedTab === "workshops_analytics"
                  ? "flex flex-col"
                  : "grid grid-cols-2 [&>*:last-child:nth-child(odd)]:col-span-2",
              )}
            >
              <WorkshopPerformanceCard
                title="Intro to Wheel Throwing"
                status="active"
                count={234}
              />
              <WorkshopPerformanceCard
                title="Hand-building Clay Workshop"
                status="active"
                count={234}
              />
              <WorkshopPerformanceCard
                title="Private Ceramic Painting Session"
                status="paused"
                count={234}
              />
            </div>
          </Card>
        )}
        <Card className="w-full p-s24 flex items-start gap-s16 ">
          <div className="w-16 h-16 flex items-center justify-center bg-primary-muted text-primary-on-surface rounded-md">
            <MoneyIcon size={32} />
          </div>
          <div className="flex flex-col items-start gap-s8">
            <div className="flex items-center gap-s12">
              <div className="text-surface-on-surface text-xl font-bold leading-normal">
                Booking Revenue & Commissions
              </div>
              <Badge status="active" label="Coming Soon" />
            </div>
            <div className="text-surface-on-surface text-md font-normal leading-normal">
              Once in-app bookings are live, you'll see booking counts, revenue
              per workshop, and commission summaries directly in this section.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
