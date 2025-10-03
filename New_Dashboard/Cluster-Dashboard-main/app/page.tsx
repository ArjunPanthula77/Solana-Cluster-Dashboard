
// "use client"

// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Navigation } from "@/components/navigation"
// import { TrendingUp, Activity, Shield, Zap, BarChart3, Users, Twitter, Linkedin, Github, Mail } from "lucide-react"
// import { useState } from "react"

// export default function HomePage() {
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   const handleDashboardClick = (e: React.MouseEvent) => {
//     if (!isLoggedIn) {
//       e.preventDefault()
//       alert("Please log in to access the dashboard.")
//       router.push("/#login")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <Navigation setIsLoggedInState={setIsLoggedIn} />

//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
//             <Activity className="w-3 h-3 mr-1" />
//             Real-time Monitoring
//           </Badge>
//           <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
//             Monitor Solana Funding
//             <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Clusters</span>
//           </h1>
//           <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
//             Track active funding clusters, analyze trading patterns, and stay ahead of market movements with real-time
//             Solana blockchain monitoring.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//          <Link href="/dashboard" onClick={handleDashboardClick}>
//               <Button
//                 size="lg"
//                 className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25 transition-all duration-300"
//               >
//                 <BarChart3 className="mr-2 h-5 w-5" />
//                 View Dashboard
//               </Button>
//             </Link> 

//             {/* <Link href="/d" onClick={handleDashboardClick}>
//               <Button
//                 size="lg"
//                 className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25 transition-all duration-300"
//               >
//                 <BarChart3 className="mr-2 h-5 w-5" />
//                 View Dashboard
//               </Button>
//             </Link> */}

            
//             <Button
//               size="lg"
//               variant="outline"
//               className="w-full sm:w-auto bg-transparent border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
//             >
//               <TrendingUp className="mr-2 h-5 w-5" />
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Trading Intelligence</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Get the insights you need to make informed trading decisions on Solana
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <Activity className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Real-time Monitoring</CardTitle>
//                 <CardDescription>Track funding clusters as they form and evolve in real-time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• Live cluster detection</li>
//                   <li>• 5-second polling intervals</li>
//                   <li>• Instant status updates</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <TrendingUp className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Pattern Analysis</CardTitle>
//                 <CardDescription>Identify common trading patterns and wallet behaviors</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• DEX program tracking</li>
//                   <li>• Wallet age analysis</li>
//                   <li>• Amount pattern detection</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <Shield className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Risk Assessment</CardTitle>
//                 <CardDescription>Monitor spend rates and remaining balances for risk management</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• SOL spend rate tracking</li>
//                   <li>• Time remaining estimates</li>
//                   <li>• Low balance alerts</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <Zap className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Fast Detection</CardTitle>
//                 <CardDescription>Detect clusters within 10-second windows with high precision</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• Minimum 5 children required</li>
//                   <li>• 20+ SOL threshold</li>
//                   <li>• 10-second detection window</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <Users className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Child Wallet Tracking</CardTitle>
//                 <CardDescription>View and analyze all child wallets within each cluster</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• Complete recipient lists</li>
//                   <li>• One-click address copying</li>
//                   <li>• Cluster relationship mapping</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group">
//               <CardHeader>
//                 <div className="relative">
//                   <BarChart3 className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <CardTitle>Advanced Filtering</CardTitle>
//                 <CardDescription>Filter and search clusters by multiple criteria</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="text-sm text-muted-foreground space-y-2">
//                   <li>• Status-based filtering</li>
//                   <li>• Wallet address search</li>
//                   <li>• Custom time ranges</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>
//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Monitoring?</h2>
//           <p className="text-lg text-muted-foreground mb-8">
//             Join traders who use SolanaWatch to stay ahead of market movements
//           </p>
//           <Link href="/dashboard" onClick={handleDashboardClick}>
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25 transition-all duration-300"
//             >
//               <Activity className="mr-2 h-5 w-5" />
//               Launch Dashboard
//             </Button>
//           </Link>
//         </div>
//       </section>

//       <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             {/* Brand Section */}
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-3 mb-4">
//                 <svg className="h-8 w-8 text-primary" viewBox="0 0 397.7 311.7" fill="currentColor">
//                   <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 237.9z" />
//                   <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
//                   <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
//                 </svg>
//                 <div className="flex flex-col">
//                   <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
//                     Solana
//                   </span>
//                   <span className="text-sm font-medium text-muted-foreground -mt-1">Watch</span>
//                 </div>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-md">
//                 Real-time Solana cluster monitoring for advanced traders. Track funding patterns, analyze wallet
//                 behaviors, and stay ahead of market movements.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="/" className="hover:text-primary transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/dashboard" onClick={handleDashboardClick} className="hover:text-primary transition-colors">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     Documentation
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Connect</h3>
//               <div className="flex space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Twitter className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Github className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Mail className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-border pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2024 SolanaWatch. All rights reserved.</div>
//               <div className="flex space-x-6 text-sm text-muted-foreground">
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Privacy Policy
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Terms of Service
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Support
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Navigation } from "@/components/navigation"
// import {
//   BarChart3,
//   Twitter,
//   Linkedin,
//   Github,
//   Mail,
//   CheckCircle,
//   ArrowRight,
//   Play,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react"

// export default function HomePage() {
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
//   const [openFaq, setOpenFaq] = useState<number | null>(null)
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
//   const [isClient, setIsClient] = useState(false)

//   // Defer state-dependent rendering until client-side
//   useEffect(() => {
//     // Simulate auth check (replace with actual auth logic)
//     const checkAuth = async () => {
//       const loggedIn = false // Replace with real auth check
//       setIsLoggedIn(loggedIn)
//     }
//     checkAuth()
//     setIsClient(true) // Mark as client-side to allow state rendering
//   }, [])

