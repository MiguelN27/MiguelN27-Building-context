import { AlertTriangle, CheckCircle2, ShieldAlert, XCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { type RiskCheck } from '@/lib/risky-practice-checks'

interface RiskyPracticesPanelProps {
  checks: RiskCheck[]
}

const statusStyles = {
  pass: {
    badge: 'bg-[var(--income-badge)] text-[var(--income-badge-fg)]',
    icon: CheckCircle2,
    label: 'Pass',
  },
  fail: {
    badge: 'bg-[var(--outcome-badge)] text-[var(--outcome-badge-fg)]',
    icon: XCircle,
    label: 'Fail',
  },
  warning: {
    badge: 'bg-[var(--profit-badge)] text-[var(--profit-badge-fg)]',
    icon: AlertTriangle,
    label: 'Warning',
  },
} as const

export function RiskyPracticesPanel({ checks }: RiskyPracticesPanelProps) {
  return (
    <section aria-label="Risky practices checks" className="flex flex-col gap-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Risky Practices Checkboard</h2>
          <p className="text-sm text-muted-foreground">
            Architecture and DX checks inspired by the project rules.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <ShieldAlert size={14} />
          Quality Gate
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {checks.map((check) => {
          const style = statusStyles[check.status]
          const StatusIcon = style.icon

          return (
            <Card key={check.id} className="border-border/60">
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">{check.title}</CardTitle>
                  <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide', style.badge)}>
                    <StatusIcon size={12} />
                    {style.label}
                  </span>
                </div>
                <CardDescription>
                  {check.category} practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground/90">{check.details}</p>
                <p className="text-xs text-muted-foreground">{check.evidence}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}