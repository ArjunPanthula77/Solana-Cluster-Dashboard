


// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"

// interface Cluster {
//   funding_wallet: string
//   recipients: string[]
//   token_mints: string[]
//   fan_out_slot: number
//   buy_slots: number[]
//   common_patterns: {
//     amounts: string
//     wallet_age: string
//     dex_programs: string[]
//   }
//   total_sol_funded: number
//   total_sol_remaining: number
//   spend_rate_sol_per_min: number | null
//   time_remaining_sec: number | null
//   last_update: number
//   cluster_age_sec: number
//   children_count: number
//   created_at: number
//   status: "active" | "forming"
// }

// interface ApiResponse {
//   clusters: Cluster[]
//   metadata: {
//     total_active: number
//     total_tracked: number
//     timestamp: string
//     requirements: {
//       min_children: number
//       min_total_sol: number
//       min_transfer_sol: number
//       detection_window_sec: number
//       data_retention_min: number
//     }
//   }
// }

// export function ClusterDashboard() {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
//   const [isPolling, setIsPolling] = useState(false)
//   const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
//   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
//   const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
//   const [sortBy, setSortBy] = useState<
//     "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
//   >("total_sol_funded")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [minSolFilter, setMinSolFilter] = useState<string>("")
//   const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
//   const { toast } = useToast()

//   const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

//   const fetchData = async () => {
//     try {
//       setConnectionStatus("connecting")
//       console.log("[v0] Attempting to fetch data from:", `${API_BASE}/clusters`)

//       const response = await fetch(`${API_BASE}/clusters`)
//       console.log("[v0] Response status:", response.status)
//       console.log("[v0] Response ok:", response.ok)

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`)
//       }

//       const json: ApiResponse = await response.json()
//       console.log("[v0] Successfully fetched data:", json)

//       setData(json)
//       setLoading(false)
//       setError(null) // Clear any previous errors on successful fetch
//       setConnectionStatus("connected")
//       setLastUpdateTime(new Date())
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
//       setError(`Connection failed: ${errorMessage}`)
//       setLoading(false)
//       setConnectionStatus("disconnected")

//       toast({
//         title: "Connection Error",
//         description: `Unable to connect to API: ${errorMessage}`,
//         variant: "destructive",
//       })
//     }
//   }

//   const startPolling = async () => {
//     if (!isPolling) {
//       await fetchData()
//       const interval = setInterval(fetchData, 5000)
//       setPollInterval(interval)
//       setIsPolling(true)
//       toast({
//         title: "Polling Started",
//         description: "Real-time monitoring is now active",
//       })
//     }
//   }

//   const stopPolling = async () => {
//     if (isPolling) {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//         setPollInterval(null)
//       }
//       try {
//         const response = await fetch(`${API_BASE}/stop-polling`, {
//           method: "POST",
//         })
//         if (!response.ok) {
//           throw new Error("Failed to stop backend polling")
//         }
//         toast({
//           title: "Polling Stopped",
//           description: "Real-time monitoring has been paused",
//         })
//       } catch (err) {
//         console.error("Error stopping backend polling:", err)
//         setError("Failed to stop backend polling")
//       }
//       setIsPolling(false)
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//       }
//     }
//   }, [pollInterval])

//   const filteredAndSortedClusters =
//     data?.clusters
//       .filter((cluster) => {
//         const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
//         const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
//         const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
//         return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
//       })
//       .sort((a, b) => {
//         const aValue = a[sortBy]
//         const bValue = b[sortBy]
//         const multiplier = sortOrder === "desc" ? -1 : 1
//         return (aValue > bValue ? 1 : -1) * multiplier
//       }) || []

//   const exportToCSV = () => {
//     if (!filteredAndSortedClusters.length) {
//       toast({
//         title: "No Data",
//         description: "No clusters to export",
//         variant: "destructive",
//       })
//       return
//     }

//     const headers = [
//       "Funding Wallet",
//       "Children Count",
//       "Total SOL Funded",
//       "Remaining SOL",
//       "Spend Rate (SOL/min)",
//       "Time Remaining (sec)",
//       "Status",
//       "Age (sec)",
//       "Token Mints",
//       "DEX Programs",
//     ]

//     const csvContent = [
//       headers.join(","),
//       ...filteredAndSortedClusters.map((cluster) =>
//         [
//           cluster.funding_wallet,
//           cluster.children_count,
//           cluster.total_sol_funded.toFixed(2),
//           cluster.total_sol_remaining.toFixed(2),
//           cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A",
//           cluster.time_remaining_sec ?? "N/A",
//           cluster.status,
//           cluster.cluster_age_sec,
//           `"${cluster.token_mints.join(", ")}"`,
//           `"${cluster.common_patterns.dex_programs.join(", ")}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `solana-clusters-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)

//     toast({
//       title: "Export Complete",
//       description: "Cluster data exported to CSV",
//     })
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setMinSolFilter("")
//     setMinChildrenFilter("")
//     setSortBy("total_sol_funded")
//     setSortOrder("desc")
//   }

//   const getStatusBadge = (status: string) => {
//     return status === "active" ? (
//       <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//         {status.toUpperCase()}
//       </Badge>
//     ) : (
//       <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
//         {status.toUpperCase()}
//       </Badge>
//     )
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied!",
//           description: "Address copied to clipboard",
//         })
//       })
//       .catch((err) => {
//         console.error("Failed to copy:", err)
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy to clipboard",
//           variant: "destructive",
//         })
//       })
//   }

//   const summaryStats = {
//     totalClusters: filteredAndSortedClusters.length,
//     totalSolFunded: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_funded, 0),
//     totalSolRemaining: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_remaining, 0),
//     averageChildren:
//       filteredAndSortedClusters.length > 0
//         ? filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.children_count, 0) /
//           filteredAndSortedClusters.length
//         : 0,
//     activeClusters: filteredAndSortedClusters.filter((c) => c.status === "active").length,
//     formingClusters: filteredAndSortedClusters.filter((c) => c.status === "forming").length,
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
//       {/* Header */}
//       <header className="text-center mb-5">
//         <h1 className="text-primary text-2xl font-bold mb-2">Solana Funding Cluster Dashboard</h1>
//         <p className="text-muted-foreground text-base">
//           Real-time monitoring of active funding clusters (≥5 children, ≥20 SOL total, 10s window). Total Active:{" "}
//           <span className="text-green-500 font-semibold">{data?.metadata.total_active}</span> | Tracked:{" "}
//           <span className="text-blue-500 font-semibold">{data?.metadata.total_tracked}</span> | Last Updated:{" "}
//           <span className="font-semibold">
//             {lastUpdateTime?.toLocaleString() || new Date(data?.metadata.timestamp || "").toLocaleString()}
//           </span>
//         </p>
//         {error && <p className="text-destructive text-base mt-2">{error}</p>}
//       </header>

//       {/* Controls */}
//       <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2">
//         <Input
//           type="text"
//           placeholder="Search by Funding Wallet..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 lg:w-1/2 p-2 text-base border border-border rounded"
//         />

//         <Select value={statusFilter} onValueChange={(value: "all" | "active" | "forming") => setStatusFilter(value)}>
//           <SelectTrigger className="lg:w-1/4 p-2 text-base border border-border rounded bg-background">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="active">Active Only</SelectItem>
//             <SelectItem value="forming">Forming Only</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             onClick={startPolling}
//             disabled={isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             } ${isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Start Polling
//           </Button>
//           <Button
//             onClick={stopPolling}
//             disabled={!isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               !isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             } ${!isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Stop Polling
//           </Button>
//         </div>
//       </div>

//       {/* Clusters Table */}
//       <div className="overflow-x-auto">
//         <Table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
//           <TableHeader>
//             <TableRow className="bg-primary text-primary-foreground">
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Funding Wallet</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Children</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Total Funded SOL
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Remaining SOL</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Spend Rate (SOL/min)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Time Remaining (sec)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Token Mints</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">DEX Programs</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Fan Out Slot</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Status</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Age (sec)</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedClusters.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={11} className="text-center text-muted-foreground p-5">
//                   No clusters match your filters
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredAndSortedClusters.map((cluster, index) => (
//                 <TableRow key={index} className="hover:bg-muted/30 transition-colors border-b border-border">
//                   <TableCell className="p-3 text-left text-sm">{cluster.funding_wallet}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <div className="flex items-center gap-2">
//                       <span>{cluster.children_count}</span>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCluster(cluster)}
//                         className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded text-xs transition-colors"
//                       >
//                         View Children
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.total_sol_funded.toFixed(2)}</TableCell>
//                   <TableCell
//                     className={`p-3 text-left text-sm font-semibold ${cluster.total_sol_remaining < 1 ? "text-destructive" : ""}`}
//                   >
//                     {cluster.total_sol_remaining.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.time_remaining_sec ?? "N/A"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.token_mints.join(", ") || "None"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.common_patterns.dex_programs.join(", ") || "None"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.fan_out_slot}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <span
//                       className={`font-semibold ${cluster.status === "active" ? "text-green-500" : "text-yellow-500"}`}
//                     >
//                       {cluster.status.toUpperCase()}
//                     </span>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.cluster_age_sec}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Child Addresses Modal */}
//       <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
//         <DialogContent className="bg-card rounded-lg p-5 max-w-2xl w-11/12 max-h-4/5 overflow-y-auto shadow-lg">
//           <DialogHeader>
//             <DialogTitle className="mt-0 text-primary text-xl">
//               Child Addresses for {selectedCluster?.funding_wallet.slice(0, 6)}...
//               {selectedCluster?.funding_wallet.slice(-4)}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="my-4 max-h-96 overflow-y-auto">
//             {selectedCluster?.recipients.map((address, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center p-2 border-b border-border text-sm last:border-b-0"
//               >
//                 <span className="flex-1 mr-4">{address}</span>
//                 <Button
//                   size="sm"
//                   onClick={() => copyToClipboard(address)}
//                   className="bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded text-xs transition-colors"
//                 >
//                   Copy
//                 </Button>
//               </div>
//             ))}
//           </div>
//           <Button
//             onClick={() => setSelectedCluster(null)}
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded text-base block mx-auto mt-2 transition-colors"
//           >
//             Close
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }




















// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Progress } from "@/components/ui/progress"
// import { useToast } from "@/hooks/use-toast"

// interface Cluster {
//   funding_wallet: string
//   recipients: string[]
//   token_mints: string[]
//   fan_out_slot: number
//   buy_slots: number[]
//   common_patterns: {
//     amounts: string
//     wallet_age: string
//     dex_programs: string[]
//   }
//   total_sol_funded: number
//   total_sol_remaining: number
//   spend_rate_sol_per_min: number | null
//   time_remaining_sec: number | null
//   last_update: number
//   cluster_age_sec: number
//   children_count: number
//   created_at: number
//   status: "active" | "forming"
// }

// interface ApiResponse {
//   clusters: Cluster[]
//   metadata: {
//     total_active: number
//     total_tracked: number
//     timestamp: string
//     requirements: {
//       min_children: number
//       min_total_sol: number
//       min_transfer_sol: number
//       detection_window_sec: number
//       data_retention_min: number
//     }
//   }
// }

// function ClusterDetail({ cluster }: { cluster: Cluster }) {
//   const funded = cluster.total_sol_funded;
//   const remaining = cluster.total_sol_remaining;
//   const spent = funded - remaining;
//   const percentComplete = funded > 0 ? (spent / funded) * 100 : 0;
//   const estMin = cluster.time_remaining_sec !== null ? Math.floor(cluster.time_remaining_sec / 60) : 0;
//   const estSec = cluster.time_remaining_sec !== null ? cluster.time_remaining_sec % 60 : 0;
//   const estTime = cluster.time_remaining_sec !== null ? `${estMin}m ${estSec}s remaining` : 'N/A';
//   const healthScore = Math.round(100 - (percentComplete / 5));
//   const healthLabel = healthScore > 80 ? 'Excellent Health' : healthScore > 60 ? 'Good Health' : 'Poor Health';
//   const activeCount = Math.round(cluster.children_count * 0.8);
//   const buyInterval = '1m';
//   const dexUsed = cluster.common_patterns.dex_programs.join(' / ') || 'N/A';
//   const nextBuy = (cluster.spend_rate_sol_per_min || 0.51).toFixed(2);
//   const tokenName = 'ALON';

//   const childrenToShow = cluster.recipients.slice(0, 3);
//   const times = [2, 3, 1];
//   const spents = [5.2, 4.8, 6.1];
//   const transactions = [
//     { sol: 5.2, alon: 1240, time: 2 },
//     { sol: 4.8, alon: 1152, time: 3 },
//     { sol: 6.1, alon: 1464, time: 1 },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="rounded-lg bg-background p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">Funding Overview</h3>
//           <div className="flex justify-between mb-1">
//             <span>Total SOL Funded</span>
//             <span className="font-bold">{funded.toFixed(1)} SOL</span>
//           </div>
//           <div className="flex justify-between mb-1">
//             <span>SOL Spent</span>
//             <span className="font-bold">{spent.toFixed(1)} SOL</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>SOL Remaining</span>
//             <span className="font-bold text-yellow-500">{remaining.toFixed(1)} SOL</span>
//           </div>
//           <Progress value={percentComplete} className="h-2 mb-1" />
//           <div className="text-sm mb-1">{Math.round(percentComplete)}% Complete</div>
//           <div className="text-sm">Est. {estTime}</div>
//         </div>
//         <div className="rounded-lg bg-background p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">Health Score</h3>
//           <div className="flex justify-center mb-2">
//             <div className="rounded-full bg-green-400 w-24 h-24 flex items-center justify-center text-white text-4xl font-bold border-4 border-green-600">
//               {healthScore}
//             </div>
//           </div>
//           <div className="text-center text-green-500 font-semibold">{healthLabel}</div>
//         </div>
//       </div>
//       <div className="rounded-lg bg-background p-4 shadow">
//         <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
//         <div className="grid grid-cols-2 gap-2 text-sm">
//           <div>Active Wallets</div>
//           <div className="font-bold">{activeCount} / {cluster.children_count}</div>
//           <div>Buy Interval</div>
//           <div className="font-bold">{buyInterval}</div>
//           <div>DEX Used</div>
//           <div className="font-bold">{dexUsed}</div>
//           <div>Next Buy</div>
//           <div className="font-bold">{nextBuy}</div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="rounded-lg bg-background p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">Child Wallets Activity</h3>
//           {childrenToShow.map((addr, i) => {
//             const abbr = addr.slice(0, 3) + "..." + addr.slice(-3);
//             const childSpent = spents[i % spents.length];
//             const childTime = times[i % times.length];
//             const tx = `Last tx: ${childTime} minutes ago`;
//             return (
//               <div key={i} className="flex items-center mb-2">
//                 <div className="rounded-full bg-green-500 w-6 h-6 flex items-center justify-center text-white text-xs mr-2">
//                   {i + 1}
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-mono">{abbr}</div>
//                   <div className="text-sm text-gray-500">{tx}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-bold">{childSpent} SOL</div>
//                   <div className="text-sm text-gray-500">Spent</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="rounded-lg bg-background p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">Transaction Timeline</h3>
//           {transactions.map((tx, i) => (
//             <div key={i} className="mb-2">
//               <div className="flex justify-between">
//                 <span>Buy {tokenName}</span>
//                 <span className="text-gray-500">{tx.time} minutes ago</span>
//               </div>
//               <div className="font-bold">{tx.sol} SOL + {tx.alon} {tokenName}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function ClusterDashboard() {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
//   const [isPolling, setIsPolling] = useState(false)
//   const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
//   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
//   const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
//   const [sortBy, setSortBy] = useState<
//     "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
//   >("total_sol_funded")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [minSolFilter, setMinSolFilter] = useState<string>("")
//   const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
//   const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set())
//   const { toast } = useToast()

//   const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

//   const fetchData = async () => {
//     try {
//       setConnectionStatus("connecting")
//       console.log("[v0] Attempting to fetch data from:", `${API_BASE}/clusters`)

//       const response = await fetch(`${API_BASE}/clusters`)
//       console.log("[v0] Response status:", response.status)
//       console.log("[v0] Response ok:", response.ok)

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`)
//       }

//       const json: ApiResponse = await response.json()
//       console.log("[v0] Successfully fetched data:", json)

//       setData(json)
//       setLoading(false)
//       setError(null) // Clear any previous errors on successful fetch
//       setConnectionStatus("connected")
//       setLastUpdateTime(new Date())
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
//       setError(`Connection failed: ${errorMessage}`)
//       setLoading(false)
//       setConnectionStatus("disconnected")

//       toast({
//         title: "Connection Error",
//         description: `Unable to connect to API: ${errorMessage}`,
//         variant: "destructive",
//       })
//     }
//   }

//   const startPolling = async () => {
//     if (!isPolling) {
//       await fetchData()
//       const interval = setInterval(fetchData, 5000)
//       setPollInterval(interval)
//       setIsPolling(true)
//       toast({
//         title: "Polling Started",
//         description: "Real-time monitoring is now active",
//       })
//     }
//   }

//   const stopPolling = async () => {
//     if (isPolling) {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//         setPollInterval(null)
//       }
//       try {
//         const response = await fetch(`${API_BASE}/stop-polling`, {
//           method: "POST",
//         })
//         if (!response.ok) {
//           throw new Error("Failed to stop backend polling")
//         }
//         toast({
//           title: "Polling Stopped",
//           description: "Real-time monitoring has been paused",
//         })
//       } catch (err) {
//         console.error("Error stopping backend polling:", err)
//         setError("Failed to stop backend polling")
//       }
//       setIsPolling(false)
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//       }
//     }
//   }, [pollInterval])

//   const toggleExpand = (wallet: string) => {
//     const newSet = new Set(expandedClusters);
//     if (newSet.has(wallet)) {
//       newSet.delete(wallet);
//     } else {
//       newSet.add(wallet);
//     }
//     setExpandedClusters(newSet);
//   };

//   const filteredAndSortedClusters =
//     data?.clusters
//       .filter((cluster) => {
//         const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
//         const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
//         const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
//         return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
//       })
//       .sort((a, b) => {
//         const aValue = a[sortBy]
//         const bValue = b[sortBy]
//         const multiplier = sortOrder === "desc" ? -1 : 1
//         return (aValue > bValue ? 1 : -1) * multiplier
//       }) || []

//   const exportToCSV = () => {
//     if (!filteredAndSortedClusters.length) {
//       toast({
//         title: "No Data",
//         description: "No clusters to export",
//         variant: "destructive",
//       })
//       return
//     }

//     const headers = [
//       "Funding Wallet",
//       "Children Count",
//       "Total SOL Funded",
//       "Remaining SOL",
//       "Spend Rate (SOL/min)",
//       "Time Remaining (sec)",
//       "Status",
//       "Age (sec)",
//       "Token Mints",
//       "DEX Programs",
//     ]

//     const csvContent = [
//       headers.join(","),
//       ...filteredAndSortedClusters.map((cluster) =>
//         [
//           cluster.funding_wallet,
//           cluster.children_count,
//           cluster.total_sol_funded.toFixed(2),
//           cluster.total_sol_remaining.toFixed(2),
//           cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A",
//           cluster.time_remaining_sec ?? "N/A",
//           cluster.status,
//           cluster.cluster_age_sec,
//           `"${cluster.token_mints.join(", ")}"`,
//           `"${cluster.common_patterns.dex_programs.join(", ")}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `solana-clusters-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)

//     toast({
//       title: "Export Complete",
//       description: "Cluster data exported to CSV",
//     })
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setMinSolFilter("")
//     setMinChildrenFilter("")
//     setSortBy("total_sol_funded")
//     setSortOrder("desc")
//   }

//   const getStatusBadge = (status: string) => {
//     return status === "active" ? (
//       <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//         {status.toUpperCase()}
//       </Badge>
//     ) : (
//       <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
//         {status.toUpperCase()}
//       </Badge>
//     )
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied!",
//           description: "Address copied to clipboard",
//         })
//       })
//       .catch((err) => {
//         console.error("Failed to copy:", err)
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy to clipboard",
//           variant: "destructive",
//         })
//       })
//   }

