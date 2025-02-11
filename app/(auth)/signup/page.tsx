import FeatureCard from "@/components/auth/FeatureCard";
import { SignupForm } from "@/components/auth/SignupForm";
import StatCard from "@/components/auth/StatCard";
import AuthHeader from "@/components/navigation/AuthHeader";
import Footer from "@/components/navigation/Footer";
import { IconBadge } from "@/components/ui/icon-badge";
import {
  Award,
  Building2,
  Glasses,
  Package,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Sign Up - Akku Ka Chasma | Wholesale Eyewear Marketplace",
  description: "Create your business account on Akku Ka Chasma - India's leading wholesale marketplace for frames, lenses, and complete eyewear solutions. Access bulk orders, connect with suppliers, and grow your optical business.",
  keywords: [
    "wholesale eyewear",
    "business registration",
    "optical business",
    "eyewear marketplace",
    "wholesale frames",
    "optical supplier",
    "bulk eyewear orders",
    "optical business account",
    "eyewear wholesale india",
    "optical retail supplier",
  ],
  openGraph: {
    title: "Join Akku Ka Chasma - India's Leading Wholesale Eyewear Marketplace",
    description: "Create your business account and access wholesale prices, bulk orders, and a wide selection of eyewear products. Connect with top manufacturers and suppliers across India.",
    url: "https://akkukachasma.com/signup",
    siteName: "Akku Ka Chasma",
    type: "website",
    images: [
      {
        url: "https://akkukachasma.com/images/business-signup.jpg", // Add your actual image
        width: 1200,
        height: 630,
        alt: "Akku Ka Chasma Business Registration",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://akkukachasma.com/signup",
  },
  other: {
    "google-site-verification": "your-verification-code", // Add if you have one
    "business-type": "B2B",
    "target-audience": "Optical Retailers",
  },
  verification: {
    google: "your-verification-code", // Add if you have one
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <AuthHeader>
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Already have an account?
        </Link>
      </AuthHeader>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            <SignupForm />
          </div>

          {/* Right side - Features */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to Akku Ka Chasma
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Join India's leading wholesale eyewear marketplace. Create your
                business account today.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureCard
                icon={Package}
                title="Bulk Orders"
                description="Access wholesale prices on frames, lenses, and complete eyewear"
              />
              <FeatureCard
                icon={Users}
                title="Business Network"
                description="Connect with manufacturers and suppliers across India"
              />
              <FeatureCard
                icon={Truck}
                title="Fast Delivery"
                description="Quick shipping and hassle-free returns across India"
              />
              <FeatureCard
                icon={Glasses}
                title="Wide Selection"
                description="Choose from thousands of designs and brands"
              />
            </div>

            {/* Trust Indicators - Enhanced Version */}
            <div className="mt-6 p-6">
              <h3 className="text-xl font-semibold text-center mb-8">
                Trusted By Industry Leaders
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard
                  icon={Building2}
                  value="2000+"
                  label="Active Retailers"
                />
                <StatCard icon={Award} value="50+" label="Brand Partners" />
                <StatCard icon={Star} value="4.8/5" label="Customer Rating" />
                <StatCard
                  icon={TrendingUp}
                  value="₹100Cr+"
                  label="Annual GMV"
                />
              </div>

              {/* Certifications */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap justify-center gap-6 items-center">
                  <IconBadge icon={Award} label="ISO 9001:2015" />
                  <IconBadge icon={Award} label="BIS Certified" />
                  <IconBadge icon={Award} label="FDA Approved" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