//   const handleDashboardClick = (e: React.MouseEvent) => {
//     if (isLoggedIn === false) {
//       e.preventDefault()
//       alert("Please log in to access the dashboard.")
//       router.push("/#login")
//     }
//   }

//   const faqs = [
//     {
//       question: "What is Opsonchain?",
//       answer:
//         "Opsonchain is a real-time blockchain monitoring platform that helps advanced traders track smart money movements, analyze wallet behaviors, and stay ahead of market trends.",
//     },
//     {
//       question: "How does Opsonchain work?",
//       answer:
//         "Our platform monitors blockchain transactions in real-time, identifying patterns and behaviors of successful traders and institutional investors, giving you insights before price movements occur.",
//     },
//     {
//       question: "What features does Opsonchain offer?",
//       answer:
//         "We offer smart money tracking, wallet analysis, trend detection, copy trading features, and comprehensive analytics tools for blockchain monitoring.",
//     },
//     {
//       question: "Is Opsonchain suitable for beginners?",
//       answer:
//         "While our platform is designed for advanced traders, we provide comprehensive documentation and support to help users of all levels understand and utilize our tools effectively.",
//     },
//     {
//       question: "What subscription plans are available?",
//       answer:
//         "We offer three tiers: Free (basic features), PRO ($67/month), and Legend ($667/month) with advanced features and priority support.",
//     },
//     {
//       question: "How do I cancel my membership?",
//       answer:
//         "You can cancel your subscription at any time from your account settings. All cancellations are processed immediately with access continuing until the end of your billing period.",
//     },
//     {
//       question: "What makes Opsonchain different?",
//       answer:
//         "Our real-time analysis, comprehensive database coverage, and advanced pattern recognition algorithms set us apart from other blockchain monitoring tools.",
//     },
//   ]

//   // Render a placeholder until client-side hydration is complete
//   if (!isClient) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navigation setIsLoggedInState={() => {}} />
//         <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
//           <p>Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <Navigation setIsLoggedInState={setIsLoggedIn} />

//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
//                   Track the smart money movements. <span className="text-primary">Position</span> before price impact.
//                 </h1>
//                 <p className="text-lg text-muted-foreground max-w-lg text-pretty">
//                   Real-time blockchain analysis covering all aspects of smart money behavior in a consistent and reliable format.
//                 </p>
//               </div>

//               {/* Feature List */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">Real-time smart money tracking</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">Comprehensive blockchain database</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">Early trend detection</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">Spot insider wallets</span>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link href="/dashboard" onClick={handleDashboardClick}>
//                   <Button
//                     size="lg"
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium w-full sm:w-auto"
//                     disabled={isLoggedIn === null}
//                   >
//                     {isLoggedIn === null ? "Loading..." : "Stop Missing Out"}
//                   </Button>
//                 </Link>
//                 <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                   <Play className="h-4 w-4" />
//                   <span>30-Day Money-Back Guarantee</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Dashboard Preview */}
//             <div className="relative">
//               <div className="bg-muted/30 rounded-2xl p-8 border border-border">
//                 <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center">
//                   <div className="text-center space-y-4">
//                     <BarChart3 className="h-16 w-16 text-primary mx-auto" />
//                     <div className="space-y-2">
//                       <div className="h-2 bg-muted rounded w-32 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-24 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-28 mx-auto"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-4xl mx-auto text-center space-y-16">
//           <div className="space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
//               Unlock the Most Advanced Smart Money Tools
//             </h2>
//             <p className="text-lg text-muted-foreground text-pretty">
//               Everything you need to track, analyze, and act on smart money flows in real time.
//             </p>
//           </div>

//           {/* Feature Accordion */}
//           <div className="space-y-4 text-left">
//             {[
//               {
//                 title: "SOL Feed",
//                 description:
//                   "Track SOL trades live with wallet feeds. Position before between every last margin to send market moves that stay ahead of retail.",
//                 isActive: true,
//               },
//               {
//                 title: "SOL Leaderboard",
//                 description: "Discover top performing wallets and their trading strategies.",
//                 isActive: false,
//               },
//               {
//                 title: "Top SOL Tokens",
//                 description: "Monitor the most active tokens and their smart money flows.",
//                 isActive: false,
//               },
//               {
//                 title: "Daily Trends",
//                 description: "Get daily insights on market movements and wallet behaviors.",
//                 isActive: false,
//               },
//               {
//                 title: "Top Tokens",
//                 description: "Track the highest volume tokens across all chains.",
//                 isActive: false,
//               },
//               {
//                 title: "Trends Analytics",
//                 description: "Advanced analytics for identifying emerging trends.",
//                 isActive: false,
//               },
//               {
//                 title: "Transactions",
//                 description: "Real-time transaction monitoring and analysis.",
//                 isActive: false,
//               },
//               {
//                 title: "Wallet Finder",
//                 description: "Find and analyze specific wallet addresses.",
//                 isActive: false,
//               },
//               {
//                 title: "Cabal Finder",
//                 description: "Identify coordinated wallet groups and their activities.",
//                 isActive: false,
//               },
//               {
//                 title: "Copy Traders",
//                 description: "Automatically copy successful trader strategies.",
//                 isActive: false,
//               },
//             ].map((feature, index) => (
//               <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
//                     <div className="flex items-center space-x-3">
//                       <div
//                         className={`w-2 h-2 rounded-full ${feature.isActive ? "bg-primary" : "bg-muted-foreground"}`}
//                       ></div>
//                       <span className="font-medium text-foreground">{feature.title}</span>
//                     </div>
//                     <ArrowRight className="h-4 w-4 text-muted-foreground" />
//                   </div>
//                   {feature.isActive && <p className="text-sm text-muted-foreground pl-4">{feature.description}</p>}
//                 </div>