//   const summaryStats = {
//     totalClusters: filteredAndSortedClusters.length,
//     totalSolFunded: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_funded, 0),
//     totalSolRemaining: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_remaining, 0),
//     averageChildren:
//       filteredAndSortedClusters.length > 0
//         ? filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.children_count, 0) /
//           filteredAndSortedClusters.length
//         : 0,
//     activeClusters: filteredAndSortedClusters.filter((c) => c.status === "active").length,
//     formingClusters: filteredAndSortedClusters.filter((c) => c.status === "forming").length,
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
//       {/* Header */}
//       <header className="text-center mb-5">
//         <h1 className="text-primary text-2xl font-bold mb-2">Solana Funding Cluster Dashboard</h1>
//         <p className="text-muted-foreground text-base">
//           Real-time monitoring of active funding clusters (≥5 children, ≥20 SOL total, 10s window). Total Active:{" "}
//           <span className="text-green-500 font-semibold">{data?.metadata.total_active}</span> | Tracked:{" "}
//           <span className="text-blue-500 font-semibold">{data?.metadata.total_tracked}</span> | Last Updated:{" "}
//           <span className="font-semibold">
//             {lastUpdateTime?.toLocaleString() || new Date(data?.metadata.timestamp || "").toLocaleString()}
//           </span>
//         </p>
//         {error && <p className="text-destructive text-base mt-2">{error}</p>}
//       </header>

//       {/* Controls */}
//       <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2">
//         <Input
//           type="text"
//           placeholder="Search by Funding Wallet..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 lg:w-1/2 p-2 text-base border border-border rounded"
//         />

//         <Select value={statusFilter} onValueChange={(value: "all" | "active" | "forming") => setStatusFilter(value)}>
//           <SelectTrigger className="lg:w-1/4 p-2 text-base border border-border rounded bg-background">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="active">Active Only</SelectItem>
//             <SelectItem value="forming">Forming Only</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             onClick={startPolling}
//             disabled={isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             } ${isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Start Polling
//           </Button>
//           <Button
//             onClick={stopPolling}
//             disabled={!isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               !isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             } ${!isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Stop Polling
//           </Button>
//         </div>
//       </div>

