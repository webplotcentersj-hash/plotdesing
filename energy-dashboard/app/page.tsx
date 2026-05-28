"use client"

import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewKpiSection } from "@/components/overview/overview-kpi-section"
import { EnergyTrendChart } from "@/components/overview/energy-trend-chart"
import { LoadDurationCurve } from "@/components/overview/load-duration-curve"
import { EnergyHeatmap } from "@/components/overview/energy-heatmap"
import { PeakUsageAnalysis } from "@/components/overview/peak-usage-analysis"
import { ConsumptionBreakdown } from "@/components/overview/consumption-breakdown"
import { PeriodComparison } from "@/components/overview/period-comparison"
import { SystemAlertsWidget } from "@/components/overview/system-alerts-widget"
import { useAppDispatch, useOverviewData, useOverviewLoading } from "@/lib/store/hooks"
import { fetchOverviewDataRequest } from "@/lib/store/slices/overviewSlice"

export default function OverviewPage() {
  const dispatch = useAppDispatch()
  const data = useOverviewData()
  const loading = useOverviewLoading()

  useEffect(() => {
    if (!data) {
      dispatch(fetchOverviewDataRequest())
    }
  }, [dispatch, data])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPI Section - Full Width */}
        <OverviewKpiSection />

        {/* Energy Consumption Trend and Peak Usage Analysis - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnergyTrendChart />
          <PeakUsageAnalysis />
        </div>

        {/* Load Duration Curve and Energy Consumption Heatmap - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadDurationCurve />
          <EnergyHeatmap />
        </div>

        {/* Consumption Breakdown and Period Comparison - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConsumptionBreakdown />
          <PeriodComparison />
        </div>

        {/* Active Alerts - Full Width at Bottom */}
        <SystemAlertsWidget />
      </div>
    </DashboardLayout>
  )
}