//                 {feature.isActive && (
//                   <div className="bg-card rounded-lg border border-border p-6">
//                     <div className="space-y-3">
//                       {[1, 2, 3, 4, 5].map((row) => (
//                         <div
//                           key={row}
//                           className="flex items-center justify-between py-2 border-b border-border last:border-0"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-6 h-6 bg-muted rounded-full"></div>
//                             <div className="space-y-1">
//                               <div className="h-2 bg-muted rounded w-16"></div>
//                               <div className="h-2 bg-muted rounded w-12"></div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <div className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">
//                               {row % 2 === 0 ? "SELL" : "BUY"}
//                             </div>
//                             <div className="text-xs text-muted-foreground">${(Math.random() * 1000).toFixed(0)}K</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-muted-foreground text-pretty">
//               These opportunities happen every week. The difference between profit and regret is having the right tools to spot them early.
//             </p>
//             <Link href="/dashboard" onClick={handleDashboardClick}>
//               <Button
//                 size="lg"
//                 className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
//                 disabled={isLoggedIn === null}
//               >
//                 {isLoggedIn === null ? "Loading..." : "Start Tracking Smart Money Now"}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-6xl mx-auto text-center space-y-16">
//           <div className="space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
//               Your Edge in the Fastest-Moving Market
//             </h2>
//             <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
//               While others rely on Twitter rumors and gut feelings, you'll trade with institutional-grade intelligence.
//             </p>
//           </div>

//           {/* Three Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Discover Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center">
//                 <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">MEW</div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Discover</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Discover the most promising opportunities before they go viral
//                 </p>
//               </div>
//             </div>

//             {/* Monitor Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-muted-foreground">Open</span>
//                     <span className="text-xs text-muted-foreground">1 min ago</span>
//                     <span className="text-xs text-muted-foreground">$3150</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
//                     <span className="text-sm font-medium">BUZZ</span>
//                     <span className="text-green-500 text-sm">+ $194.57K</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Monitor</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Monitor whale movements and insider trading patterns in real-time
//                 </p>
//               </div>
//             </div>

//             {/* Trade Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   {[
//                     { name: "shrimp", token: "PLANETUS", amount: "+ $8.45K", verified: true },
//                     { name: "CookerHill", token: "SLM", amount: "+ $1.40K", verified: true },
//                     { name: "Bastille", token: "meowcoins", amount: "+ $1.77K", verified: true },
//                   ].map((trader, i) => (
//                     <div key={i} className="flex items-center justify-between text-xs">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-4 h-4 bg-muted rounded-full"></div>
//                         <span>{trader.name}</span>
//                         {trader.verified && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-muted-foreground">{trader.token}</span>
//                         <span className="text-green-500">{trader.amount}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Trade</h3>
//                 <p className="text-muted-foreground text-sm">Trade alongside world's top crypto cabals</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">Try risk-free, money back guarantee.</p>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto text-center space-y-16">
//           <div className="space-y-6">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
//               Join the Smart Money Inner Circle
//             </h2>
//             <p className="text-lg text-muted-foreground text-pretty">
//               Stop chasing signals. Start tracking what actually matters.
//             </p>

//             {/* Billing Toggle */}
//             <div className="flex items-center justify-center space-x-4">
//               <span className={`text-sm ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
//                 Monthly
//               </span>
//               <button
//                 onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
//                 className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//               <span className={`text-sm ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
//                 Yearly
//                 <span className="ml-1 text-green-500 text-xs">Save up to 58%</span>
//               </span>
//             </div>
//           </div>

//           {/* Pricing Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Free Plan */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-foreground">Free</h3>
//                 <div className="space-y-2">
//                   <div className="text-3xl font-bold text-foreground">$0</div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                   <div className="space-y-1">
//                     <div className="font-medium text-foreground">KOL Live Feed (Public KOLs only)</div>
//                     <div className="text-sm text-muted-foreground">Track KOLs that has their wallets public</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                   <div className="space-y-1">
//                     <div className="font-medium text-foreground">KOL Leaderboard</div>
//                     <div className="text-sm text-muted-foreground">
//                       Ranking leaderboards for KOLs and tokens they trade
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Button className="w-full bg-transparent" variant="outline">
//                 Get Started
//               </Button>
//             </div>