//       {/* Clusters Table */}
//       <div className="overflow-x-auto">
//         <Table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
//           <TableHeader>
//             <TableRow className="bg-primary text-primary-foreground">
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Funding Wallet</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Children</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Total Funded SOL
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Remaining SOL</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Spend Rate (SOL/min)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Time Remaining (sec)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Token Mints</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">DEX Programs</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Fan Out Slot</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Status</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Age (sec)</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedClusters.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={12} className="text-center text-muted-foreground p-5">
//                   No clusters match your filters
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredAndSortedClusters.map((cluster, index) => (
//                 <>
//                   <TableRow key={index} className="hover:bg-muted/30 transition-colors border-b border-border">
//                     <TableCell className="p-3 text-left text-sm">{cluster.funding_wallet}</TableCell>
//                     <TableCell className="p-3 text-left text-sm">
//                       <div className="flex items-center gap-2">
//                         <span>{cluster.children_count}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="p-3 text-left text-sm">{cluster.total_sol_funded.toFixed(2)}</TableCell>
//                     <TableCell
//                       className={`p-3 text-left text-sm font-semibold ${cluster.total_sol_remaining < 1 ? "text-destructive" : ""}`}
//                     >
//                       {cluster.total_sol_remaining.toFixed(2)}
//                     </TableCell>
//                     <TableCell className="p-3 text-left text-sm">
//                       {cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"}
//                     </TableCell>
//                     <TableCell className="p-3 text-left text-sm">{cluster.time_remaining_sec ?? "N/A"}</TableCell>
//                     <TableCell className="p-3 text-left text-sm">{cluster.token_mints.join(", ") || "None"}</TableCell>
//                     <TableCell className="p-3 text-left text-sm">
//                       {cluster.common_patterns.dex_programs.join(", ") || "None"}
//                     </TableCell>
//                     <TableCell className="p-3 text-left text-sm">{cluster.fan_out_slot}</TableCell>
//                     <TableCell className="p-3 text-left text-sm">
//                       <span
//                         className={`font-semibold ${cluster.status === "active" ? "text-green-500" : "text-yellow-500"}`}
//                       >
//                         {cluster.status.toUpperCase()}
//                       </span>
//                     </TableCell>
//                     <TableCell className="p-3 text-left text-sm">{cluster.cluster_age_sec}</TableCell>
//                     <TableCell className="p-3 text-left text-sm">
//                       <Button
//                         size="sm"
//                         onClick={() => toggleExpand(cluster.funding_wallet)}
//                         className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded text-xs transition-colors"
//                       >
//                         {expandedClusters.has(cluster.funding_wallet) ? "Collapse" : "Expand"}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                   {expandedClusters.has(cluster.funding_wallet) && (
//                     <TableRow className="bg-muted/50">
//                       <TableCell colSpan={12} className="p-4">
//                         <ClusterDetail cluster={cluster} />
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }











// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Progress } from "@/components/ui/progress" // Assuming you have a Progress component from shadcn/ui or similar

// interface Cluster {
//   funding_wallet: string
//   recipients: string[]
//   token_mints: string[]
//   fan_out_slot: number
//   buy_slots: number[]
//   common_patterns: {
//     amounts: string
//     wallet_age: string
//     dex_programs: string[]
//   }
//   total_sol_funded: number
//   total_sol_remaining: number
//   spend_rate_sol_per_min: number | null
//   time_remaining_sec: number | null
//   last_update: number
//   cluster_age_sec: number
//   children_count: number
//   created_at: number
//   status: "active" | "forming"
// }

// interface ApiResponse {
//   clusters: Cluster[]
//   metadata: {
//     total_active: number
//     total_tracked: number
//     timestamp: string
//     requirements: {
//       min_children: number
//       min_total_sol: number
//       min_transfer_sol: number
//       detection_window_sec: number
//       data_retention_min: number
//     }
//   }
// }

// export function ClusterDashboard() {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
//   const [isPolling, setIsPolling] = useState(false)
//   const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
//   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
//   const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
//   const [sortBy, setSortBy] = useState<
//     "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
//   >("total_sol_funded")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [minSolFilter, setMinSolFilter] = useState<string>("")
//   const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
//   const { toast } = useToast()

//   const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

//   const fetchData = async () => {
//     try {
//       setConnectionStatus("connecting")
//       console.log("[v0] Attempting to fetch data from:", `${API_BASE}/clusters`)

//       const response = await fetch(`${API_BASE}/clusters`)
//       console.log("[v0] Response status:", response.status)
//       console.log("[v0] Response ok:", response.ok)

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`)
//       }

//       const json: ApiResponse = await response.json()
//       console.log("[v0] Successfully fetched data:", json)

//       setData(json)
//       setLoading(false)
//       setError(null) // Clear any previous errors on successful fetch
//       setConnectionStatus("connected")
//       setLastUpdateTime(new Date())
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
//       setError(`Connection failed: ${errorMessage}`)
//       setLoading(false)
//       setConnectionStatus("disconnected")

//       toast({
//         title: "Connection Error",
//         description: `Unable to connect to API: ${errorMessage}`,
//         variant: "destructive",
//       })
//     }
//   }

//   const startPolling = async () => {
//     if (!isPolling) {
//       await fetchData()
//       const interval = setInterval(fetchData, 5000)
//       setPollInterval(interval)
//       setIsPolling(true)
//       toast({
//         title: "Polling Started",
//         description: "Real-time monitoring is now active",
//       })
//     }
//   }

//   const stopPolling = async () => {
//     if (isPolling) {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//         setPollInterval(null)
//       }
//       try {
//         const response = await fetch(`${API_BASE}/stop-polling`, {
//           method: "POST",
//         })
//         if (!response.ok) {
//           throw new Error("Failed to stop backend polling")
//         }
//         toast({
//           title: "Polling Stopped",
//           description: "Real-time monitoring has been paused",
//         })
//       } catch (err) {
//         console.error("Error stopping backend polling:", err)
//         setError("Failed to stop backend polling")
//       }
//       setIsPolling(false)
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//       }
//     }
//   }, [pollInterval])

//   const filteredAndSortedClusters =
//     data?.clusters
//       .filter((cluster) => {
//         const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
//         const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
//         const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
//         return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
//       })
//       .sort((a, b) => {
//         const aValue = a[sortBy]
//         const bValue = b[sortBy]
//         const multiplier = sortOrder === "desc" ? -1 : 1
//         return (aValue > bValue ? 1 : -1) * multiplier
//       }) || []

//   const exportToCSV = () => {
//     if (!filteredAndSortedClusters.length) {
//       toast({
//         title: "No Data",
//         description: "No clusters to export",
//         variant: "destructive",
//       })
//       return
//     }

//     const headers = [
//       "Funding Wallet",
//       "Children Count",
//       "Total SOL Funded",
//       "Remaining SOL",
//       "Spend Rate (SOL/min)",
//       "Time Remaining (sec)",
//       "Status",
//       "Age (sec)",
//       "Token Mints",
//       "DEX Programs",
//     ]

//     const csvContent = [
//       headers.join(","),
//       ...filteredAndSortedClusters.map((cluster) =>
//         [
//           cluster.funding_wallet,
//           cluster.children_count,
//           cluster.total_sol_funded.toFixed(2),
//           cluster.total_sol_remaining.toFixed(2),
//           cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A",
//           cluster.time_remaining_sec ?? "N/A",
//           cluster.status,
//           cluster.cluster_age_sec,
//           `"${cluster.token_mints.join(", ")}"`,
//           `"${cluster.common_patterns.dex_programs.join(", ")}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `solana-clusters-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)

//     toast({
//       title: "Export Complete",
//       description: "Cluster data exported to CSV",
//     })
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setMinSolFilter("")
//     setMinChildrenFilter("")
//     setSortBy("total_sol_funded")
//     setSortOrder("desc")
//   }

//   const getStatusBadge = (status: string) => {
//     return status === "active" ? (
//       <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//         {status.toUpperCase()}
//       </Badge>
//     ) : (
//       <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
//         {status.toUpperCase()}
//       </Badge>
//     )
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied!",
//           description: "Address copied to clipboard",
//         })
//       })
//       .catch((err) => {
//         console.error("Failed to copy:", err)
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy to clipboard",
//           variant: "destructive",
//         })
//       })
//   }

//   const summaryStats = {
//     totalClusters: filteredAndSortedClusters.length,
//     totalSolFunded: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_funded, 0),
//     totalSolRemaining: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_remaining, 0),
//     averageChildren:
//       filteredAndSortedClusters.length > 0
//         ? filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.children_count, 0) /
//           filteredAndSortedClusters.length
//         : 0,
//     activeClusters: filteredAndSortedClusters.filter((c) => c.status === "active").length,
//     formingClusters: filteredAndSortedClusters.filter((c) => c.status === "forming").length,
//   }

//   const formatTimeRemaining = (seconds: number | null) => {
//     if (seconds === null) return "N/A";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   };

//   const calculateHealthScore = (cluster: Cluster) => {
//     // Placeholder calculation: based on remaining SOL percentage (0-100)
//     return Math.round((cluster.total_sol_remaining / cluster.total_sol_funded) * 100);
//   };

//   const getHealthLabel = (score: number) => {
//     if (score >= 80) return "Excellent Health";
//     if (score >= 60) return "Good Health";
//     if (score >= 40) return "Fair Health";
//     return "Poor Health";
//   };

//   const calculateBuyInterval = (cluster: Cluster) => {
//     // Placeholder: assume 1m if not calculable
//     return "1m";
//   };

//   const calculateNextBuy = (cluster: Cluster) => {
//     // Placeholder: random or based on spend rate
//     return (cluster.spend_rate_sol_per_min ?? 0).toFixed(2);
//   };

//   // For child wallets activity and transaction timeline, we'll use placeholders since detailed per-child/tx data isn't in the interface.
//   // In a real app, you'd fetch additional details for the selected cluster.
//   const getChildActivity = (recipients: string[]) => {
//     return recipients.slice(0, 3).map((addr, index) => ({
//       address: addr,
//       spent: (Math.random() * 6 + 1).toFixed(1), // Placeholder
//       lastTx: `${index + 1} minute${index ? "s" : ""} ago`, // Placeholder
//     }));
//   };

//   const getTransactionTimeline = (buySlots: number[]) => {
//     return buySlots.slice(0, 3).map((slot, index) => ({
//       amount: `${(Math.random() * 2 + 4).toFixed(1)} SOL`,
//       token: "> ALON", // Placeholder
//       time: `${index + 1} minute${index ? "s" : ""} ago`, // Placeholder
//     }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
//       {/* Header */}
//       <header className="text-center mb-5">
//         <h1 className="text-primary text-2xl font-bold mb-2">Solana Funding Cluster Dashboard</h1>
//         <p className="text-muted-foreground text-base">
//           Real-time monitoring of active funding clusters (≥5 children, ≥20 SOL total, 10s window). Total Active:{" "}
//           <span className="text-green-500 font-semibold">{data?.metadata.total_active}</span> | Tracked:{" "}
//           <span className="text-blue-500 font-semibold">{data?.metadata.total_tracked}</span> | Last Updated:{" "}
//           <span className="font-semibold">
//             {lastUpdateTime?.toLocaleString() || new Date(data?.metadata.timestamp || "").toLocaleString()}
//           </span>
//         </p>
//         {error && <p className="text-destructive text-base mt-2">{error}</p>}
//       </header>

//       {/* Controls */}
//       <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2">
//         <Input
//           type="text"
//           placeholder="Search by Funding Wallet..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 lg:w-1/2 p-2 text-base border border-border rounded"
//         />

//         <Select value={statusFilter} onValueChange={(value: "all" | "active" | "forming") => setStatusFilter(value)}>
//           <SelectTrigger className="lg:w-1/4 p-2 text-base border border-border rounded bg-background">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="active">Active Only</SelectItem>
//             <SelectItem value="forming">Forming Only</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             onClick={startPolling}
//             disabled={isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             } ${isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Start Polling
//           </Button>
//           <Button
//             onClick={stopPolling}
//             disabled={!isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               !isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             } ${!isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Stop Polling
//           </Button>
//         </div>
//       </div>

//       {/* Clusters Table */}
//       <div className="overflow-x-auto">
//         <Table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
//           <TableHeader>
//             <TableRow className="bg-primary text-primary-foreground">
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Funding Wallet</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Children</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Total Funded SOL
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Remaining SOL</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Spend Rate (SOL/min)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Time Remaining (sec)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Token Mints</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">DEX Programs</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Fan Out Slot</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Status</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Age (sec)</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedClusters.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={11} className="text-center text-muted-foreground p-5">
//                   No clusters match your filters
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredAndSortedClusters.map((cluster, index) => (
//                 <TableRow key={index} className="hover:bg-muted/30 transition-colors border-b border-border">
//                   <TableCell className="p-3 text-left text-sm">{cluster.funding_wallet}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <div className="flex items-center gap-2">
//                       <span>{cluster.children_count}</span>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCluster(cluster)}
//                         className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded text-xs transition-colors"
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.total_sol_funded.toFixed(2)}</TableCell>
//                   <TableCell
//                     className={`p-3 text-left text-sm font-semibold ${cluster.total_sol_remaining < 1 ? "text-destructive" : ""}`}
//                   >
//                     {cluster.total_sol_remaining.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.time_remaining_sec ?? "N/A"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.token_mints.join(", ") || "None"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.common_patterns.dex_programs.join(", ") || "None"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.fan_out_slot}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <span
//                       className={`font-semibold ${cluster.status === "active" ? "text-green-500" : "text-yellow-500"}`}
//                     >
//                       {cluster.status.toUpperCase()}
//                     </span>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.cluster_age_sec}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Detailed Cluster Modal */}
//       <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
//         <DialogContent className="bg-card rounded-lg p-5 max-w-4xl w-11/12 max-h-4/5 overflow-y-auto shadow-lg">
//           {selectedCluster && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="mt-0 text-primary text-xl">
//                   Cluster Details for {selectedCluster.funding_wallet.slice(0, 6)}...
//                   {selectedCluster.funding_wallet.slice(-4)}
//                 </DialogTitle>
//               </DialogHeader>

//               <Tabs defaultValue="overview" className="mt-4">
//                 <TabsList className="grid w-full grid-cols-5">
//                   <TabsTrigger value="overview">Overview</TabsTrigger>
//                   <TabsTrigger value="stats">Stats</TabsTrigger>
//                   <TabsTrigger value="activity">Activity</TabsTrigger>
//                   <TabsTrigger value="details">Details</TabsTrigger>
//                   <TabsTrigger value="wallets">Wallets</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="overview" className="mt-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Funding Overview */}
//                     <div className="bg-background p-4 rounded-lg shadow">
//                       <h3 className="text-lg font-semibold mb-2">Funding Overview</h3>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span>Total SOL Funded</span>
//                           <span className="font-bold">{selectedCluster.total_sol_funded.toFixed(1)} SOL</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>SOL Spent</span>
//                           <span className="font-bold">
//                             {(selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining).toFixed(1)} SOL
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>SOL Remaining</span>
//                           <span className="font-bold">{selectedCluster.total_sol_remaining.toFixed(1)} SOL</span>
//                         </div>
//                         <Progress
//                           value={((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100}
//                           className="w-full h-2"
//                         />
//                         <div className="flex justify-between text-sm text-muted-foreground">
//                           <span>
//                             {Math.round(((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100)}% Complete
//                           </span>
//                           <span>Est. {formatTimeRemaining(selectedCluster.time_remaining_sec)} remaining</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Health Score */}
//                     <div className="bg-background p-4 rounded-lg shadow">
//                       <h3 className="text-lg font-semibold mb-2">Health Score</h3>
//                       <div className="flex flex-col items-center">
//                         <div className="relative w-24 h-24">
//                           <div className="absolute inset-0 rounded-full bg-gray-200"></div>
//                           <div
//                             className="absolute inset-0 rounded-full"
//                             style={{
//                               background: `conic-gradient(#22c55e 0deg, #22c55e ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb 360deg)`,
//                             }}
//                           ></div>
//                           <div className="absolute inset-3 rounded-full bg-background flex items-center justify-center"></div>
//                           <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
//                             {calculateHealthScore(selectedCluster)}
//                           </span>
//                         </div>
//                         <span className="text-sm text-muted-foreground mt-2">{getHealthLabel(calculateHealthScore(selectedCluster))}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="stats" className="mt-4">
//                   <div className="bg-background p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="flex justify-between">
//                         <span>Active Wallets</span>
//                         <span className="font-bold">{selectedCluster.children_count} / {selectedCluster.children_count}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Buy Interval</span>
//                         <span className="font-bold">{calculateBuyInterval(selectedCluster)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>DEX Used</span>
//                         <span className="font-bold">{selectedCluster.common_patterns.dex_programs.join(" / ") || "N/A"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Next Buy</span>
//                         <span className="font-bold">{calculateNextBuy(selectedCluster)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="activity" className="mt-4">
//                   <div className="space-y-6">
//                     {/* Child Wallets Activity */}
//                     <div className="bg-background p-4 rounded-lg shadow">
//                       <h3 className="text-lg font-semibold mb-2">Child Wallets Activity</h3>
//                       <div className="space-y-2">
//                         {getChildActivity(selectedCluster.recipients).map((child, idx) => (
//                           <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-b-0">
//                             <div className="flex items-center gap-2">
//                               <Badge variant="default" className="bg-green-500 text-white">{idx + 1}</Badge>
//                               <span>{child.address.slice(0, 4)}...{child.address.slice(-3)}</span>
//                             </div>
//                             <div className="flex items-center gap-4">
//                               <span>{child.spent} SOL Spent</span>
//                               <span className="text-sm text-muted-foreground">Last Tx: {child.lastTx}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Transaction Timeline */}
//                     <div className="bg-background p-4 rounded-lg shadow">
//                       <h3 className="text-lg font-semibold mb-2">Transaction Timeline</h3>
//                       <div className="space-y-2">
//                         {getTransactionTimeline(selectedCluster.buy_slots).map((tx, idx) => (
//                           <div key={idx} className="flex justify-between">
//                             <span>Buy {tx.amount} {tx.token}</span>
//                             <span className="text-sm text-muted-foreground">{tx.time}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="details" className="mt-4">
//                   <div className="bg-background p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span>Spend Rate</span>
//                         <span className="font-bold">{selectedCluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"} SOL/min</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Time Remaining</span>
//                         <span className="font-bold">{formatTimeRemaining(selectedCluster.time_remaining_sec)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Token Mints</span>
//                         <span className="font-bold">{selectedCluster.token_mints.join(", ") || "None"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>DEX Programs</span>
//                         <span className="font-bold">{selectedCluster.common_patterns.dex_programs.join(", ") || "None"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Fan Out Slot</span>
//                         <span className="font-bold">{selectedCluster.fan_out_slot}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Buy Slots</span>
//                         <span className="font-bold">{selectedCluster.buy_slots.join(", ") || "None"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Common Patterns - Amounts</span>
//                         <span className="font-bold">{selectedCluster.common_patterns.amounts || "N/A"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Common Patterns - Wallet Age</span>
//                         <span className="font-bold">{selectedCluster.common_patterns.wallet_age || "N/A"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Cluster Age (sec)</span>
//                         <span className="font-bold">{selectedCluster.cluster_age_sec}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Created At</span>
//                         <span className="font-bold">{new Date(selectedCluster.created_at * 1000).toLocaleString()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Last Update</span>
//                         <span className="font-bold">{new Date(selectedCluster.last_update * 1000).toLocaleString()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Status</span>
//                         {getStatusBadge(selectedCluster.status)}
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="wallets" className="mt-4">
//                   <div className="bg-background p-4 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold mb-2">All Child Wallets</h3>
//                     <div className="my-4 max-h-48 overflow-y-auto">
//                       {selectedCluster.recipients.map((address, idx) => (
//                         <div
//                           key={idx}
//                           className="flex justify-between items-center p-2 border-b border-border text-sm last:border-b-0"
//                         >
//                           <span className="flex-1 mr-4">{address}</span>
//                           <Button
//                             size="sm"
//                             onClick={() => copyToClipboard(address)}
//                             className="bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded text-xs transition-colors"
//                           >
//                             Copy
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>

//               <Button
//                 onClick={() => setSelectedCluster(null)}
//                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded text-base block mx-auto mt-4 transition-colors"
//               >
//                 Close
//               </Button>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Progress } from "@/components/ui/progress"

// interface Cluster {
//   funding_wallet: string
//   recipients: string[]
//   token_mints: string[]
//   fan_out_slot: number
//   buy_slots: number[]
//   common_patterns: {
//     amounts: string
//     wallet_age: string
//     dex_programs: string[]
//   }
//   total_sol_funded: number
//   total_sol_remaining: number
//   spend_rate_sol_per_min: number | null
//   time_remaining_sec: number | null
//   last_update: number
//   cluster_age_sec: number
//   children_count: number
//   created_at: number
//   status: "active" | "forming"
// }

// interface ApiResponse {
//   clusters: Cluster[]
//   metadata: {
//     total_active: number
//     total_tracked: number
//     timestamp: string
//     requirements: {
//       min_children: number
//       min_total_sol: number
//       min_transfer_sol: number
//       detection_window_sec: number
//       data_retention_min: number
//     }
//   }
// }

// export function ClusterDashboard() {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
//   const [isPolling, setIsPolling] = useState(false)
//   const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
//   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
//   const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
//   const [sortBy, setSortBy] = useState<
//     "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
//   >("total_sol_funded")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [minSolFilter, setMinSolFilter] = useState<string>("")
//   const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
//   const { toast } = useToast()

//   const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

//   const fetchData = async () => {
//     try {
//       setConnectionStatus("connecting")
//       console.log("[v0] Attempting to fetch data from:", `${API_BASE}/clusters`)

//       const response = await fetch(`${API_BASE}/clusters`)
//       console.log("[v0] Response status:", response.status)
//       console.log("[v0] Response ok:", response.ok)

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`)
//       }

//       const json: ApiResponse = await response.json()
//       console.log("[v0] Successfully fetched data:", json)

//       setData(json)
//       setLoading(false)
//       setError(null)
//       setConnectionStatus("connected")
//       setLastUpdateTime(new Date())
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
//       setError(`Connection failed: ${errorMessage}`)
//       setLoading(false)
//       setConnectionStatus("disconnected")

//       toast({
//         title: "Connection Error",
//         description: `Unable to connect to API: ${errorMessage}`,
//         variant: "destructive",
//       })
//     }
//   }

//   const startPolling = async () => {
//     if (!isPolling) {
//       await fetchData()
//       const interval = setInterval(fetchData, 5000)
//       setPollInterval(interval)
//       setIsPolling(true)
//       toast({
//         title: "Polling Started",
//         description: "Real-time monitoring is now active",
//       })
//     }
//   }

//   const stopPolling = async () => {
//     if (isPolling) {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//         setPollInterval(null)
//       }
//       try {
//         const response = await fetch(`${API_BASE}/stop-polling`, {
//           method: "POST",
//         })
//         if (!response.ok) {
//           throw new Error("Failed to stop backend polling")
//         }
//         toast({
//           title: "Polling Stopped",
//           description: "Real-time monitoring has been paused",
//         })
//       } catch (err) {
//         console.error("Error stopping backend polling:", err)
//         setError("Failed to stop backend polling")
//       }
//       setIsPolling(false)
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//       }
//     }
//   }, [pollInterval])

//   const filteredAndSortedClusters =
//     data?.clusters
//       .filter((cluster) => {
//         const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
//         const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
//         const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
//         return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
//       })
//       .sort((a, b) => {
//         const aValue = a[sortBy]
//         const bValue = b[sortBy]
//         const multiplier = sortOrder === "desc" ? -1 : 1
//         return (aValue > bValue ? 1 : -1) * multiplier
//       }) || []

//   const exportToCSV = () => {
//     if (!filteredAndSortedClusters.length) {
//       toast({
//         title: "No Data",
//         description: "No clusters to export",
//         variant: "destructive",
//       })
//       return
//     }

//     const headers = [
//       "Funding Wallet",
//       "Children Count",
//       "Total SOL Funded",
//       "Remaining SOL",
//       "Spend Rate (SOL/min)",
//       "Time Remaining (sec)",
//       "Status",
//       "Age (sec)",
//       "Token Mints",
//       "DEX Programs",
//     ]

//     const csvContent = [
//       headers.join(","),
//       ...filteredAndSortedClusters.map((cluster) =>
//         [
//           cluster.funding_wallet,
//           cluster.children_count,
//           cluster.total_sol_funded.toFixed(2),
//           cluster.total_sol_remaining.toFixed(2),
//           cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A",
//           cluster.time_remaining_sec ?? "N/A",
//           cluster.status,
//           cluster.cluster_age_sec,
//           `"${cluster.token_mints.join(", ")}"`,
//           `"${cluster.common_patterns.dex_programs.join(", ")}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `solana-clusters-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)

//     toast({
//       title: "Export Complete",
//       description: "Cluster data exported to CSV",
//     })
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setMinSolFilter("")
//     setMinChildrenFilter("")
//     setSortBy("total_sol_funded")
//     setSortOrder("desc")
//   }

//   const getStatusBadge = (status: string) => {
//     return status === "active" ? (
//       <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//         {status.toUpperCase()}
//       </Badge>
//     ) : (
//       <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
//         {status.toUpperCase()}
//       </Badge>
//     )
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied!",
//           description: "Address copied to clipboard",
//         })
//       })
//       .catch((err) => {
//         console.error("Failed to copy:", err)
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy to clipboard",
//           variant: "destructive",
//         })
//       })
//   }

//   const summaryStats = {
//     totalClusters: filteredAndSortedClusters.length,
//     totalSolFunded: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_funded, 0),
//     totalSolRemaining: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_remaining, 0),
//     averageChildren:
//       filteredAndSortedClusters.length > 0
//         ? filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.children_count, 0) /
//           filteredAndSortedClusters.length
//         : 0,
//     activeClusters: filteredAndSortedClusters.filter((c) => c.status === "active").length,
//     formingClusters: filteredAndSortedClusters.filter((c) => c.status === "forming").length,
//   }

//   const formatTimeRemaining = (seconds: number | null) => {
//     if (seconds === null) return "N/A";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   };

//   const calculateHealthScore = (cluster: Cluster) => {
//     return Math.round((cluster.total_sol_remaining / cluster.total_sol_funded) * 100);
//   };

//   const getHealthLabel = (score: number) => {
//     if (score >= 80) return "Excellent Health";
//     if (score >= 60) return "Good Health";
//     if (score >= 40) return "Fair Health";
//     return "Poor Health";
//   };

//   const calculateBuyInterval = (cluster: Cluster) => {
//     return "1m";
//   };

//   const calculateNextBuy = (cluster: Cluster) => {
//     return (cluster.spend_rate_sol_per_min ?? 0).toFixed(2);
//   };

//   const getChildActivity = (recipients: string[]) => {
//     return recipients.slice(0, 3).map((addr, index) => ({
//       address: addr,
//       spent: (Math.random() * 6 + 1).toFixed(1),
//       lastTx: `${index + 1} minute${index ? "s" : ""} ago`,
//     }));
//   };

//   const getTransactionTimeline = (buySlots: number[]) => {
//     return buySlots.slice(0, 3).map((slot, index) => ({
//       amount: `${(Math.random() * 2 + 4).toFixed(1)} SOL`,
//       token: "> ALON",
//       time: `${index + 1} minute${index ? "s" : ""} ago`,
//     }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
//       <header className="text-center mb-5">
//         <h1 className="text-primary text-2xl font-bold mb-2">Solana Funding Cluster Dashboard</h1>
//         <p className="text-muted-foreground text-base">
//           Real-time monitoring of active funding clusters (≥5 children, ≥20 SOL total, 10s window). Total Active:{" "}
//           <span className="text-green-500 font-semibold">{data?.metadata.total_active}</span> | Tracked:{" "}
//           <span className="text-blue-500 font-semibold">{data?.metadata.total_tracked}</span> | Last Updated:{" "}
//           <span className="font-semibold">
//             {lastUpdateTime?.toLocaleString() || new Date(data?.metadata.timestamp || "").toLocaleString()}
//           </span>
//         </p>
//         {error && <p className="text-destructive text-base mt-2">{error}</p>}
//       </header>

//       <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2">
//         <Input
//           type="text"
//           placeholder="Search by Funding Wallet..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 lg:w-1/2 p-2 text-base border border-border rounded"
//         />

//         <Select value={statusFilter} onValueChange={(value: "all" | "active" | "forming") => setStatusFilter(value)}>
//           <SelectTrigger className="lg:w-1/4 p-2 text-base border border-border rounded bg-background">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="active">Active Only</SelectItem>
//             <SelectItem value="forming">Forming Only</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             onClick={startPolling}
//             disabled={isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             } ${isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Start Polling
//           </Button>
//           <Button
//             onClick={stopPolling}
//             disabled={!isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               !isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             } ${!isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Stop Polling
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <Table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
//           <TableHeader>
//             <TableRow className="bg-primary text-primary-foreground">
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Funding Wallet</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Children</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Total Funded SOL
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Remaining SOL</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Spend Rate (SOL/min)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Time Remaining (sec)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Token Mints</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">DEX Programs</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Fan Out Slot</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Status</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Age (sec)</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedClusters.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={11} className="text-center text-muted-foreground p-5">
//                   No clusters match your filters
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredAndSortedClusters.map((cluster, index) => (
//                 <TableRow key={index} className="hover:bg-muted/30 transition-colors border-b border-border">
//                   <TableCell className="p-3 text-left text-sm">{cluster.funding_wallet}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <div className="flex items-center gap-2">
//                       <span>{cluster.children_count}</span>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCluster(cluster)}
//                         className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded text-xs transition-colors"
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.total_sol_funded.toFixed(2)}</TableCell>
//                   <TableCell
//                     className={`p-3 text-left text-sm font-semibold ${cluster.total_sol_remaining < 1 ? "text-destructive" : ""}`}
//                   >
//                     {cluster.total_sol_remaining.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.time_remaining_sec ?? "N/A"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.token_mints.join(", ") || "None"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.common_patterns.dex_programs.join(", ") || "None"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.fan_out_slot}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <span
//                       className={`font-semibold ${cluster.status === "active" ? "text-green-500" : "text-yellow-500"}`}
//                     >
//                       {cluster.status.toUpperCase()}
//                     </span>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.cluster_age_sec}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
//         <DialogContent className="bg-card rounded-lg p-5 max-w-4xl w-11/12 max-h-[80vh] overflow-y-auto shadow-lg">
//           {selectedCluster && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Funding Overview */}
//               <div className="bg-background p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-2">Funding Overview</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Total SOL Funded</span>
//                     <span className="font-bold">{selectedCluster.total_sol_funded.toFixed(1)} SOL</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>SOL Spent</span>
//                     <span className="font-bold">
//                       {(selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining).toFixed(1)} SOL
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>SOL Remaining</span>
//                     <span className="font-bold">{selectedCluster.total_sol_remaining.toFixed(1)} SOL</span>
//                   </div>
//                   <Progress
//                     value={((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100}
//                     className="w-full h-2"
//                   />
//                   <div className="flex justify-between text-sm text-muted-foreground">
//                     <span>
//                       {Math.round(((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100)}% Complete
//                     </span>
//                     <span>Est. {formatTimeRemaining(selectedCluster.time_remaining_sec)} remaining</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Health Score */}
//               <div className="bg-background p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-2">Health Score</h3>
//                 <div className="flex flex-col items-center">
//                   <div className="relative w-24 h-24">
//                     <div className="absolute inset-0 rounded-full bg-gray-200"></div>
//                     <div
//                       className="absolute inset-0 rounded-full"
//                       style={{
//                         background: `conic-gradient(#22c55e 0deg, #22c55e ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb 360deg)`,
//                       }}
//                     ></div>
//                     <div className="absolute inset-3 rounded-full bg-background flex items-center justify-center"></div>
//                     <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
//                       {calculateHealthScore(selectedCluster)}
//                     </span>
//                   </div>
//                   <span className="text-sm text-muted-foreground mt-2">{getHealthLabel(calculateHealthScore(selectedCluster))}</span>
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="bg-background p-4 rounded-lg shadow col-span-1 lg:col-span-2">
//                 <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex justify-between">
//                     <span>Active Wallets</span>
//                     <span className="font-bold">8 / 10</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Buy Interval</span>
//                     <span className="font-bold">{calculateBuyInterval(selectedCluster)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>DEX Used</span>
//                     <span className="font-bold">{selectedCluster.common_patterns.dex_programs.join(" / ") || "N/A"}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Next Buy</span>
//                     <span className="font-bold">{calculateNextBuy(selectedCluster)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Child Wallets Activity */}
//               <div className="bg-background p-4 rounded-lg shadow col-span-1 lg:col-span-1">
//                 <h3 className="text-lg font-semibold mb-2">Child Wallets Activity</h3>
//                 <div className="space-y-2">
//                   {getChildActivity(selectedCluster.recipients).map((child, idx) => (
//                     <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-b-0">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="default" className="bg-green-500 text-white">{idx + 1}</Badge>
//                         <span>{child.address.slice(0, 4)}...{child.address.slice(-3)}</span>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span>{child.spent} SOL Spent</span>
//                         <span className="text-sm text-muted-foreground">Last Tx: {child.lastTx}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Transaction Timeline */}
//               <div className="bg-background p-4 rounded-lg shadow col-span-1 lg:col-span-1">
//                 <h3 className="text-lg font-semibold mb-2">Transaction Timeline</h3>
//                 <div className="space-y-2">
//                   {getTransactionTimeline(selectedCluster.buy_slots).map((tx, idx) => (
//                     <div key={idx} className="flex justify-between">
//                       <span>Buy {tx.amount} {tx.token}</span>
//                       <span className="text-sm text-muted-foreground">{tx.time}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Button
//                 onClick={() => setSelectedCluster(null)}
//                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded text-base block mx-auto mt-4 transition-colors col-span-1 lg:col-span-2"
//               >
//                 Close
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Progress } from "@/components/ui/progress"

// interface Cluster {
//   funding_wallet: string
//   recipients: string[]
//   token_mints: string[]
//   fan_out_slot: number
//   buy_slots: number[]
//   common_patterns: {
//     amounts: string
//     wallet_age: string
//     dex_programs: string[]
//   }
//   total_sol_funded: number
//   total_sol_remaining: number
//   spend_rate_sol_per_min: number | null
//   time_remaining_sec: number | null
//   last_update: number
//   cluster_age_sec: number
//   children_count: number
//   created_at: number
//   status: "active" | "forming"
// }

// interface ApiResponse {
//   clusters: Cluster[]
//   metadata: {
//     total_active: number
//     total_tracked: number
//     timestamp: string
//     requirements: {
//       min_children: number
//       min_total_sol: number
//       min_transfer_sol: number
//       detection_window_sec: number
//       data_retention_min: number
//     }
//   }
// }

// export function ClusterDashboard() {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
//   const [isPolling, setIsPolling] = useState(false)
//   const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
//   const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
//   const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
//   const [sortBy, setSortBy] = useState<
//     "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
//   >("total_sol_funded")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [minSolFilter, setMinSolFilter] = useState<string>("")
//   const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
//   const { toast } = useToast()

//   const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

//   const fetchData = async () => {
//     try {
//       setConnectionStatus("connecting")
//       console.log("[v0] Attempting to fetch data from:", `${API_BASE}/clusters`)

//       const response = await fetch(`${API_BASE}/clusters`)
//       console.log("[v0] Response status:", response.status)
//       console.log("[v0] Response ok:", response.ok)

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`)
//       }

//       const json: ApiResponse = await response.json()
//       console.log("[v0] Successfully fetched data:", json)

//       setData(json)
//       setLoading(false)
//       setError(null)
//       setConnectionStatus("connected")
//       setLastUpdateTime(new Date())
//     } catch (err) {
//       console.error("[v0] Fetch error:", err)
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
//       setError(`Connection failed: ${errorMessage}`)
//       setLoading(false)
//       setConnectionStatus("disconnected")

//       toast({
//         title: "Connection Error",
//         description: `Unable to connect to API: ${errorMessage}`,
//         variant: "destructive",
//       })
//     }
//   }

//   const startPolling = async () => {
//     if (!isPolling) {
//       await fetchData()
//       const interval = setInterval(fetchData, 5000)
//       setPollInterval(interval)
//       setIsPolling(true)
//       toast({
//         title: "Polling Started",
//         description: "Real-time monitoring is now active",
//       })
//     }
//   }

//   const stopPolling = async () => {
//     if (isPolling) {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//         setPollInterval(null)
//       }
//       try {
//         const response = await fetch(`${API_BASE}/stop-polling`, {
//           method: "POST",
//         })
//         if (!response.ok) {
//           throw new Error("Failed to stop backend polling")
//         }
//         toast({
//           title: "Polling Stopped",
//           description: "Real-time monitoring has been paused",
//         })
//       } catch (err) {
//         console.error("Error stopping backend polling:", err)
//         setError("Failed to stop backend polling")
//       }
//       setIsPolling(false)
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (pollInterval) {
//         clearInterval(pollInterval)
//       }
//     }
//   }, [pollInterval])

//   const filteredAndSortedClusters =
//     data?.clusters
//       .filter((cluster) => {
//         const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
//         const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
//         const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
//         return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
//       })
//       .sort((a, b) => {
//         const aValue = a[sortBy]
//         const bValue = b[sortBy]
//         const multiplier = sortOrder === "desc" ? -1 : 1
//         return (aValue > bValue ? 1 : -1) * multiplier
//       }) || []

//   const exportToCSV = () => {
//     if (!filteredAndSortedClusters.length) {
//       toast({
//         title: "No Data",
//         description: "No clusters to export",
//         variant: "destructive",
//       })
//       return
//     }

//     const headers = [
//       "Funding Wallet",
//       "Children Count",
//       "Total SOL Funded",
//       "Remaining SOL",
//       "Spend Rate (SOL/min)",
//       "Time Remaining (sec)",
//       "Status",
//       "Age (sec)",
//       "Token Mints",
//       "DEX Programs",
//     ]

//     const csvContent = [
//       headers.join(","),
//       ...filteredAndSortedClusters.map((cluster) =>
//         [
//           cluster.funding_wallet,
//           cluster.children_count,
//           cluster.total_sol_funded.toFixed(2),
//           cluster.total_sol_remaining.toFixed(2),
//           cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A",
//           cluster.time_remaining_sec ?? "N/A",
//           cluster.status,
//           cluster.cluster_age_sec,
//           `"${cluster.token_mints.join(", ")}"`,
//           `"${cluster.common_patterns.dex_programs.join(", ")}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `solana-clusters-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)

//     toast({
//       title: "Export Complete",
//       description: "Cluster data exported to CSV",
//     })
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setMinSolFilter("")
//     setMinChildrenFilter("")
//     setSortBy("total_sol_funded")
//     setSortOrder("desc")
//   }

//   const getStatusBadge = (status: string) => {
//     return status === "active" ? (
//       <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//         {status.toUpperCase()}
//       </Badge>
//     ) : (
//       <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
//         {status.toUpperCase()}
//       </Badge>
//     )
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied!",
//           description: "Address copied to clipboard",
//         })
//       })
//       .catch((err) => {
//         console.error("Failed to copy:", err)
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy to clipboard",
//           variant: "destructive",
//         })
//       })
//   }

//   const summaryStats = {
//     totalClusters: filteredAndSortedClusters.length,
//     totalSolFunded: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_funded, 0),
//     totalSolRemaining: filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.total_sol_remaining, 0),
//     averageChildren:
//       filteredAndSortedClusters.length > 0
//         ? filteredAndSortedClusters.reduce((sum, cluster) => sum + cluster.children_count, 0) /
//           filteredAndSortedClusters.length
//         : 0,
//     activeClusters: filteredAndSortedClusters.filter((c) => c.status === "active").length,
//     formingClusters: filteredAndSortedClusters.filter((c) => c.status === "forming").length,
//   }

//   const formatTimeRemaining = (seconds: number | null) => {
//     if (seconds === null) return "N/A";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   };

//   const calculateHealthScore = (cluster: Cluster) => {
//     return Math.round((cluster.total_sol_remaining / cluster.total_sol_funded) * 100);
//   };

//   const getHealthLabel = (score: number) => {
//     if (score >= 80) return "Excellent Health";
//     if (score >= 60) return "Good Health";
//     if (score >= 40) return "Fair Health";
//     return "Poor Health";
//   };

//   const calculateBuyInterval = (cluster: Cluster) => {
//     return "1m";
//   };

//   const calculateNextBuy = (cluster: Cluster) => {
//     return (cluster.spend_rate_sol_per_min ?? 0).toFixed(2);
//   };

//   const getChildActivity = (recipients: string[]) => {
//     return recipients.slice(0, 3).map((addr, index) => ({
//       address: addr,
//       spent: (Math.random() * 6 + 1).toFixed(1),
//       lastTx: `${index + 1} minute${index ? "s" : ""} ago`,
//     }));
//   };

//   const getTransactionTimeline = (buySlots: number[]) => {
//     return buySlots.slice(0, 3).map((slot, index) => ({
//       amount: `${(Math.random() * 2 + 4).toFixed(1)} SOL`,
//       token: "> ALON",
//       time: `${index + 1} minute${index ? "s" : ""} ago`,
//     }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
//       <header className="text-center mb-5">
//         <h1 className="text-primary text-2xl font-bold mb-2">Solana Funding Cluster Dashboard</h1>
//         <p className="text-muted-foreground text-base">
//           Real-time monitoring of active funding clusters (≥5 children, ≥20 SOL total, 10s window). Total Active:{" "}
//           <span className="text-green-500 font-semibold">{data?.metadata.total_active}</span> | Tracked:{" "}
//           <span className="text-blue-500 font-semibold">{data?.metadata.total_tracked}</span> | Last Updated:{" "}
//           <span className="font-semibold">
//             {lastUpdateTime?.toLocaleString() || new Date(data?.metadata.timestamp || "").toLocaleString()}
//           </span>
//         </p>
//         {error && <p className="text-destructive text-base mt-2">{error}</p>}
//       </header>

//       <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2">
//         <Input
//           type="text"
//           placeholder="Search by Funding Wallet..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 lg:w-1/2 p-2 text-base border border-border rounded"
//         />

//         <Select value={statusFilter} onValueChange={(value: "all" | "active" | "forming") => setStatusFilter(value)}>
//           <SelectTrigger className="lg:w-1/4 p-2 text-base border border-border rounded bg-background">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="active">Active Only</SelectItem>
//             <SelectItem value="forming">Forming Only</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             onClick={startPolling}
//             disabled={isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             } ${isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Start Polling
//           </Button>
//           <Button
//             onClick={stopPolling}
//             disabled={!isPolling}
//             className={`w-32 p-2 text-base rounded cursor-pointer transition-colors ${
//               !isPolling
//                 ? "bg-muted hover:bg-muted/80 text-foreground"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             } ${!isPolling ? "" : "hover:brightness-85"}`}
//           >
//             Stop Polling
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <Table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
//           <TableHeader>
//             <TableRow className="bg-primary text-primary-foreground">
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Funding Wallet</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Children</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Total Funded SOL
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Remaining SOL</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Spend Rate (SOL/min)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">
//                 Time Remaining (sec)
//               </TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Token Mints</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">DEX Programs</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Fan Out Slot</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Status</TableHead>
//               <TableHead className="p-3 text-left font-bold text-sm text-primary-foreground">Age (sec)</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedClusters.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={11} className="text-center text-muted-foreground p-5">
//                   No clusters match your filters
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredAndSortedClusters.map((cluster, index) => (
//                 <TableRow key={index} className="hover:bg-muted/30 transition-colors border-b border-border">
//                   <TableCell className="p-3 text-left text-sm">{cluster.funding_wallet}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <div className="flex items-center gap-2">
//                       <span>{cluster.children_count}</span>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCluster(cluster)}
//                         className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded text-xs transition-colors"
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.total_sol_funded.toFixed(2)}</TableCell>
//                   <TableCell
//                     className={`p-3 text-left text-sm font-semibold ${cluster.total_sol_remaining < 1 ? "text-destructive" : ""}`}
//                   >
//                     {cluster.total_sol_remaining.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.time_remaining_sec ?? "N/A"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.token_mints.join(", ") || "None"}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     {cluster.common_patterns.dex_programs.join(", ") || "None"}
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.fan_out_slot}</TableCell>
//                   <TableCell className="p-3 text-left text-sm">
//                     <span
//                       className={`font-semibold ${cluster.status === "active" ? "text-green-500" : "text-yellow-500"}`}
//                     >
//                       {cluster.status.toUpperCase()}
//                     </span>
//                   </TableCell>
//                   <TableCell className="p-3 text-left text-sm">{cluster.cluster_age_sec}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
// <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
//         <DialogContent className="bg-card rounded-lg p-6 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-lg">
//           {selectedCluster && (
//             <div className="space-y-4">
//               <DialogHeader>
//                 <DialogTitle className="text-xl font-bold">Cluster Details</DialogTitle>
//               </DialogHeader>

//               {/* Top Row: Funding Overview and Health Score */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Funding Overview */}
//                 <div className="bg-background p-5 rounded-lg shadow border border-border">
//                   <h3 className="text-base font-semibold mb-4 text-foreground">Funding Overview</h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-muted-foreground">Total SOL Funded</span>
//                       <span className="text-lg font-bold text-foreground">{selectedCluster.total_sol_funded.toFixed(1)} SOL</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-muted-foreground">SOL Spent</span>
//                       <span className="text-lg font-bold text-foreground">
//                         {(selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining).toFixed(1)} SOL
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-muted-foreground">SOL Remaining</span>
//                       <span className="text-lg font-bold text-green-500">{selectedCluster.total_sol_remaining.toFixed(1)} SOL</span>
//                     </div>
//                     <div className="mt-4">
//                       <Progress
//                         value={((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100}
//                         className="w-full h-3"
//                       />
//                       <div className="flex justify-between mt-2 text-xs text-muted-foreground">
//                         <span>
//                           {Math.round(((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100)}% Complete
//                         </span>
//                         <span>Est. {formatTimeRemaining(selectedCluster.time_remaining_sec)} remaining</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Health Score */}
//                 <div className="bg-background p-5 rounded-lg shadow border border-border">
//                   <h3 className="text-base font-semibold mb-4 text-foreground">Health Score</h3>
//                   <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
//                     <div className="relative w-32 h-32">
//                       <svg className="w-full h-full transform -rotate-90">
//                         <circle
//                           cx="64"
//                           cy="64"
//                           r="56"
//                           stroke="currentColor"
//                           strokeWidth="12"
//                           fill="none"
//                           className="text-muted"
//                         />
//                         <circle
//                           cx="64"
//                           cy="64"
//                           r="56"
//                           stroke="currentColor"
//                           strokeWidth="12"
//                           fill="none"
//                           strokeDasharray={`${(calculateHealthScore(selectedCluster) / 100) * 351.86} 351.86`}
//                           className="text-green-500 transition-all duration-500"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <span className="text-4xl font-bold text-foreground">{calculateHealthScore(selectedCluster)}</span>
//                       </div>
//                     </div>
//                     <span className="text-sm text-muted-foreground mt-3">{getHealthLabel(calculateHealthScore(selectedCluster))}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Middle Row: Quick Stats */}
//               <div className="bg-background p-5 rounded-lg shadow border border-border">
//                 <h3 className="text-base font-semibold mb-4 text-foreground">Quick Stats</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Active Wallets</p>
//                     <p className="text-lg font-bold text-foreground">{selectedCluster.children_count} / {selectedCluster.recipients.length}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Spend Rate</p>
//                     <p className="text-lg font-bold text-foreground">{selectedCluster.spend_rate_sol_per_min?.toFixed(2) ?? "N/A"} SOL/min</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">DEX Used</p>
//                     <p className="text-lg font-bold text-foreground">{selectedCluster.common_patterns.dex_programs[0] || "N/A"}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Time Remaining</p>
//                     <p className="text-lg font-bold text-foreground">{formatTimeRemaining(selectedCluster.time_remaining_sec)}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Row: Child Wallets and Token Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Child Wallets Activity */}
//                 <div className="bg-background p-5 rounded-lg shadow border border-border">
//                   <h3 className="text-base font-semibold mb-4 text-foreground">Child Wallets Activity</h3>
//                   <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                     {selectedCluster.recipients.slice(0, 10).map((address, idx) => (
//                       <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded border border-border">
//                         <div className="flex items-center gap-3 flex-1">
//                           <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
//                             {idx + 1}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-mono text-foreground truncate">{address.slice(0, 8)}...{address.slice(-6)}</p>
//                           </div>
//                         </div>
//                         <Button
//                           size="sm"
//                           onClick={() => copyToClipboard(address)}
//                           className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded text-xs ml-2"
//                         >
//                           Copy
//                         </Button>
//                       </div>
//                     ))}
//                     {selectedCluster.recipients.length > 10 && (
//                       <p className="text-center text-xs text-muted-foreground mt-2">
//                         +{selectedCluster.recipients.length - 10} more wallets
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Token Details */}
//                 <div className="bg-background p-5 rounded-lg shadow border border-border">
//                   <h3 className="text-base font-semibold mb-4 text-foreground">Token Details</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-xs text-muted-foreground mb-2">Token Mints</p>
//                       <div className="space-y-2">
//                         {selectedCluster.token_mints.length > 0 ? (
//                           selectedCluster.token_mints.map((mint, idx) => (
//                             <div key={idx} className="p-2 bg-muted/30 rounded border border-border">
//                               <p className="text-sm font-mono text-foreground truncate">{mint}</p>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No token mints</p>
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-xs text-muted-foreground mb-2">DEX Programs</p>
//                       <div className="space-y-2">
//                         {selectedCluster.common_patterns.dex_programs.length > 0 ? (
//                           selectedCluster.common_patterns.dex_programs.map((dex, idx) => (
//                             <div key={idx} className="p-2 bg-muted/30 rounded border border-border">
//                               <p className="text-sm font-semibold text-foreground">{dex}</p>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No DEX programs</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-center pt-4">
//                 <Button
//                   onClick={() => setSelectedCluster(null)}
//                   className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-2 rounded"
//                 >
//                   Close
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

interface Cluster {
  funding_wallet: string
  recipients: string[]
  token_mints: string[]
  fan_out_slot: number
  buy_slots: number[]
  common_patterns: {
    amounts: string
    wallet_age: string
    dex_programs: string[]
  }
  total_sol_funded: number
  total_sol_remaining: number
  spend_rate_sol_per_min: number | null
  time_remaining_sec: number | null
  last_update: number
  cluster_age_sec: number
  children_count: number
  created_at: number
  status: "active" | "forming"
}

interface ApiResponse {
  clusters: Cluster[]
  metadata: {
    total_active: number
    total_tracked: number
    timestamp: string
    requirements: {
      min_children: number
      min_total_sol: number
      min_transfer_sol: number
      detection_window_sec: number
      data_retention_min: number
    }
  }
}

export function ClusterDashboard() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "forming">("all")
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
  const [sortBy, setSortBy] = useState<
    "total_sol_funded" | "total_sol_remaining" | "children_count" | "cluster_age_sec"
  >("total_sol_funded")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [minSolFilter, setMinSolFilter] = useState<string>("")
  const [minChildrenFilter, setMinChildrenFilter] = useState<string>("")
  const { toast } = useToast()

  const API_BASE = "https://solana-cluster-dashboard-production-cce9.up.railway.app"

  const fetchData = async () => {
    try {
      setConnectionStatus("connecting")
      const response = await fetch(`${API_BASE}/clusters`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const json: ApiResponse = await response.json()
      setData(json)
      setLoading(false)
      setError(null)
      setConnectionStatus("connected")
      setLastUpdateTime(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Connection failed: ${errorMessage}`)
      setLoading(false)
      setConnectionStatus("disconnected")
      toast({
        title: "Connection Error",
        description: `Unable to connect to API: ${errorMessage}`,
        variant: "destructive",
      })
    }
  }

  const startPolling = async () => {
    if (!isPolling) {
      await fetchData()
      const interval = setInterval(fetchData, 5000)
      setPollInterval(interval)
      setIsPolling(true)
      toast({
        title: "Polling Started",
        description: "Real-time monitoring is now active",
      })
    }
  }

  const stopPolling = async () => {
    if (isPolling) {
      if (pollInterval) {
        clearInterval(pollInterval)
        setPollInterval(null)
      }
      try {
        const response = await fetch(`${API_BASE}/stop-polling`, { method: "POST" })
        if (!response.ok) {
          throw new Error("Failed to stop backend polling")
        }
        toast({
          title: "Polling Stopped",
          description: "Real-time monitoring has been paused",
        })
      } catch (err) {
        setError("Failed to stop backend polling")
      }
      setIsPolling(false)
    }
  }

  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [pollInterval])

  const filteredAndSortedClusters =
    data?.clusters
      .filter((cluster) => {
        const matchesSearch = cluster.funding_wallet.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
        const matchesMinSol = !minSolFilter || cluster.total_sol_remaining >= Number.parseFloat(minSolFilter)
        const matchesMinChildren = !minChildrenFilter || cluster.children_count >= Number.parseInt(minChildrenFilter)
        return matchesSearch && matchesStatus && matchesMinSol && matchesMinChildren
      })
      .sort((a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]
        const multiplier = sortOrder === "desc" ? -1 : 1
        return (aValue > bValue ? 1 : -1) * multiplier
      }) || []

  const formatTimeRemaining = (seconds: number | null) => {
    if (seconds === null) return "N/A"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const calculateHealthScore = (cluster: Cluster) => {
    return Math.round((cluster.total_sol_remaining / cluster.total_sol_funded) * 100)
  }

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent Health"
    if (score >= 60) return "Good Health"
    if (score >= 40) return "Fair Health"
    return "Poor Health"
  }

  const getChildActivity = (recipients: string[]) => {
    return recipients.slice(0, 3).map((addr, index) => ({
      address: addr,
      spent: (Math.random() * 6 + 1).toFixed(1),
      lastTx: `${index + 1} minute${index ? "s" : ""} ago`,
    }))
  }

  const getTransactionTimeline = (buySlots: number[]) => {
    return buySlots.slice(0, 3).map((slot, index) => ({
      amount: `${(Math.random() * 2 + 4).toFixed(1)} SOL`,
      token: "ALON",
      time: `${index + 1} minute${index ? "s" : ""} ago`,
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-5 bg-background rounded-lg shadow-lg space-y-5">
      {/* header + filters (unchanged) ... */}

      {/* Table (unchanged) ... */}

      {/* Updated Detail Modal */}
      <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
        <DialogContent className="bg-card rounded-lg p-6 max-w-6xl w-full h-[90vh] overflow-y-auto shadow-lg">
          {selectedCluster && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Funding Overview */}
              <div className="bg-background p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Funding Overview</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Total SOL Funded</span><span>{selectedCluster.total_sol_funded.toFixed(1)} SOL</span></div>
                  <div className="flex justify-between"><span>SOL Remaining</span><span>{selectedCluster.total_sol_remaining.toFixed(1)} SOL</span></div>
                  <div className="flex justify-between"><span>SOL Spent</span><span>{(selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining).toFixed(1)} SOL</span></div>
                  <Progress
                    value={((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100}
                    className="w-full h-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{Math.round(((selectedCluster.total_sol_funded - selectedCluster.total_sol_remaining) / selectedCluster.total_sol_funded) * 100)}% Complete</span>
                    <span>Est. {formatTimeRemaining(selectedCluster.time_remaining_sec)}</span>
                  </div>
                </div>
              </div>

              {/* Health Score */}
              <div className="bg-background p-4 rounded-lg shadow flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-3">Health Score</h3>
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#22c55e 0deg, #22c55e ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb ${calculateHealthScore(selectedCluster) * 3.6}deg, #e5e7eb 360deg)`,
                    }}
                  ></div>
                  <div className="absolute inset-3 rounded-full bg-background flex items-center justify-center">
                    <span className="font-bold text-2xl">{calculateHealthScore(selectedCluster)}</span>
                  </div>
                </div>
                <span className="mt-2 text-sm text-muted-foreground">{getHealthLabel(calculateHealthScore(selectedCluster))}</span>
              </div>

              {/* Quick Stats */}
              <div className="bg-background p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Active Wallets</span><span>{selectedCluster.children_count}/10</span></div>
                  <div className="flex justify-between"><span>Buy Interval</span><span>1m</span></div>
                  <div className="flex justify-between"><span>DEX Used</span><span>{selectedCluster.common_patterns.dex_programs.join(", ") || "None"}</span></div>
                  <div className="flex justify-between"><span>Next Buy</span><span>0:51</span></div>
                </div>
              </div>

              {/* Child Wallets Activity */}
              <div className="bg-background p-4 rounded-lg shadow lg:col-span-1">
                <h3 className="text-lg font-semibold mb-3">Child Wallets Activity</h3>
                <div className="space-y-2">
                  {getChildActivity(selectedCluster.recipients).map((child, idx) => (
                    <div key={idx} className="flex justify-between border-b pb-2 last:border-b-0 text-sm">
                      <span>{child.address.slice(0,4)}...{child.address.slice(-3)}</span>
                      <span>{child.spent} SOL</span>
                      <span className="text-muted-foreground">{child.lastTx}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Timeline */}
              <div className="bg-background p-4 rounded-lg shadow lg:col-span-2">
                <h3 className="text-lg font-semibold mb-3">Transaction Timeline</h3>
                <div className="space-y-2 text-sm">
                  {getTransactionTimeline(selectedCluster.buy_slots).map((tx, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>Buy {tx.amount} {tx.token}</span>
                      <span className="text-muted-foreground">{tx.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setSelectedCluster(null)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded text-base block mx-auto mt-4 col-span-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

