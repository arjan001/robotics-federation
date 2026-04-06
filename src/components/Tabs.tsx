import { useState } from 'react'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? '')

  const activeContent = tabs.find((t) => t.id === activeTab)?.content

  return (
    <div>
      <div className="flex gap-0 mb-10 overflow-x-auto" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-8 py-4 text-sm font-semibold whitespace-nowrap transition-all relative"
            style={{
              background: activeTab === tab.id ? '#ffffff' : 'transparent',
              color: activeTab === tab.id ? '#1a1a1a' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #1a1a1a' : '2px solid transparent',
              cursor: 'pointer',
              borderRadius: 0,
              letterSpacing: '0.02em',
            }}
          >
            {tab.label}
          </button>
        ))}
        {/* Bottom line under all tabs */}
        <div className="flex-1" style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }} />
      </div>
      <div>{activeContent}</div>
    </div>
  )
}
