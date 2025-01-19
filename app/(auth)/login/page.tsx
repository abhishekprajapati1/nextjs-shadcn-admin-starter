import { LoginForm } from "@/components/auth/LoginForm";
import AuthHeader from "@/components/navigation/AuthHeader";
import Footer from "@/components/navigation/Footer";
import {
  Shield,
  TagIcon,
  Truck,
  HeartHandshake,
  LucideIcon,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <AuthHeader>
        <Link
          href="/signup"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Don't have an account?
        </Link>
      </AuthHeader>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Welcome Back to Akku Ka Chasma
              </h1>
              <p className="text-lg text-muted-foreground">
                Access your wholesale eyewear dashboard and manage your business
                efficiently.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <BenefitCard
                icon={Shield}
                title="Secure Access"
                description="Your business data is protected with enterprise-grade security"
              />
              <BenefitCard
                icon={Truck}
                title="Order Tracking"
                description="Track all your shipments and inventory in real-time"
              />
              <BenefitCard
                icon={HeartHandshake}
                title="Dedicated Support"
                description="24/7 support for all your business needs"
              />
              <BenefitCard
                icon={TagIcon}
                title="Special Prices"
                description="Access wholesale prices and bulk discounts"
              />
            </div>

            {/* Trust Banner */}
            <div className="mt-12 p-6 bg-accent/50 rounded-lg">
              <div className="text-center">
                <p className="text-sm font-medium mb-4">
                  Trusted by Leading Retailers Across India
                </p>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2000+</div>
                    <div className="text-sm text-muted-foreground">
                      Active Retailers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">
                      Brand Partners
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-sm text-muted-foreground">
                      Customer Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="lg:pl-8">
            <React.Suspense fallback={<div>Please wait...</div>}>
              <LoginForm />
            </React.Suspense>
            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-center items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <div className="text-xs">
                    <span className="font-medium">100% Secure</span> Payment
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <div className="text-xs">
                    <span className="font-medium">Free Shipping</span> Above
                    ₹999
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <div className="text-xs">
                    <span className="font-medium">Easy Returns</span> Policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Benefit Card Component
interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="group rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent">
      <Icon className="h-8 w-8 text-primary mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