//             {/* PRO Plan */}
//             <div className="bg-card rounded-2xl p-8 border-2 border-primary space-y-6 relative">
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-foreground">PRO</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-baseline space-x-2">
//                     <span className="text-sm text-muted-foreground line-through">$149</span>
//                     <span className="text-3xl font-bold text-foreground">
//                       ${billingCycle === "monthly" ? "67" : "799"}
//                     </span>
//                     <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
//                     <span className="text-green-500 text-sm">You save 55%</span>
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Billed annually as ${billingCycle === "monthly" ? "$799" : "$7,999"}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {[
//                   {
//                     title: "My Stalks: Wallet tracking system",
//                     desc: "Up to 10 wallets with real-time notifications and full analytics",
//                   },
//                   {
//                     title: "KOL Feed: 500+ influencers",
//                     desc: "Fastest real-time detector on market, avg 2s from tx submit to your feed",
//                   },
//                   {
//                     title: "Smart Money Tracker",
//                     desc: "Smart Money accumulation/dumping patterns. SOL and Memecoins trend analysis",
//                   },
//                   {
//                     title: "Wallet & Cabal Finder",
//                     desc: "All in one tool to find wallets in minutes, based on their buys/sells or leaked characters. Identify recurring top traders in different memecoins",
//                   },
//                   {
//                     title: "Token Insiders analysis",
//                     desc: "Unrealized PNL monitoring Token distribution analysis Average holding time metrics",
//                   },
//                   { title: "Copytrader Checker", desc: "Copytrader quantity analysis per wallet" },
//                 ].map((feature, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                     <div className="space-y-1">
//                       <div className="font-medium text-foreground">{feature.title}</div>
//                       <div className="text-sm text-muted-foreground">{feature.desc}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 <Button className="w-full bg-primary hover:bg-primary/90">Pay with Crypto</Button>
//                 <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
//                   <CheckCircle className="h-4 w-4" />
//                   <span>30-day money back guarantee</span>
//                 </div>
//               </div>
//             </div>

//             {/* Legend Plan */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-foreground">Legend</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-baseline space-x-2">
//                     <span className="text-sm text-muted-foreground line-through">$1,499</span>
//                     <span className="text-3xl font-bold text-foreground">
//                       ${billingCycle === "monthly" ? "667" : "7999"}
//                     </span>
//                     <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
//                     <span className="text-green-500 text-sm">You save 56%</span>
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Billed annually as ${billingCycle === "monthly" ? "$7,999" : "$79,999"}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                   <div className="font-medium text-foreground">Everything in PRO plan</div>
//                 </div>
//                 {[
//                   "DCA Open order feed",
//                   "Whale Insights",
//                   "Fresh Wallet Feed",
//                   "Legend Community access",
//                   "Beta-test new tools",
//                 ].map((feature, i) => (
//                   <div key={i} className="flex items-start space-x-3">
//                     <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                     <div className="font-medium text-foreground">{feature}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 <Button className="w-full bg-primary hover:bg-primary/90">Join the Inner Circle</Button>
//                 <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
//                   <CheckCircle className="h-4 w-4" />
//                   <span>30-day money back guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-4xl mx-auto space-y-16">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="bg-card rounded-lg border border-border">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                   className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
//                 >
//                   <span className="font-medium text-foreground">{faq.question}</span>
//                   {openFaq === index ? (
//                     <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                   )}
//                 </button>
//                 {openFaq === index && (
//                   <div className="px-6 pb-4">
//                     <p className="text-muted-foreground">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">Try risk-free, money back guarantee.</p>
//           </div>
//         </div>
//       </section>

//       <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             {/* Brand Section */}
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-3 mb-4">
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Opsonchain
//                 </span>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-md">
//                 Real-time blockchain monitoring for advanced traders. Track funding patterns, analyze wallet behaviors,
//                 and stay ahead of market movements.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="/" className="hover:text-primary transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     onClick={handleDashboardClick}
//                     className="hover:text-primary transition-colors"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     Documentation
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Connect</h3>
//               <div className="flex space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Twitter className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Github className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Mail className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-border pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Opsonchain. All rights reserved.</div>
//               <div className="flex space-x-6 text-sm text-muted-foreground">
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Privacy Policy
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Terms of Service
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Support
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


















































































// "use client"

// import type React from "react"

// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Navigation } from "@/components/navigation"
// import {
//   BarChart3,
//   Twitter,
//   Linkedin,
//   Github,
//   Mail,
//   CheckCircle,
//   ChevronDown,
//   ChevronUp,
//   Activity,
//   TrendingUp,
//   Shield,
//   Zap,
//   Users,
//   BarChart,
// } from "lucide-react"
// import { useState } from "react"

// export default function HomePage() {
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [openFaq, setOpenFaq] = useState<number | null>(null)
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

//   const handleDashboardClick = (e: React.MouseEvent) => {
//     if (!isLoggedIn) {
//       e.preventDefault()
//       alert("Please log in to access the dashboard.")
//       router.push("/#login")
//     }
//   }
// const faqs = [
//     {
//       question: "What is Opsonchain?",
//       answer:
//         "Opsonchain is a real-time Solana on-chain monitoring platform that detects real-time cluster detection and trading patterns.",
//     },
//     {
//       question: "How does Opsonchain work?",
//       answer:
//         "It tracks parent-to-child wallet fundings, bundles, and token activity to give traders early insights.",
//     },
//     {
//       question: "What features does Opsonchain offer?",
//       answer:
//         "Live bundler detection, token load analysis, exit signals, and trading opportunity alerts.",
//     },
//     {
//       question: "Is Opsonchain suitable for beginners?",
//       answer:
//         "Yes, it provides clear insights with simple dashboards designed for all experience levels.",
//     },
//     {
//       question: "What makes Opsonchain different?",
//       answer:
//         "It’s the first Solana on-chain tool offering ultra-fast wallet cluster detection with actionable trading windows.",
//     },
// ]

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <Navigation setIsLoggedInState={setIsLoggedIn} />

//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance text-left">
//                   Know when the rug will happen, exit before it does.{" "}
//                 </h1>
//                 <p className="text-lg text-muted-foreground max-w-lg text-pretty">
//                   The first live bundler detector on Solana. Ultra-fast wallet cluster detection that shows you what
//                   token is being pumped, how much SOL is behind it, and when the exit door closes.
//                 </p>
//               </div>

//               {/* Feature List */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"First-of-its-kind real-time bundler detection"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"On-chain clarity, no rumors"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"Predict pumps before they peak"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"Exit safely, avoid rugs"}</span>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link href="/dashboard" onClick={handleDashboardClick}>
//                   <Button
//                     size="lg"
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium w-full sm:w-auto"
//                   >
//                     {"👉 Join the early access waitlist"}
//                   </Button>
//                 </Link>
//                 <div className="flex items-center space-x-2 text-sm text-muted-foreground"></div>
//               </div>
//             </div>

//             {/* Right Dashboard Preview */}
//             <div className="relative">
//               <div className="bg-muted/30 rounded-2xl p-8 border border-border">
//                 <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center">
//                   <div className="text-center space-y-4">
//                     <BarChart3 className="h-16 w-16 text-primary mx-auto" />
//                     <div className="space-y-2">
//                       <div className="h-2 bg-muted rounded w-32 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-24 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-28 mx-auto"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Advanced Trading Intelligence features section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto space-y-12">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
//               Advanced Trading Intelligence
//             </h2>
//             <p className="text-lg text-muted-foreground text-pretty">
//               Get the insights you need to make informed trading decisions on Solana
//             </p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Real-time Monitoring */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4 shadow-none">
//               <Activity className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Real-time Monitoring</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Track funding clusters as they form and evolve in real-time
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Live cluster detection</li>
//                 <li>• 5-second polling intervals</li>
//                 <li>• Instant status updates</li>
//               </ul>
//             </div>

//             {/* Pattern Analysis */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <TrendingUp className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Pattern Analysis</h3>
//                 <p className="text-muted-foreground text-sm">Identify common trading patterns and wallet behaviors</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• DEX program tracking</li>
//                 <li>• Wallet age analysis</li>
//                 <li>• Amount pattern detection</li>
//               </ul>
//             </div>

//             {/* Risk Assessment */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Shield className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Risk Assessment</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Monitor spend rates and remaining balances for risk management
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• SOL spend rate tracking</li>
//                 <li>• Time remaining estimates</li>
//                 <li>• Low balance alerts</li>
//               </ul>
//             </div>

//             {/* Fast Detection */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Zap className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Fast Detection</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Detect activities within 10-second windows with high precision
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Minimum 5 children required</li>
//                 <li>• 20+ SOL threshold</li>
//                 <li>• 10-second detection window</li>
//               </ul>
//             </div>

//             {/* Child Wallet Tracking */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Users className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Child Wallet Tracking</h3>
//                 <p className="text-muted-foreground text-sm">View and analyze all child wallets within each cluster</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Complete recipient lists</li>
//                 <li>• One-click address copying</li>
//                 <li>• Cluster relationship mapping</li>
//               </ul>
//             </div>

//             {/* Advanced Filtering */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <BarChart className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Advanced Filtering</h3>
//                 <p className="text-muted-foreground text-sm">Filter and search clusters by multiple criteria</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Status-based filtering</li>
//                 <li>• Wallet address search</li>
//                 <li>• Custom time ranges</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-6xl mx-auto text-center space-y-16">
//           <div className="space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">How it works</h2>
//             <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
//               While others rely on Twitter rumors and gut feelings, you'll trade with institutional-grade intelligence.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {/* Discover Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center">
//                 <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">MEW</div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Ultra-fast wallet clustering</h3>
//                 <p className="text-muted-foreground text-sm">
//                   OpsOnchain continuously monitors on-chain data to detect parent wallets funding child wallets in
//                   seconds
//                 </p>
//               </div>
//             </div>

//             {/* Monitor Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-muted-foreground">Open</span>
//                     <span className="text-xs text-muted-foreground">1 min ago</span>
//                     <span className="text-xs text-muted-foreground">$3150</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
//                     <span className="text-sm font-medium">BUZZ</span>
//                     <span className="text-green-500 text-sm">+ $194.57K</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">On-chain only</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Direct Solana RPC ingestion with no third-party feeds. 100% transparent, 100% real-time.
//                 </p>
//               </div>
//             </div>

//             {/* Analyze Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4 flex flex-col justify-center">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-muted-foreground">Risk Score</span>
//                     <span className="text-green-500 font-medium">Low</span>
//                   </div>
//                   <div className="w-full bg-muted rounded-full h-2">
//                     <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
//                   </div>
//                   <div className="flex items-center justify-between text-xs pt-2">
//                     <span className="text-muted-foreground">Wallet Age</span>
//                     <span className="text-foreground font-medium">45 days</span>
//                   </div>
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-muted-foreground">Success Rate</span>
//                     <span className="text-foreground font-medium">82%</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Live bundler telemetry</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Every wallet event - funding, token purchase, DEX entry is linked into a single cluster. You see the
//                   play forming before volume prints the chart.
//                 </p>
//               </div>
//             </div>

//             {/* Trade Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   {[
//                     { name: "shrimp", token: "PLANETUS", amount: "+ $8.45K", verified: true },
//                     { name: "CookerHill", token: "SLM", amount: "+ $1.40K", verified: true },
//                     { name: "Bastille", token: "meowcoins", amount: "+ $1.77K", verified: true },
//                   ].map((trader, i) => (
//                     <div key={i} className="flex items-center justify-between text-xs">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-4 h-4 bg-muted rounded-full"></div>
//                         <span>{trader.name}</span>
//                         {trader.verified && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-muted-foreground">{trader.token}</span>
//                         <span className="text-green-500">{trader.amount}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Quantified projections</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Remaining bankroll, spend velocity, and estimated upside runway are refreshed second-by-second.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">Try risk-free, money back guarantee.</p>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-4xl mx-auto space-y-16">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="bg-card rounded-lg border border-border">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                   className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
//                 >
//                   <span className="font-medium text-foreground">{faq.question}</span>
//                   {openFaq === index ? (
//                     <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                   )}
//                 </button>
//                 {openFaq === index && (
//                   <div className="px-6 pb-4">
//                     <p className="text-muted-foreground">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">👉 Join the early access waitlist</p>
//           </div>
//         </div>
//       </section>

//       <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             {/* Brand Section */}
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-3 mb-4">
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Opsonchain
//                 </span>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-md">
//                 Real-time blockchain monitoring for advanced traders. Track funding patterns, analyze wallet behaviors,
//                 and stay ahead of market movements.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="/" className="hover:text-primary transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     onClick={handleDashboardClick}
//                     className="hover:text-primary transition-colors"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     Documentation
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Connect</h3>
//               <div className="flex space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Twitter className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Github className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Mail className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-border pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Opsonchain. All rights reserved.</div>
//               <div className="flex space-x-6 text-sm text-muted-foreground">
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Privacy Policy
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Terms of Service
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Support
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



// "use client"

// import type React from "react"

// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Navigation } from "@/components/navigation"
// import {
//   BarChart3,
//   Twitter,
//   Linkedin,
//   Github,
//   Mail,
//   CheckCircle,
//   ChevronDown,
//   ChevronUp,
//   Activity,
//   TrendingUp,
//   Shield,
//   Zap,
//   Users,
//   BarChart,
// } from "lucide-react"
// import { useState } from "react"

// export default function HomePage() {
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [openFaq, setOpenFaq] = useState<number | null>(null)
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

//   const handleJoinWaitlistClick = (e: React.MouseEvent) => {
//     e.preventDefault()
//     router.push("/signup")
//   }

//   const handleDashboardClick = (e: React.MouseEvent) => {
//     if (!isLoggedIn) {
//       e.preventDefault()
//       alert("Please log in to access the dashboard.")
//       router.push("/#login")
//     }
//   }

//   const faqs = [
//     {
//       question: "What is Opsonchain?",
//       answer:
//         "Opsonchain is a real-time Solana on-chain monitoring platform that detects real-time cluster detection and trading patterns.",
//     },
//     {
//       question: "How does Opsonchain work?",
//       answer:
//         "It tracks parent-to-child wallet fundings, bundles, and token activity to give traders early insights.",
//     },
//     {
//       question: "What features does Opsonchain offer?",
//       answer:
//         "Live bundler detection, token load analysis, exit signals, and trading opportunity alerts.",
//     },
//     {
//       question: "Is Opsonchain suitable for beginners?",
//       answer:
//         "Yes, it provides clear insights with simple dashboards designed for all experience levels.",
//     },
//     {
//       question: "What makes Opsonchain different?",
//       answer:
//         "It’s the first Solana on-chain tool offering ultra-fast wallet cluster detection with actionable trading windows.",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <Navigation setIsLoggedInState={setIsLoggedIn} />

//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance text-left">
//                   Know when the rug will happen, exit before it does.{" "}
//                 </h1>
//                 <p className="text-lg text-muted-foreground max-w-lg text-pretty">
//                   The first live bundler detector on Solana. Ultra-fast wallet cluster detection that shows you what
//                   token is being pumped, how much SOL is behind it, and when the exit door closes.
//                 </p>
//               </div>

//               {/* Feature List */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"First-of-its-kind real-time bundler detection"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"On-chain clarity, no rumors"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"Predict pumps before they peak"}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
//                   <span className="text-foreground">{"Exit safely, avoid rugs"}</span>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link href="/signup" onClick={handleJoinWaitlistClick}>
//                   <Button
//                     size="lg"
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium w-full sm:w-auto"
//                   >
//                     {"👉 Join the early access waitlist"}
//                   </Button>
//                 </Link>
//                 <div className="flex items-center space-x-2 text-sm text-muted-foreground"></div>
//               </div>
//             </div>

//             {/* Right Dashboard Preview */}
//             <div className="relative">
//               <div className="bg-muted/30 rounded-2xl p-8 border border-border">
//                 <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center">
//                   <div className="text-center space-y-4">
//                     <BarChart3 className="h-16 w-16 text-primary mx-auto" />
//                     <div className="space-y-2">
//                       <div className="h-2 bg-muted rounded w-32 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-24 mx-auto"></div>
//                       <div className="h-2 bg-muted rounded w-28 mx-auto"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Advanced Trading Intelligence features section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto space-y-12">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
//               Advanced Trading Intelligence
//             </h2>
//             <p className="text-lg text-muted-foreground text-pretty">
//               Get the insights you need to make informed trading decisions on Solana
//             </p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Real-time Monitoring */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4 shadow-none">
//               <Activity className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Real-time Monitoring</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Track funding clusters as they form and evolve in real-time
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Live cluster detection</li>
//                 <li>• 5-second polling intervals</li>
//                 <li>• Instant status updates</li>
//               </ul>
//             </div>

//             {/* Pattern Analysis */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <TrendingUp className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Pattern Analysis</h3>
//                 <p className="text-muted-foreground text-sm">Identify common trading patterns and wallet behaviors</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• DEX program tracking</li>
//                 <li>• Wallet age analysis</li>
//                 <li>• Amount pattern detection</li>
//               </ul>
//             </div>

//             {/* Risk Assessment */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Shield className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Risk Assessment</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Monitor spend rates and remaining balances for risk management
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• SOL spend rate tracking</li>
//                 <li>• Time remaining estimates</li>
//                 <li>• Low balance alerts</li>
//               </ul>
//             </div>

//             {/* Fast Detection */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Zap className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Fast Detection</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Detect activities within 10-second windows with high precision
//                 </p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Minimum 5 children required</li>
//                 <li>• 20+ SOL threshold</li>
//                 <li>• 10-second detection window</li>
//               </ul>
//             </div>

//             {/* Child Wallet Tracking */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <Users className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Child Wallet Tracking</h3>
//                 <p className="text-muted-foreground text-sm">View and analyze all child wallets within each cluster</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Complete recipient lists</li>
//                 <li>• One-click address copying</li>
//                 <li>• Cluster relationship mapping</li>
//               </ul>
//             </div>

//             {/* Advanced Filtering */}
//             <div className="bg-card rounded-xl p-6 border border-border space-y-4">
//               <BarChart className="h-10 w-10 text-foreground" />
//               <div className="space-y-2">
//                 <h3 className="text-xl font-bold text-foreground">Advanced Filtering</h3>
//                 <p className="text-muted-foreground text-sm">Filter and search clusters by multiple criteria</p>
//               </div>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>• Status-based filtering</li>
//                 <li>• Wallet address search</li>
//                 <li>• Custom time ranges</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-6xl mx-auto text-center space-y-16">
//           <div className="space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">How it works</h2>
//             <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
//               While others rely on Twitter rumors and gut feelings, you'll trade with institutional-grade intelligence.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {/* Discover Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center">
//                 <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">MEW</div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Ultra-fast wallet clustering</h3>
//                 <p className="text-muted-foreground text-sm">
//                   OpsOnchain continuously monitors on-chain data to detect parent wallets funding child wallets in
//                   seconds
//                 </p>
//               </div>
//             </div>

//             {/* Monitor Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-muted-foreground">Open</span>
//                     <span className="text-xs text-muted-foreground">1 min ago</span>
//                     <span className="text-xs text-muted-foreground">$3150</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
//                     <span className="text-sm font-medium">BUZZ</span>
//                     <span className="text-green-500 text-sm">+ $194.57K</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">On-chain only</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Direct Solana RPC ingestion with no third-party feeds. 100% transparent, 100% real-time.
//                 </p>
//               </div>
//             </div>

//             {/* Analyze Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4 flex flex-col justify-center">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-muted-foreground">Risk Score</span>
//                     <span className="text-green-500 font-medium">Low</span>
//                   </div>
//                   <div className="w-full bg-muted rounded-full h-2">
//                     <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
//                   </div>
//                   <div className="flex items-center justify-between text-xs pt-2">
//                     <span className="text-muted-foreground">Wallet Age</span>
//                     <span className="text-foreground font-medium">45 days</span>
//                   </div>
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-muted-foreground">Success Rate</span>
//                     <span className="text-foreground font-medium">82%</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Live bundler telemetry</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Every wallet event - funding, token purchase, DEX entry is linked into a single cluster. You see the
//                   play forming before volume prints the chart.
//                 </p>
//               </div>
//             </div>

//             {/* Trade Card */}
//             <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
//               <div className="aspect-square bg-muted/50 rounded-xl p-4">
//                 <div className="space-y-3">
//                   {[
//                     { name: "shrimp", token: "PLANETUS", amount: "+ $8.45K", verified: true },
//                     { name: "CookerHill", token: "SLM", amount: "+ $1.40K", verified: true },
//                     { name: "Bastille", token: "meowcoins", amount: "+ $1.77K", verified: true },
//                   ].map((trader, i) => (
//                     <div key={i} className="flex items-center justify-between text-xs">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-4 h-4 bg-muted rounded-full"></div>
//                         <span>{trader.name}</span>
//                         {trader.verified && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-muted-foreground">{trader.token}</span>
//                         <span className="text-green-500">{trader.amount}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <h3 className="text-xl font-bold text-foreground">Quantified projections</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Remaining bankroll, spend velocity, and estimated upside runway are refreshed second-by-second.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" onClick={handleJoinWaitlistClick}>
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">Try risk-free, money back guarantee.</p>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="max-w-4xl mx-auto space-y-16">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="bg-card rounded-lg border border-border">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                   className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
//                 >
//                   <span className="font-medium text-foreground">{faq.question}</span>
//                   {openFaq === index ? (
//                     <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                   )}
//                 </button>
//                 {openFaq === index && (
//                   <div className="px-6 pb-4">
//                     <p className="text-muted-foreground">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center space-y-4">
//             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" onClick={handleJoinWaitlistClick}>
//               Join Now
//             </Button>
//             <p className="text-sm text-muted-foreground">👉 Join the early access waitlist</p>
//           </div>
//         </div>
//       </section>

//       <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             {/* Brand Section */}
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-3 mb-4">
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Opsonchain
//                 </span>
//               </div>
//               <p className="text-sm text-muted-foreground max-w-md">
//                 Real-time blockchain monitoring for advanced traders. Track funding patterns, analyze wallet behaviors,
//                 and stay ahead of market movements.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="/" className="hover:text-primary transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     onClick={handleDashboardClick}
//                     className="hover:text-primary transition-colors"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-primary transition-colors">
//                     Documentation
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="font-semibold text-foreground mb-4">Connect</h3>
//               <div className="flex space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Twitter className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Github className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   <Mail className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-border pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Opsonchain. All rights reserved.</div>
//               <div className="flex space-x-6 text-sm text-muted-foreground">
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Privacy Policy
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Terms of Service
//                 </Link>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Support
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import {
  BarChart3,
  Twitter,
  Linkedin,
  Github,
  Mail,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Activity,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart,
} from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      alert("Please log in to access the dashboard.")
      router.push("/#login")
    }
  }

  const handleJoinWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/signup")
  }

  const faqs = [
    {
      question: "What is Opsonchain?",
      answer:
        "Opsonchain is a real-time Solana on-chain monitoring platform that detects real-time cluster detection and trading patterns.",
    },
    {
      question: "How does Opsonchain work?",
      answer:
        "It tracks parent-to-child wallet fundings, bundles, and token activity to give traders early insights.",
    },
    {
      question: "What features does Opsonchain offer?",
      answer:
        "Live bundler detection, token load analysis, exit signals, and trading opportunity alerts.",
    },
    {
      question: "Is Opsonchain suitable for beginners?",
      answer:
        "Yes, it provides clear insights with simple dashboards designed for all experience levels.",
    },
    {
      question: "What makes Opsonchain different?",
      answer:
        "It’s the first Solana on-chain tool offering ultra-fast wallet cluster detection with actionable trading windows.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation setIsLoggedInState={setIsLoggedIn} />

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance text-left">
                  Know when the rug will happen, exit before it does.{" "}
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg text-pretty">
                  The first live bundler detector on Solana. Ultra-fast wallet cluster detection that shows you what
                  token is being pumped, how much SOL is behind it, and when the exit door closes.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{"First-of-its-kind real-time bundler detection"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{"On-chain clarity, no rumors"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{"Predict pumps before they peak"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{"Exit safely, avoid rugs"}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" onClick={handleJoinWaitlistClick}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium w-full sm:w-auto"
                  >
                    {"👉 Join the early access waitlist"}
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground"></div>
              </div>
            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">
              <div className="bg-muted/30 rounded-2xl p-8 border border-border">
                <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-16 w-16 text-primary mx-auto" />
                    <div className="space-y-2">
                      <div className="h-2 bg-muted rounded w-32 mx-auto"></div>
                      <div className="h-2 bg-muted rounded w-24 mx-auto"></div>
                      <div className="h-2 bg-muted rounded w-28 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Trading Intelligence features section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Advanced Trading Intelligence
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Get the insights you need to make informed trading decisions on Solana
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real-time Monitoring */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4 shadow-none">
              <Activity className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Real-time Monitoring</h3>
                <p className="text-muted-foreground text-sm">
                  Track funding clusters as they form and evolve in real-time
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Live cluster detection</li>
                <li>• 5-second polling intervals</li>
                <li>• Instant status updates</li>
              </ul>
            </div>

            {/* Pattern Analysis */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <TrendingUp className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Pattern Analysis</h3>
                <p className="text-muted-foreground text-sm">Identify common trading patterns and wallet behaviors</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• DEX program tracking</li>
                <li>• Wallet age analysis</li>
                <li>• Amount pattern detection</li>
              </ul>
            </div>

            {/* Risk Assessment */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <Shield className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Risk Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor spend rates and remaining balances for risk management
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• SOL spend rate tracking</li>
                <li>• Time remaining estimates</li>
                <li>• Low balance alerts</li>
              </ul>
            </div>

            {/* Fast Detection */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <Zap className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Fast Detection</h3>
                <p className="text-muted-foreground text-sm">
                  Detect activities within 10-second windows with high precision
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Minimum 5 children required</li>
                <li>• 20+ SOL threshold</li>
                <li>• 10-second detection window</li>
              </ul>
            </div>

            {/* Child Wallet Tracking */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <Users className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Child Wallet Tracking</h3>
                <p className="text-muted-foreground text-sm">View and analyze all child wallets within each cluster</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete recipient lists</li>
                <li>• One-click address copying</li>
                <li>• Cluster relationship mapping</li>
              </ul>
            </div>

            {/* Advanced Filtering */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <BarChart className="h-10 w-10 text-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Advanced Filtering</h3>
                <p className="text-muted-foreground text-sm">Filter and search clusters by multiple criteria</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Status-based filtering</li>
                <li>• Wallet address search</li>
                <li>• Custom time ranges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">How it works</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
              While others rely on Twitter rumors and gut feelings, you'll trade with institutional-grade intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Discover Card */}
            <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">MEW</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Ultra-fast wallet clustering</h3>
                <p className="text-muted-foreground text-sm">
                  OpsOnchain continuously monitors on-chain data to detect parent wallets funding child wallets in
                  seconds
                </p>
              </div>
            </div>

            {/* Monitor Card */}
            <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="aspect-square bg-muted/50 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Open</span>
                    <span className="text-xs text-muted-foreground">1 min ago</span>
                    <span className="text-xs text-muted-foreground">$3150</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">BUZZ</span>
                    <span className="text-green-500 text-sm">+ $194.57K</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">On-chain only</h3>
                <p className="text-muted-foreground text-sm">
                  Direct Solana RPC ingestion with no third-party feeds. 100% transparent, 100% real-time.
                </p>
              </div>
            </div>

            {/* Analyze Card */}
            <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="aspect-square bg-muted/50 rounded-xl p-4 flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Risk Score</span>
                    <span className="text-green-500 font-medium">Low</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-muted-foreground">Wallet Age</span>
                    <span className="text-foreground font-medium">45 days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-foreground font-medium">82%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Live bundler telemetry</h3>
                <p className="text-muted-foreground text-sm">
                  Every wallet event - funding, token purchase, DEX entry is linked into a single cluster. You see the
                  play forming before volume prints the chart.
                </p>
              </div>
            </div>

            {/* Trade Card */}
            <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
              <div className="aspect-square bg-muted/50 rounded-xl p-4">
                <div className="space-y-3">
                  {[
                    { name: "shrimp", token: "PLANETUS", amount: "+ $8.45K", verified: true },
                    { name: "CookerHill", token: "SLM", amount: "+ $1.40K", verified: true },
                    { name: "Bastille", token: "meowcoins", amount: "+ $1.77K", verified: true },
                  ].map((trader, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-muted rounded-full"></div>
                        <span>{trader.name}</span>
                        {trader.verified && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{trader.token}</span>
                        <span className="text-green-500">{trader.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Quantified projections</h3>
                <p className="text-muted-foreground text-sm">
                  Remaining bankroll, spend velocity, and estimated upside runway are refreshed second-by-second.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={handleJoinWaitlistClick}
            >
              Join Now
            </Button>
            <p className="text-sm text-muted-foreground">Try risk-free, money back guarantee.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg border border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={handleJoinWaitlistClick}
            >
              Join Now
            </Button>
            <p className="text-sm text-muted-foreground">👉 Join the early access waitlist</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Opsonchain
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Real-time blockchain monitoring for advanced traders. Track funding patterns, analyze wallet behaviors,
                and stay ahead of market movements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={handleDashboardClick}
                    className="hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Opsonchain. All rights reserved.</div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
